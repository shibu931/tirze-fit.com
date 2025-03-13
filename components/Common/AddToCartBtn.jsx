'use client'
import { useCart } from '@/context/CartContext'
import React from 'react'
import { toast } from 'sonner'

const AddToCartBtn = ({ product, className, children }) => {  
    const {addToCart} = useCart()
    function handleAddToCart(){
        addToCart(product)
        toast.success('Success',{
            description:'Product added to cart'
        })
    }
    return (
        <button onClick={()=>handleAddToCart()} className={`${className}`}>{children}</button>

    )
}

export default AddToCartBtn