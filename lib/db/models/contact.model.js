import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    isAnswered:{
        type:Boolean,
        default:false
    }
})

export default mongoose.models.Contact || mongoose.model('Contact',ContactSchema)