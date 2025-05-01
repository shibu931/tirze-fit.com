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

export const calculateCartDiscounts = (cartItems, discountCredits, locale) => {
  let remainingCredits = discountCredits || 0;
  let totalAfterDiscount = 0;

  const itemsWithDiscount = cartItems.map(item => {
    const productPrice = locale === 'en' ? item.productPriceEn : item.productPricePl;
    const quantity = item.quantity;
    let totalItemPrice = productPrice * quantity;
    let totalDiscount = 0;
    let freeUnits = 0;
    let partialDiscount = 0;

    // Calculate full free units
    freeUnits = Math.min(Math.floor(remainingCredits / 100), quantity);
    remainingCredits -= freeUnits * 100;

    // Calculate partial discount if any credits left
    if (remainingCredits > 0 && freeUnits < quantity) {
      partialDiscount = Math.min(remainingCredits, 100);
      remainingCredits -= partialDiscount;
    }

    // Total discount value
    totalDiscount = (freeUnits * productPrice) +
      ((partialDiscount / 100) * productPrice);

    const finalPrice = totalItemPrice - totalDiscount;
    totalAfterDiscount += finalPrice;

    return {
      ...item,
      freeUnits,
      partialDiscount,
      totalDiscount: Number(totalDiscount.toFixed(2)),
      finalPrice: Number(finalPrice.toFixed(2)),
      originalPrice: totalItemPrice
    };
  });

  return {
    updatedItems: itemsWithDiscount,
    totalAfterDiscount: Number(totalAfterDiscount.toFixed(2))
  };
};