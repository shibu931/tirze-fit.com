import React from 'react'
import ProductCard from '../Common/ProductCard'
import { getProducts } from '@/lib/actions/product.action'
import { getLocale } from 'next-intl/server'

const ShopPage = async () => {
  const locale = await getLocale()
  const { data } = await getProducts(locale)
  const products = data.map((product) => ({
    productId:product.productId,
    slug: product.slug,
    productName: product.productName,
    productPrice: product.productPrice,
    productPriceEn: product.productPriceEn,
    productPricePl: product.productPricePl,
    productImage: [{ thumb: product.productImage[0].thumb }], // Only thumb
  }));
  return (
    <section className='my-4 lg:my-6'>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:grid-cols-auto gap-4 sm:gap-6 lg:gap-8 justify-center">
        {
          products.map((product) => (
            <ProductCard key={product?.slug} product={product} />
          ))
        }
      </div>
    </section>
  )
}

export default ShopPage