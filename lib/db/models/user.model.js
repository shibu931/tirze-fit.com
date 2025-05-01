import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
  },
  email:{
    type:String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'editor','user'],
    default: 'user',
  },
  accountStatus: {
    type: String,
    enum: ['active', 'unverified', 'inactive', 'suspended', 'deleted', ],
    default: 'unverified',
  },
  invitationCode: {
    type: String,
    unique: true,
  },
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  credits: {
    type: Number,
    default: 0,
  },
  referralCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew && !this.invitationCode) {
    let isUnique = false;
    while (!isUnique) {
      const code = nanoid(8);
      const existingUser = await User.findOne({ invitationCode: code });
      if (!existingUser) {
        this.invitationCode = code;
        isUnique = true;
      }
    }
  }
  next();
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;