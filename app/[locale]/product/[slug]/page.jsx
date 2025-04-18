import Image from 'next/image';
import React from 'react'
import { FaRegClock } from "react-icons/fa";
import { FaThermometerHalf } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { IoCart, IoShieldCheckmarkSharp } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import RatingStar from '@/components/Common/RatingStar'
import { currency } from '@/lib/constants/commonName';
import ReviewPage from '@/components/Common/Review/ReviewPage';
import { getProduct } from '@/lib/actions/product.action';
import AddToCartBtn from '@/components/Common/AddToCartBtn';
import { getTranslations } from 'next-intl/server';
import { getArticle } from '@/lib/actions/article.action';
import ArticlePage from '@/components/Common/ArticlePage';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const { data: product } = await getProduct(slug);
  const t = await getTranslations('Product_page');
  return {
    title: `${product.productName} | ${t('seo.title_suffix')}`,
    description: t('seo.description', { productName: product.productName }),
    keywords: product?.keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_BASE_URL}/en/products/${slug}`,
        'pl': `${process.env.NEXT_PUBLIC_BASE_URL}/pl/products/${slug}`,
      },
    },
    openGraph: {
      title: `${product.productName} | ${t('seo.title_suffix')}`,
      description: t('seo.description', { productName: product.productName }),
      images: [
        {
          url: product.productImage[0].large,
          width: 800,
          height: 600,
          alt: product.productName,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.productName} | ${t('seo.title_suffix')}`,
      description: t('seo.description', { productName: product.productName }),
      images: [product.productImage[0].large],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
  };
}

const ProductSchema = ({ product }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.productName,
    "image": product.productImage.map(img => img.large),
    "description": product.description || "Premium weight loss solution",
    "brand": {
      "@type": "Brand",
      "name": "Tirze-Fit"
    },
    "offers": {
      "@type": "Offer",
      "url": `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
      "priceCurrency": currency,
      "price": product.productPrice,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "ratingCount": "100"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  );
};

const BreadcrumbSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": process.env.NEXT_PUBLIC_BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/shop`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Current Product"
      }
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  );
};


const page = async ({ params }) => {
  const t = await getTranslations('Common');
  const p = await getTranslations('Product_page');
  const { slug,locale } = await params
  const { data: product } = await getProduct(slug)
  const { article } = await getArticle(locale, slug);
  const simplifiedProduct = {
    productId: product.productId,
    slug: product.slug,
    productName: product.productName,
    productPrice: product.productPrice,
    productImage: product.productImage[0].thumb,
  };
  return (
    <main>
      <ProductSchema product={product} />
      <BreadcrumbSchema />
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
          <p className='text-lg sm:text-xl lg:text-2xl text-gray-400'>{p('weight_loss')}</p>
          <div className="flex items-start justify-between max-w-80 sm:max-w-[460px] mt-8">
            <div className='flex flex-col items-center justify-center'>
              <FaRegClock className="text-3xl text-blue-900" />
              <p className='text-xs sm:text-[13px] mt-2 font-semibold text-blue-900'>{p('usp.shipping')}</p>
              <p className='text-[10px] text-gray-700 sm:text-xs'>{p('usp.shipping_time')}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <FaThermometerHalf className="text-3xl text-blue-900" />
              <p className='text-xs sm:text-[13px] mt-2 font-semibold text-blue-900'>{p('usp.quality')}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <ImLab className="text-3xl text-blue-900" />
              <p className='text-xs sm:text-[13px] mt-2 font-semibold text-blue-900'>{p('usp.stand_lab')}</p>
            </div>
          </div>
          <div className='flex mt-4'><Link href="#reviews" className='hover:underline hover:text-blue-700'>{t('reviews')}</Link>
            <RatingStar rating={5} className={'text-xl'} />
          </div>
          <p className="text-2xl text-gray-700 mt-6 mb-2">CENA: <span className='text-gray-800 font-medium'>{product?.productPrice} {currency}</span></p>
          <AddToCartBtn product={simplifiedProduct} className='flex items-center font-medium border border-blue-800 px-3 py-2 bg-blue-700 text-white hover:bg-blue-800 hover:shadow shadow-gray-400 hover:cursor-pointer transition-all duration-200'>
            <IoCart className='me-2 text-[20px]' />
            {t('add_to_cart')}
          </AddToCartBtn>
        </div>
      </section>

      <section className='my-12'>
        <h2 className='font-bold text-lg md:text-xl uppercase text-gray-900 tracking-wider'>{p('product_warning.title')}</h2>
        <p className='mt-2 text-blue-800 uppercase font-semibold'>{p('product_warning.additional_info')}</p>
        <ul className='text-gray-600 text-sm space-y-2 ps-4 list-disc mt-2'>
          <li>{p('product_warning.point_one')}</li>
          <li>{p('product_warning.point_two')}</li>
          <li>{p('product_warning.point_three')}</li>
          <li>{p('product_warning.point_four')}</li>
          <li>{p('product_warning.point_five')}</li>
          <li>{p('product_warning.point_six')}</li>
          <li>{p('product_warning.point_seven')}</li>
        </ul>
        <p className="text-blue-800 mt-5 font-semibold text-sm">{p('legal_desc')}</p>

        <div className="grid grid-cols-3 mt-5 sm:mt-10 gap-4 lg:gap-8">
          <div className="flex flex-col items-center justify-center">
            <TbTruckReturn className='text-3xl sm:text-7xl text-blue-900' />
            <p className="text-[0.60rem] sm:text-xs text-center uppercase mt-2 font-bold">{p('usp.return_usp')}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ImLab className='text-3xl sm:text-6xl text-blue-900' />
            <p className="text-[0.60rem] sm:text-xs text-center uppercase mt-2 font-bold">{p('usp.lab_ql_usp')}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <IoShieldCheckmarkSharp className='text-3xl sm:text-6xl text-blue-900' />
            <p className="text-[0.60rem] sm:text-xs text-center uppercase mt-2 font-bold">{p('usp.shopping_usp')}</p>
          </div>
        </div>

      </section>

      <section className="my-14 article">
        {
          article ? (<ArticlePage content={article && article.content} />)
            :
            ''
        }
      </section>

      <section className='mt-12'>
        <ReviewPage slug={slug} />
      </section>

    </main>
  )
}

export default page