"use server";
import { auth } from "@/auth";
import connectToDB from "../db/mongoose";
import User from "../db/models/user.model";
import Order from "../db/models/order.model";

function maskEmail(email) {
  const [local, domain] = email.split('@');
  const maskedLocal = local.slice(0,2) + '****';  
  return `${maskedLocal}@${domain}`;
}


export async function getReferralDetails() {
  try {
    await connectToDB();

    const { user } = await auth();
    const userEmail = user?.email || null;

    if (!userEmail) {
      console.warn('Unauthorized attempt to access referral details');
      return null;
    }

    const userDoc = await User.findOne({ email: userEmail }).select("_id").lean().exec();
    if (!userDoc) {
      console.warn('User not found in database');
      return null;
    }

    const referrals = await User.find({ referrer: userDoc._id })
      .select("name email createdAt")
      .lean()
      .exec();

    if (!referrals || referrals.length === 0) {
      return [];
    }

    const referralEmails = referrals.map(ref => ref.email);

    const orders = await Order.find({ 
      userEmail: { $in: referralEmails },
      status: { $nin: ['cancelled', 'pending'] }
    })
    .select("userEmail items.quantity")
    .lean()
    .exec();

    // Prepare mapping
    const statsByEmail = {};

    for (const order of orders) {
      const email = order.userEmail.toString();
      const itemCount = order.items.reduce((sum, item) => sum + (item.quantity || 0), 0);

      if (!statsByEmail[email]) {
        statsByEmail[email] = { orderCount: 0, itemCount: 0 };
      }

      statsByEmail[email].orderCount += 1;     // 1 order
      statsByEmail[email].itemCount += itemCount; // sum of item quantities
    }

    // Enrich referral data
    const referralDetails = referrals.map(ref => {
      const email = ref.email.toString();
      const stats = statsByEmail[email] || { orderCount: 0, itemCount: 0 };
      return {
        name: ref.name,
        email: maskEmail(ref.email),
        orderCount: stats.orderCount,    // number of orders
        itemCount: stats.itemCount,      // total quantity
        creditsEarned: stats.itemCount * 10, // credits based on items
        createdAt: ref.createdAt,
      };
    });

    // Sort by most recent referral first
    referralDetails.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return referralDetails;

  } catch (error) {
    console.error('Failed to fetch referral details:', error);
    throw new Error('Failed to retrieve referral information');
  }
}
