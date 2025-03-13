import Image from 'next/image';
import React from 'react'
import { FaRegClock, FaShoppingCart } from "react-icons/fa";
import { FaThermometerHalf } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import RatingStar from '@/components/Common/RatingStar'
import Link from 'next/link';
import { currency } from '@/lib/constants/commonName';
import { TbTruckReturn } from "react-icons/tb";
import { IoCart, IoShieldCheckmarkSharp } from "react-icons/io5";
import ReviewPage from '@/components/Common/Review/ReviewPage';
import { getProduct } from '@/lib/actions/product.action';
import AddToCartBtn from '@/components/Common/AddToCartBtn';


const page = async ({ params }) => {
  const { slug } = await params
  const { data: product } = await getProduct(slug)
  const simplifiedProduct = {
    productId:product.productId,
    slug: product.slug,
    productName: product.productName,
    productPrice: product.productPrice,
    productImage: product.productImage[0].thumb,
  };
  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12">
        <div className='flex justify-center border border-gray-400'>
          <Image
            src={product?.productImage[0].large}
            width={400}
            height={400}
            alt={product.productName}
            priority
          />
        </div>
        <div>
          <h1 className='font-extrabold uppercase text-blue-800 text-2xl sm:text-3xl lg:text-4xl'>{product.productName}</h1>
          <p className='text-lg sm:text-xl lg:text-2xl text-gray-400'>WEIGHT LOSS PROGRAM</p>
          <div className="flex items-start justify-between max-w-80 sm:max-w-[460px] mt-8">
            <div className='flex flex-col items-center justify-center'>
              <FaRegClock className="text-3xl text-blue-900" />
              <p className='text-xs sm:text-[13px] mt-2 font-semibold text-blue-900'>Czas wysyłki</p>
              <p className='text-[10px] text-gray-700 sm:text-xs'>1-2  dni robocze</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <FaThermometerHalf className="text-3xl text-blue-900" />
              <p className='text-xs sm:text-[13px] mt-2 font-semibold text-blue-900'>gwarancja jakości</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <ImLab className="text-3xl text-blue-900" />
              <p className='text-xs sm:text-[13px] mt-2 font-semibold text-blue-900'>standard laboratoryjny</p>
            </div>
          </div>
          <div className='flex mt-4'>
            <p className='text-gray-600 font-semibold'>4.4/5 200 <Link href="#reviews" className='hover:underline hover:text-blue-700'>Reviews</Link> - </p>
            <RatingStar rating={5} className={'text-xl'} />
          </div>
          <p className="text-2xl text-gray-700 mt-6 mb-2">CENA: <span className='text-gray-800 font-medium'>{product?.productPrice} {currency}</span></p>
          <AddToCartBtn product={simplifiedProduct} className='flex items-center font-medium border border-blue-800 px-3 py-2 bg-blue-700 text-white hover:bg-blue-800 hover:shadow shadow-gray-400 hover:cursor-pointer transition-all duration-200'>
            <IoCart className='me-2 text-[20px]' />
            Do koszyka
          </AddToCartBtn>
        </div>
      </section>

      <section className='my-12'>
        <h2 className='font-bold text-lg md:text-xl uppercase text-gray-900 tracking-wider'>Produkt przeznaczony do celów badawczych</h2>
        <p className='mt-2 text-blue-800 uppercase font-semibold'>INFORMACJE DODATKOWE:</p>
        <ul className='text-gray-600 text-sm space-y-2 ps-4 list-disc mt-4'>
          <li>Produkt (substancja) nie jest produktem spożywczym ani suplementem diety, nie nadaje się do spożycia przez ludzi.</li>
          <li>Chronić przed dziećmi.</li>
          <li>Przechowywać pojemnik szczelnie zamknięty.</li>
          <li>Przechowywać w miejscu suchym, chłodnym, zacienionym; chronić przed wilgocią.</li>
          <li>Przechowywać wyłącznie w oryginalnym opakowaniu.</li>
          <li>Unikać kontaktu w czasie ciąży i karmienia piersią.</li>
          <li>W przypadku złego samopoczucia lub działań niepożądanych związanych z kontaktem z substancją zasięgnąć opinii lekarza.</li>
        </ul>
        <p className="text-blue-800 mt-5 font-semibold text-sm">Substancja nie jest produktem spożywczym ani suplementem diety, nie nadaje się on do spożycia przez ludzi. Produkt jest sklasyfikowany jako odczynnik chemiczny dopuszczony do obrotu na terenie Unii Europejskiej, można go używać wyłącznie do badań naukowych.</p>

        <div className="grid grid-cols-3 mt-5 sm:mt-10 gap-4 lg:gap-8">
          <div className="flex flex-col items-center justify-center">
            <TbTruckReturn className='text-xl sm:text-7xl text-blue-900' />
            <p className="text-xs uppercase mt-2 font-bold">14 Day Return Policy</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ImLab className='text-xl sm:text-6xl text-blue-900' />
            <p className="text-xs uppercase mt-2 font-bold">Laboratory Quality</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <IoShieldCheckmarkSharp className='text-xl sm:text-6xl text-blue-900' />
            <p className="text-xs uppercase mt-2 font-bold">Safe Shopping</p>
          </div>
        </div>

      </section>

      <section className='my-12'>
        <ReviewPage slug={slug} />
      </section>

    </main>
  )
}

export default page