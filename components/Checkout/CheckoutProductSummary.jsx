'use client'
import { useCart } from '@/context/CartContext';
import { currency } from '@/lib/constants/commonName'
import Image from 'next/image'
import Link from 'next/link'

const CheckoutProductSummary = () => {
  const { cart, productTotal } = useCart()
  if (!cart?.item || cart?.item.length === 0) {
    return <p>No items in cart.</p>;
  }

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <ul className="space-y-2">
        {cart?.item.map((item,index) => (
          <li key={index} className="flex justify-between border-b border-gray-300 py-2">
            <div className='flex'>
              <div className="w-16 h-16 me-4">
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
              <div className='flex flex-col'>
                <Link href={item.slug} className='hover:underline underline-offset-2 hover:text-blue-800 text-neutral-700 text-[17px]  font-semibold mb-0 transition-all duration-200'>{item.productName}</Link>
                <span className='font-medium text-gray-500 text-sm mt-0'>Qty: {item.quantity}</span>
              </div>
            </div>
            <span className='text-lg font-medium text-neutral-700'>{item.quantity * item.productPrice} {currency}</span>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 w-[92%] sm:w-[95%]">
        <div className="my-2 border-b border-gray-300 py-2">
          <div className="flex justify-between font-semibold">
            <span className='uppercase'>Delivery Charges:</span>
            <span>{20} {currency}</span>
          </div>
        </div>
        <div className="my-3 py-2">
          <div className="flex justify-between font-bold text-lg">
            <span className='uppercase'>Total:</span>
            <span>{productTotal} {currency}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutProductSummary