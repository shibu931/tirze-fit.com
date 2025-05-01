import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  deliveryOption: {
    type: String,
    enum: ['dhl','dpd', 'inpost'], 
    
  },
  userEmail: {
    type: String,
    default: null,
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
      },
      productOrigialTotal:{
        type:Number,
        default: function() {
          return this.quantity * this.price;
        }
      },
      totalDiscount:{
        type:Number
      },
      freeUnits:{
        type:Number,
        default:0
      },
      partialDiscount:{
        type:Number,
        default:0
      },
      finalPrice:{
        type:Number,
        default: function() {
          return this.productOrigialTotal - this.totalDiscount;
        }
      },
    },
  ],
  total: {
    type: Number,
  },
  isNew:{
    type:Boolean,
    default:true
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
  currency:{
    type:String,
    enum:['€','zł'],
    default:'zł'
  },
  orderDiscount:{
    type:String
  },
  invitationCode:{
    type:String
  } 
});

export default mongoose.models.Order || mongoose.model('Order',OrderSchema)