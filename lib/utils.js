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