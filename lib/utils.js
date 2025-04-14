import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getSimplifiedArticle(article){
  return article.toObject({
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.updatedAt;
      delete ret.internalNotes;
      return {
        id: doc._id.toString(), 
        ...ret,
        createdAt: ret.createdAt.toISOString(), 
      };
    }
  });
}

export async function revalidatePage(slug){
  if(!slug) return {error:"Slug must be provided",success:false}
  try {
    const result = await fetch(`${process.env.ADMIN_URL}/api/revalidate-path?page_slug=${slug}&access_key=${process.env.ACCESS_KEY}`)
    if(result.success) return {success:true}
  } catch (error) {
    console.error("Something went wrong ",error.message)
    return {success:false,error:error.message}
  }
}