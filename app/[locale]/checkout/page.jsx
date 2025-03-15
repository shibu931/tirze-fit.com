import Address from '@/components/Checkout/AddressForm'
import CheckoutProductSummary from '@/components/Checkout/CheckoutProductSummary'
import { useTranslations } from 'next-intl'
import React from 'react'

const page = () => {
  const t = useTranslations('Checkout')
  return (
    <main>
      <h1 className='text-center text-xl sm:text-2xl lg:text-4xl font-extrabold uppercase tracking-widest text-gray-800'>{t('chktout')}</h1>
      <hr className='my-6 border-gray-500' />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        <div>
          <Address/>
        </div>
        <div className="border border-gray-400 p-4 bg-gray-100 shadow-md shadow-gray-300 relative pb-[140px]">
          <CheckoutProductSummary />
        </div>
      </div>
    </main>
  )
}

export default page

