import connectToDB from '@/lib/db/mongoose'
import Product from '@/lib/db/models/product.model'

const product = [
    {
        productId:1,
        productName:'sema g 4 mg (4x1)',
        productImage:[
            {
                thumb: '/assets/product-image/thumb/sema-4-mg-7-thumb.webp',
                large: '/assets/product-image/sema-4-mg-7.webp'
            }
        ],
        metaDescription: '',
        productPrice: 499.00,
        slug:'sema-g-4mg-pen',
        description: '',
        salas:0
    },
    {
        productId:2,
        productName:'Retatrutyd 4 mg Pen - TRIPLE G (4x1mg)',
        productImage:[
            {
                thumb: '/assets/product-image/thumb/reta-7-thumb.webp',
                large: '/assets/product-image/reta-7.webp'
            }
        ],
        metaDescription: '',
        productPrice: 499.00,
        slug:'retatrutyd-4mg-pen',
        description: '',
        salas:0
    },
    {
        productId:3,
        productName:'SemA + CAGRI PEN',
        productImage:[
            {
                thumb: '/assets/product-image/thumb/semacagri-pen-7-thumb.webp',
                large: '/assets/product-image/semacagri-pen-7.webp'
            }
        ],
        metaDescription: '',
        productPrice: 499.00,
        slug:'sema-cagri-22mg-pen',
        description: '',
        salas:0
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
  
export const getProducts = async  () => {
    try {
        await connectToDB()
        const products = await Product.find();        
        if(!products) return null;
        return {message:'ok',data:products};
    } catch (error) {
        console.log('Error fetching products: ',error);
    }
}

export const getProduct = async (slug) => {
    if(!slug) return "Please Provide Product Slug"
    try {
        connectToDB()
        const product = await Product.findOne({slug:slug});
        if(!product) return {message:'No Product Found', data:null}
        return {message: 'ok', data:product}
    } catch (error) {
        console.log("Error Fetching Product: ",error);
    }
}


