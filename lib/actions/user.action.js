'use server'
import mongoose from "mongoose";
import User from "../db/models/user.model";
import connectToDB from "../db/mongoose";
import { Otp } from "../db/models/otp.model";
import { sendOTP } from "../nodemailer/mailer";

export async function verifyUser(email, password) {
  try{
    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) return { success: false, message: "User not found" };
  
    const isValid = await user.comparePassword(password);
    if (!isValid) return { success: false, message: "Invalid credentials" };
  
    return {
      id: user._id.toString(),
      success: true,
      message: "Login successful",
      email: user.email,
      name: user.name,
      role: user.role,
      accountStatus: user.accountStatus,
    };
  }catch (error) {
    console.error("Error verifying user:", error);
    return { success: false, message: error.message || "Error verifying user" };
  }
}

export async function getUserByEmail(email) {
  try {
    await connectToDB();
    const user = await User.findOne({email:email}).select("-password -__v");
    if (!user) return { success: false, message: "User not found" };
    return { success: true, user:JSON.parse(JSON.stringify(user)) };
} catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, message: error.message || "Error fetching user" };
  } 
}

export async function createUser(userData) {

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectToDB();

    const { name, email, password, invitationCode } = userData;

    const username = email.split("@")[0] + Math.floor(Math.random() * 1000);
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    }).session(session);

    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return {
        success: false,
        message: "User with this email or username already exists"
      };
    }

    let referrer = null;
    if (invitationCode) {
      referrer = await User.findOne({
        invitationCode
      }).session(session);

      if (!referrer) {
        await session.abortTransaction();
        session.endSession();
        return {
          success: false,
          message: "Invalid invitation code"
        };
      }
    }

    const newUser = new User({
      name,
      email,
      password,
      username,
      referrer: referrer?._id,
      credits: 0,
    });

    await newUser.save({ session });

    if (referrer) {
      referrer.referralCount += 1;
      await referrer.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        credits: newUser.credits,
        invitationCode: newUser.invitationCode
      }
    };

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating user:", error);
    return {
      success: false,
      message: error.message || "Error creating user"
    };
  }
}

export async function verifyEmail(email, action, otp, locale) {
  try {
    await connectToDB();

    if (action === "send-otp") {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      await Otp.findOneAndUpdate(
        { email },
        { otp: otpCode, expiresAt },
        { upsert: true, new: true }
      );
      console.log("Locale log in action file ", locale)
      await sendOTP(email, otpCode, locale);      
      return { success: true, message: "OTP sent to email" };
    }

    if (action === "verify-otp") {
      if (!otp) return { success: false, message: "OTP is required" };

      const otpRecord = await Otp.findOne({ email });
      if (!otpRecord) return { success: false, message: "OTP not found" };

      // Check expiration
      if (Date.now() > otpRecord.expiresAt) {
        await Otp.deleteOne({ email });
        return { success: false, message: "OTP has expired" };
      }

      // Verify OTP match
      if (otpRecord.otp !== otp) {
        return { success: false, message: "Invalid OTP" };
      }

      // Update user verification status
      const user = await User.findOneAndUpdate(
        { email },
        { accountStatus: 'active' },
        { new: true }
      );

      if (!user) {
        await Otp.deleteOne({ email });
        return { success: false, message: "User not found" };
      }

      // Cleanup OTP record
      await Otp.deleteOne({ email });
      return { success: true, message: "Email verified successfully" };
    }

    return { success: false, message: "Invalid action" };
  } catch (error) {
    console.error("Error verifying email:", error);
    return { 
      success: false, 
      message: error.message || "Error verifying email" 
    };
  }
}

export async function verifyInvitationCode(invitationCode) {
    try {
      await connectToDB();
      const referrer = await User.findOne({
        invitationCode,
      });
      if (!referrer) {
        return { success: false, message: "Invalid invitation code" };
      }
      return { success: true, message: 'Valid invitation code' };
    } catch (error) {
      console.error("Error verifying invitation code:", error);
      return { success: false, message: "Error verifying invitation code" };
    }
}

export async function getUserInvitationCode(email){
  try {
    await connectToDB()
    const referrerUser = await User.findOne({email:email}).select('referrer').lean()
    if(!referrerUser) return {success:false,invitationCode:null}
    const invitationCode = await User.findById(referrerUser.referrer).select('invitationCode').lean()
    console.log(invitationCode)
    return {success:true,invitationCode:invitationCode.invitationCode}
  } catch (error) {
    console.error("Failed to get invitation code ",error.message)
    return {success:false,invitationCode:null}
  }
}

export async function getUserCredits(email) {
  try {
      await connectToDB();
      const user = await User.findOne({ email }).select("credits").lean().exec();
      if (!user) {
          return { success: false, message: "User not found" };
      }
      return { success: true, credits: user.credits };
  } catch (error) {
      console.error("Error fetching user credits:", error);
      return { success: false, message: "Error fetching user credits" };
  }
}

  