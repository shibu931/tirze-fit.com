import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true, 
  },
  productImage: {
    type: [
      {
        thumb: {
          type: String,
          required: true,
          trim: true, 
        },
        large: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'], 
  },
  metaDescription:{
    type:String,
  },
  productPrice: {
    type: Number, 
    required: true,
    trim: true,
  },
  category: {
    href: {
      type: String,
      required: false,
      trim: true,
    },
    title: {
      type: String,
      required: false,
      trim: true,
    },
  },
  subCategory: {
    type: [
      {
        href: {
          type: String,
          required: false,
          trim: true,
        },
        title: {
          type: String,
          required: false,
          trim: true,
        },
      },
    ],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10'], 
  },
  slug: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  description:{
    type:String,
  },
  sales:{
    type:Number,
    default:0
  }
}, {
  timestamps: true, 
});

function arrayLimit(val) {
  return val.length <= 10; 
}

export default mongoose.models.Product || mongoose.model('Product',ProductSchema)
