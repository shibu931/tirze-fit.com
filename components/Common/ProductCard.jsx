import { currency } from '@/lib/constants/commonName'
import Image from 'next/image'
import React from 'react'
import { IoCart } from "react-icons/io5";
import AddToCartBtn from './AddToCartBtn'
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const ProductCard = ({product}) => {
  const t = useTranslations('Common')
  return (
    <div className='border border-neutral-400 hover:border-blue-900 p-3'>
        <div className="w-full overflow-hidden flex justify-center">
        <Image
            src={product?.productImage[0].thumb}
            width={220}
            height={220}
            alt={product?.productName}
            className='object-cover hover:scale-110 transition-transform duration-300'
        />
        </div>
        <hr className='border-gray-300 mb-3'/>
        <Link href={"/product/"+product?.slug}><p className='product-card-title'>{product?.productName}</p></Link>
        <hr className='border-gray-300 my-2'/>
        <span className='block text-center'>Cena: <span className='text-lg font-medium'>{product?.productPrice} {currency}</span></span>
        <hr className='border-gray-300 my-2'/>
        <AddToCartBtn product={product} className='flex items-center mx-auto font-medium border border-blue-800 px-3 py-1.5 rounded bg-blue-700 text-white text-sm hover:bg-blue-800 hover:shadow shadow-gray-400 hover:cursor-pointer transition-all duration-200'>
        <IoCart className='me-2 text-[20px]'/>
          {t('add_to_cart')}
        </AddToCartBtn>
    </div>
  )
}

export default ProductCard