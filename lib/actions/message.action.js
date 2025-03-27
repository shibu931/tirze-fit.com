'use server'
import connectToDB from "../db/mongoose";
import Contact from '@/lib/db/models/contact.model'

export async function sendContactEmail(formData){
    if(!formData) return {success:false,message:'Data is Required'}
    try {
        await connectToDB()
        const result = Contact.insertOne(formData)
        if(!result) return {success:false,message:'Save is unsuccessful'}
        return {success:true,message:'Save is successful'}
    } catch (error) {
        console.log(error.message);
        return {success:false,message:error.message}
    }
}