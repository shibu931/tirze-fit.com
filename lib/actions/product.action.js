import connectToDB from '@/lib/db/mongoose'
import Product from '@/lib/db/models/product.model'
import { getTranslations } from 'next-intl/server';

const product = [
    {
        productId:1,
        productName:'Semaglutyd 4mg (0,25-4mg)',
        productImage:[
            {
                thumb: '/assets/product-image/thumb/sema-4-mg-7-thumb.webp',
                large: '/assets/product-image/sema-4-mg-7.webp'
            },
            {
                thumb: '/assets/research/semaglutide_research.webp',
                large: '/assets/research/semaglutide_research.webp'
            },
            {
                thumb: '/assets/research/semaglutide_research_2.webp',
                large: '/assets/research/semaglutide_research_2.webp'
            },
        ],
        metaDescription: '',
        productPricePl: 499.00,
        productPriceEn: 125.00,
        slug:'sema-g-4mg-pen',
        description: '',
        sales:0,
    },
    {
        productId:2,
        productName:'Retatrutyd 4 mg Pen - TRIPLE G (0,25-4mg)',
        productImage:[
            {
                thumb: '/assets/product-image/thumb/reta-7-thumb.webp',
                large: '/assets/product-image/reta-7.webp'
            },
            {
                thumb: '/assets/research/retartrutide.webp',
                large: '/assets/research/retartrutide.webp'
            },
            {
                thumb: '/assets/research/retartrutide_2.webp',
                large: '/assets/research/retartrutide_2.webp'
            },
        ],
        metaDescription: '',
        productPricePl: 499.00,
        productPriceEn: 125.00,
        slug:'retatrutyd-4mg-pen',
        description: '',
        sales:0,
    },
    {
        productId:3,
        productName:'SemA + CAGRI PEN',
        productImage:[
            {
                thumb: '/assets/product-image/thumb/semacagri-pen-7-thumb.webp',
                large: '/assets/product-image/semacagri-pen-7.webp'
            },
            {
                thumb: '/assets/research/sema+cargi.webp',
                large: '/assets/research/sema+cargi.webp'
            },
            {
                thumb: '/assets/research/sema+cargi_2.webp',
                large: '/assets/research/sema+cargi_2.webp'
            },
        ],
        metaDescription: '',
        productPricePl: 499.00,
        productPriceEn: 125.00,
        slug:'sema-cagri-22mg-pen',
        description: '',
        sales:0,
    },
]

export const populateDB = async () => {
    try {
      await connectToDB();   
      await Product.insertMany(product);
      console.log('Database populated successfully!');
    } catch (error) {
      console.error('Error populating database:', error);
    }
};
  
export const getProducts = async  (locale) => {
    try {
        await connectToDB()
        const products = await Product.find();        
        const t = await getTranslations('Products')
        const updatedProducts = products.map(product=>({
            ...product._doc,
            productName:t(product.productName),
            productPrice: locale === 'en' ? product.productPriceEn : product.productPricePl
        }))
        if(!products) return null;
        return {message:'ok',data:updatedProducts};
    } catch (error) {
        console.log('Error fetching products: ',error);
    }
}

export const getProduct = async (slug, locale) => {
    if(!slug) return "Please Provide Product Slug"
    try {
        connectToDB()
        const product = await Product.findOne({slug:slug});
        const t = await getTranslations('Products')
        const updatedProduct = {...product._doc, productName:t(product.productName), productPrice:  locale === 'en' ? product.productPriceEn : product.productPricePl}
        console.log(updatedProduct)
        if(!product) return {message:'No Product Found', data:null}
        return {message: 'ok', data:updatedProduct}
    } catch (error) {
        console.log("Error Fetching Product: ",error);
    }
}


