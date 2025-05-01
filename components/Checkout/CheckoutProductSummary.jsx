'use client'

import { useCart } from '@/context/CartContext';
import { Link } from '@/i18n/navigation';
import { calculateCartDiscounts } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CheckoutProductSummary = () => {
  const locale = useLocale()
  const t = useTranslations('Checkout');
  const c = useTranslations('Common');
  const [items, setItems] = useState([]);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [finalTotal,setFinalTotal] = useState(0)
  const { cart } = useCart();
  const discountRate = (cart?.couponDiscount || 0) / 100;
  useEffect(() => {
    if (!cart?.item || cart.item.length === 0) {
      setItems([]);
      setDiscountedTotal(0);
      return;
    }

    const { updatedItems, totalAfterDiscount } = calculateCartDiscounts(cart.item, cart.discount || 0, locale);

    setItems(updatedItems);
    setDiscountedTotal(totalAfterDiscount);
  }, [cart?.item, cart?.discount, locale]);

  useEffect(() => {
    const deliveryCharges = cart?.deliveryCharges || 25;
    const subtotal = discountedTotal + deliveryCharges;

    setFinalTotal(Math.max(0, discountedTotal * (1 - discountRate)));
  }, [cart?.couponDiscount, discountedTotal, cart?.deliveryCharges]);

  if (!cart?.item || cart.item.length === 0) {
    return <p>{t('empty_cart')}</p>;
  }

  const deliveryCharges = cart.deliveryCharges || 25;

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">{t('ordr_summary')}</h2>

      <ul className="space-y-2">
        {items.map((item, index) => (
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
                <Link href={`/product/${item.slug}`} className='hover:underline underline-offset-2 hover:text-blue-800 text-neutral-700 text-[17px] font-semibold mb-0 transition-all duration-200'>
                  {item.productName}
                </Link>
                <span className='font-medium text-gray-500 text-sm mt-0'>
                  {c('quantity')}: {item.quantity}
                </span>
                {(item.freeUnits > 0 || item.partialDiscount > 0) && (
                  <div className="text-green-600 text-sm">
                    {item.freeUnits > 0 && (
                      <div>
                        {c('free_units')}: {item.freeUnits} (-{item.freeUnits * item.productPrice} {c('currency')})
                      </div>
                    )}
                    {item.partialDiscount > 0 && (
                      <div>
                        {c('partial_discount')}: {item.partialDiscount}% (-{(item.productPrice * (item.partialDiscount / 100)).toFixed(2)} {c('currency')})
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end">
              {(item.freeUnits > 0 || item.partialDiscount > 0) && (
                <span className="text-sm line-through text-gray-400">
                  {item.originalPrice.toFixed(2)} {c('currency')}
                </span>
              )}
              <span className='text-lg font-medium text-neutral-700'>
                {item.finalPrice.toFixed(2)} {c('currency')}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="">
        <div className="my-2 border-b border-gray-300 py-2">
          <div className="flex justify-between items-center font-semibold">
            <span className='uppercase text-sm'>{t('sub_total')}:</span>
            <span>{discountedTotal.toFixed(2)} {c('currency')}</span>
          </div>
          <div className="flex justify-between items-center font-semibold text-green-600">
            <span className='uppercase text-sm'>{t('discount')}:</span>
            <span>-{discountRate * discountedTotal} {c('currency')}</span>
          </div>
          <div className="flex justify-between items-center font-semibold">
            <span className='uppercase text-sm'>{t('delivery_charges')}:</span>
            <span>{deliveryCharges.toFixed(2)} {c('currency')}</span>
          </div>
        </div>

        <div className="my-3 py-2">
          <div className="flex justify-between font-bold text-lg">
            <span className='uppercase'>{c('total')}:</span>
            <span>{finalTotal.toFixed(2)} {c('currency')}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutProductSummary;