import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
    slug:{type:String},
    review:[
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            message:{
                type:String,
                required:true
            },
            isVerified:{
                type:Boolean,
                default:false
            },
            createdAt:{
                type:Date,
                default:Date.now,
            }
        }
    ]
})

export default mongoose.models.Reviews || mongoose.model('Reviews',ReviewsSchema)