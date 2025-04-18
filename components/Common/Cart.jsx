'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BsCart2 } from "react-icons/bs";
import Image from 'next/image';
import { RxCross1 } from "react-icons/rx";
import { currency } from '@/lib/constants/commonName';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// const cart = {
//     cardId: 123,
//     products: [
//         {
//             productId: '12',
//             productImage: 'https://tirzepatyd.store/wp-content/uploads/2024/09/tirze15.png',
//             productName: 'GLP-1+GIP (TIRZEPATYD) 15mg FIOLKA',
//             productPrice: 32.23,
//             slug: '/product/GLP-1+GIP-(TIRZEPATYD)-15mg-FIOLKA',
//             quantity: 1,
//             totalProductPrice: 32.22
//         },
//         {
//             productId: '22',
//             productImage: 'https://tirzepatyd.store/wp-content/uploads/2024/09/tirze15.png',
//             productName: 'GLP-1+GIP (TIRZEPATYD) 15mg FIOLKA',
//             productPrice: 32.23,
//             slug: '/product/GLP-1+GIP-(TIRZEPATYD)-15mg-FIOLKA',
//             quantity: 1,
//             totalProductPrice: 32.22
//         },
//         {
//             productId: '2',
//             productImage: 'https://tirzepatyd.store/wp-content/uploads/2024/09/tirze15.png',
//             productName: 'GLP-1+GIP (TIRZEPATYD) 15mg FIOLKA',
//             productPrice: 32.23,
//             slug: '/product/GLP-1+GIP-(TIRZEPATYD)-15mg-FIOLKA',
//             quantity: 1,
//             totalProductPrice: 32.22
//         },
//         {
//             productId: '4',
//             productImage: 'https://tirzepatyd.store/wp-content/uploads/2024/09/tirze15.png',
//             productName: 'GLP-1+GIP (TIRZEPATYD) 15mg FIOLKA',
//             productPrice: 32.23,
//             slug: '/product/GLP-1+GIP-(TIRZEPATYD)-15mg-FIOLKA',
//             quantity: 1,
//             totalProductPrice: 32.22
//         },
//     ],
//     cartTotal: 23,
//     deliveryCharges: 20,
//     couponCode: '',
//     userId: '123',
//     createdAt: new Date(),
//     updatedAt: new Date()
// }

const Cart = () => {
    const t = useTranslations('Cart')
    const {cart, productTotal} = useCart()
    return (
      <Dialog>
        <DialogTrigger className="hover:bg-blue-100 rounded p-1 hover:shadow-lg hover:border border-blue-200 hover:text-blue-700 hover:cursor-pointer relative">
          <BsCart2 className="text-[1.35rem] mt-1" />
          <span className="absolute bg-blue-800 rounded-full text-white font-bold text-xs w-[15px] h-[15px] top-1 -right-1">{cart?.item.length || 0}</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="tracking-wider text-center">{t('cart_title')}</DialogTitle>
          </DialogHeader>
          <ul className="h-[380px] overflow-y-scroll border-t border-b border-gray-400 px-2 cart-list my-2">
            {cart?.item.length > 0 ? (
              cart?.item.map((item,index) => <CartItem key={index} item={item}/>)
            ) : (
              <li>
                <p className='text-center my-8 text-red-700'>{t('empty_cart')}</p>
              </li>
            )}
          </ul>
          <p className='font-semibold uppercase'>{t('cart_ttl_amt')}: {productTotal} {currency}</p>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Link
              href={`${cart?.item.length > 0 ? '/checkout' : '#'}`}
              aria-disabled={cart?.item.length > 0 ? false : true}
              className={`text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center inline-flex w-full justify-center items-center me-2 ${cart?.item.length > 0 ? 'bg-blue-700' : 'bg-gray-400'}`}
            >
              <svg
                className="w-3.5 h-3.5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              {t('chkt')}
            </Link>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default Cart;
  
  function CartItem({ item, currency }) {
    const {updateCartItemQuantity, removeFromCart} = useCart()
    const t = useTranslations('Cart')
    const quantityInputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false); 
    const [showInput, setShowInput] = useState(false);
    const [quantity,setQuantity] = useState(item.quantity);
    function handleQuantityChange(v){
      if(parseInt(v) <= 1 ) {
        setQuantity(1)
        updateCartItemQuantity(item.productId, 1)
      }else{
        setQuantity(v)
        updateCartItemQuantity(item.productId, v)
      }
    }
    useEffect(() => {
      setIsOpen(true); 
      const timer = setTimeout(() => {
          setShowInput(true);
        }, 100);
      return () => clearTimeout(timer);
    }, []); 
  
    useEffect(() => {
      if (isOpen && quantityInputRef.current && !showInput) {
        quantityInputRef.current.blur();
      }
    }, [isOpen, showInput]);
  
    if (!isOpen) return null;
  
    return (
      <li
        className="flex mb-2 py-2 border-b border-gray-200 space-x-2 rounded px-1 items-center"
      >
        <div>
          {typeof item.productImage === 'string' ? (
            <Image
              src={item.productImage}
              alt={item.productName}
              width={50} 
              height={50}
            />
          ) : (
            Array.isArray(item.productImage) &&
            item.productImage.length > 0 && (
              <Image
                src={item.productImage[0].thumb}
                alt={item.productName}
                width={50}
                height={50}
              />
            )
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Link href={'/product/'+item.slug} className="hover:underline underline-offset-2">
            <h4 className="font-medium text-sm md:text-base text-neutral-700">{item.productName}</h4>
          </Link>
          <div className="flex space-x-2 items-center">
            <div className="space-x-1">
              <label htmlFor={item.productName.replace(' ', '-')}>Qty:</label>
              {showInput && (
                  <input
                      id={item.productName.replace(' ', '-')}
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={(e)=> handleQuantityChange(e.target.value)}
                      ref={quantityInputRef}
                      className="border qty-input border-neutral-400 focus:outline-gray-200 text-sm rounded p-1 w-12 text-center"
                  />
              )}
  
            </div>
            <p>
              {t('price')}: {item.productPrice * item.quantity} {currency}
            </p>
          </div>
        </div>
        <div title="Remove" onClick={()=> removeFromCart(item.productId)} className="my-auto ms-auto">
          <span className="hover:cursor-pointer transition-all duration-200 text-red-700 hover:bg-red-700 hover:text-white block p-1 rounded-full">
            <RxCross1 />
          </span>
        </div>
      </li>
    );
  }