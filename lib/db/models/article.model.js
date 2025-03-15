import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  type:{
    type:String,
    enum:["article","blog"],
    default:"blog"
  },
  lang:{
    type:String,
    enumn:["pl","en"],
    default:"en"
  },
  slug: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
    lowercase: true, 
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String, 
    default: '',
  },
  metaTitle: {
    type: String,
    trim: true,
  },
  metaDescription: {
    type: String,
    trim: true,
  },
  keywords: {
    type: String,
    trim: true,
  },
  ogImage: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
export default Article