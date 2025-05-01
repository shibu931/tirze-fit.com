'use server';

import { revalidatePath } from 'next/cache';
import connectToDB from '../db/mongoose';
import Order from '../db/models/order.model.js';
import { calculateCartDiscounts, revalidatePage } from '../utils';
import { auth } from '@/auth';
import User from '../db/models/user.model';
import mongoose from 'mongoose';
import productModel from '../db/models/product.model';
import { verifyInvitationCode } from './user.action';

const deliveryCharges = {
  inpost: 20,
  dpd: 25,
  dhl: 25,
}

export async function createOrder(addressData, cartItems, credits, coupon, locale) {
  const transactionSession = await mongoose.startSession();
  transactionSession.startTransaction();

  const currency = locale === 'en' ? '€' : 'zł';
  let userDoc = null;
  let userEmail = null; // new
  let userId = null;    // new

  try {
    validateInput(addressData, cartItems, credits);

    // Fetch authenticated user session
    const authSession = await auth();
    if (authSession?.user?.email) {
      userDoc = await User.findOne({ email: authSession.user.email })
        .select('_id credits email')
        .session(transactionSession)
        .lean();
      if (userDoc) {
        userEmail = userDoc.email;
        userId = userDoc._id;
      }
    }

    // For logged-in users, validate credits
    if (userDoc) {
      validateUserCredits(userDoc.credits, credits);
    } else {
      // For guest users, credits must be 0
      if (credits > 0) {
        throw new Error('Guest users cannot apply credits');
      }
    }

    const { deliveryOption, ...addressDetails } = addressData;
    const deliveryCharge = getDeliveryCharge(deliveryOption);

    // Fetch product details
    const productIds = cartItems.map(item => item.productId);
    const dbProducts = await productModel.find({ productId: { $in: productIds } }).lean();

    // Validate and prepare cart items
    const validatedCartItems = cartItems.map(item => {
      const dbProduct = dbProducts.find(p => p.productId === item.productId);
      if (!dbProduct) {
        throw new Error(`Product not found for productId: ${item.productId}`);
      }
      return {
        ...item,
        productPricePl: dbProduct.productPricePl,
        productPriceEn: dbProduct.productPriceEn,
        productPrice: locale === 'en' ? dbProduct.productPriceEn : dbProduct.productPricePl,
      };
    });

    // Calculate cart totals
    const { updatedItems, totalAfterDiscount } = calculateCartDiscounts(
      validatedCartItems,
      credits,
      locale
    );

    // Handle coupon discount
    let orderDiscount = 0;
    if (coupon) {
      const couponVerification = await verifyInvitationCode(coupon);
      if (couponVerification?.success) {
        const discountRate = 0.10; // 10% discount
        orderDiscount = discountRate * totalAfterDiscount;
      }
    }

    // Create order
    const order = await createOrderDocument(
      userEmail,  // may be null if guest
      deliveryOption,
      addressDetails,
      updatedItems,
      deliveryCharge,
      totalAfterDiscount,
      orderDiscount,
      currency,
      transactionSession
    );

    // Update user credits only if user exists
    if (userId) {
      await updateUserCredits(userId, credits, transactionSession);
    }

    // Commit transaction
    await transactionSession.commitTransaction();

    await handlePostOrderOperations(updatedItems);

    return {
      orderId: order[0]._id.toString(),
      message: 'Order created successfully',
      status: 201
    };

  } catch (error) {
    await transactionSession.abortTransaction();
    console.error('Order creation failed', { error: error.message, stack: error.stack });
    return {
      error: error.message || 'Order processing failed',
      status: error.statusCode || 500
    };
  } finally {
    transactionSession.endSession();
  }
}


export async function getOrderById(orderId) {
  if (!orderId) throw new Error('Missing order id.');
  try {
    connectToDB()
    const orderDetails = await Order.findById(orderId);
    if (!orderDetails) return { message: 'No Order Found', order: null }

    return { message: 'ok', order: JSON.parse(JSON.stringify(orderDetails)) }
  } catch (error) {
    console.error('Error getting order:', error);
    return { error: error.message || 'Failed to get order.' };
  }
}

export async function getOrdersByEmail(email) {
  if (!email) throw new Error('Missing email.');
  try {
    await connectToDB()
    const orders = await Order.find({ userEmail: email })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    if (!orders || orders.length === 0) return { message: 'No orders found', orders: [] };
    return { message: 'ok', orders: orders.map(order => JSON.parse(JSON.stringify(order))) };
  } catch (error) {
    console.error('Error getting orders:', error);
    return { error: error.message || 'Failed to get orders.' };
  }
}

//Helper Functions

function validateInput(addressData, cartItems, credits) {
  if (!addressData || !cartItems) {
    const error = new Error('Invalid input: Missing required order data');
    error.statusCode = 400;
    throw error;
  }

  if (!Array.isArray(cartItems)) {
    const error = new Error('Invalid cart items format');
    error.statusCode = 400;
    throw error;
  }

  if (cartItems.length === 0) {
    const error = new Error('Cannot create order with empty cart');
    error.statusCode = 400;
    throw error;
  }

  if (typeof credits !== 'number' || credits < 0) {
    const error = new Error('Invalid credit amount');
    error.statusCode = 400;
    throw error;
  }
}

function validateUserCredits(userCredits, requestedCredits) {
  if (userCredits < requestedCredits) {
    const error = new Error('Insufficient credits for this transaction');
    error.statusCode = 402;
    throw error;
  }
}

function getDeliveryCharge(deliveryOption) {
  const charge = deliveryCharges[deliveryOption];
  if (typeof charge !== 'number' || charge < 0) {
    const error = new Error('Invalid delivery option');
    error.statusCode = 400;
    throw error;
  }
  return charge;
}

async function createOrderDocument(
  userEmail,
  deliveryOption,
  addressDetails,
  items,
  deliveryCharge,
  totalAfterDiscount,
  orderDiscount,
  currency,
  session
) {
  try {
    return await Order.create([{
      deliveryOption,
      userEmail,
      addressDetails: addressDetails,
      items: items.map(item => ({
        productId: item.productId,
        productName: item.productName?.trim(),
        quantity: item.quantity,
        price: item.productPrice,
        slug: item.slug,
        productImage: item.productImage?.[0]?.thumb || '',
        totalDiscount: item.totalDiscount,
        freeUnits: item.freeUnits,
        partialDiscount: item.partialDiscount,
      })),
      deliverCharge: deliveryCharge,
      total: Math.max(0, totalAfterDiscount),
      orderDiscount,
      status: 'pending',
      currency: currency,
      createdAt: new Date(),
    }], { session });
  } catch (error) {
    error.message = `Order document creation failed: ${error.message}`;
    throw error;
  }
}

async function updateUserCredits(userId, creditsUsed, session) {
  try {
    await User.findByIdAndUpdate(
      userId,
      { $inc: { credits: -creditsUsed } },
      { session }
    );
  } catch (error) {
    error.message = `Credit update failed: ${error.message}`;
    throw error;
  }
}

async function handlePostOrderOperations(items) {
  try {
    await Promise.all([
      revalidatePage('/sales'),
      revalidatePath('/profile'),
      ...items.map(item =>
        revalidatePath(`/product/${item.slug}`)
      )
    ]);
  } catch (error) {
    console.warn('Post-order operations partially failed', {
      error: error.message
    });
  }
}