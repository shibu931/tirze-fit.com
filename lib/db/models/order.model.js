import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  deliveryOption: {
    type: String,
    enum: ['courier', 'inpost'], 
    
  },
  addressDetails: {
    
  },
  orderSite:{
    type:String,
  },
  items: [
    {
      productId: {
        type: Number,
        
      },
      productName: {
        type: String,
        
      },
      quantity: {
        type: Number,
        
      },
      price: {
        type: Number,
        
      },
      productImage: {
        type: String,
        
      },
      slug:{
        type:String,
      }
    },
  ],
  total: {
    type: Number,
  },
  isNew:{
    type:Boolean,
    default:false
  },
  deliverCharge:{
    type:Number
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model('Order',OrderSchema)