'use server';

import { revalidatePath } from 'next/cache';
import connectToDB from '../db/mongoose';
import Order from '../db/models/order.model.js';
import { revalidatePage } from '../utils';

export async function createOrder(addressData, cartItems, productTotal) {
  if (!addressData || !cartItems || !productTotal) {
    throw new Error('Missing order data.');
  }
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error('Cart items are invalid.');
  }
  try {
    connectToDB()
    const { deliveryOption, ...addressDetails } = addressData;
    const order = await Order.create({
        deliveryOption,
        addressDetails,
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.productPrice,
          slug:item.slug,
          productImage: item.productImage[0].thumb, 
        })),
        deliverCharge: deliveryOption === 'inpost' ? 15.00 : 20.00, 
        total: productTotal,
        status: 'pending',
        createdAt: new Date(),
      });
    cartItems.forEach(item => revalidatePath(`/product/${item.slug}`));
    await revalidatePage('/sales')
    return {orderId: order.id,message:'ok'}
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: error.message || 'Failed to create order.' };
  }
}

export async function getOrderById(orderId){
  if (!orderId) throw new Error('Missing order id.');
  try {
    connectToDB()
    const orderDetails = await Order.findById(orderId);
    if(!orderDetails) return {message:'No Order Found', order:null}
    const simplifiedOrderDetails = {
      _id: orderDetails._id.toString(),
      deliveryOption: orderDetails.deliveryOption,
      addressDetails: orderDetails.addressDetails,
      items: orderDetails.items.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        slug:item.slug,
        productImage: item.productImage || null, 
      })),
      deliverCharge: orderDetails.deliverCharge,
      total: orderDetails.total,
      status: orderDetails.status,
      createdAt: orderDetails.createdAt
    };
    console.log(simplifiedOrderDetails);
    
    return {message:'ok', order:simplifiedOrderDetails}
  } catch (error) {
    console.error('Error getting order:', error);
    return { error: error.message || 'Failed to get order.' };
  }
}