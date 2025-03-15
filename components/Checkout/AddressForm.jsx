'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext'; // Import your CartContext
import { createOrder } from '@/lib/actions/order.action';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const AddressForm = () => {
  const t = useTranslations('Form')
  const [deliveryOption, setDeliveryOption] = useState('courier');
  const router =  useRouter()
  const { cart, productTotal, clearCart } = useCart(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inPostData, setInPostData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    parcelMachineNumber: '',
  });
  const [courierData, setCourierData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    country: 'Poland',
  });

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };

  const handleInPostChange = (e) => {
    setInPostData({ ...inPostData, [e.target.name]: e.target.value });
  };

  const handleCourierChange = (e) => {
    setCourierData({ ...courierData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let addressData;
    if (deliveryOption === 'inpost') {
      addressData = { deliveryOption, ...inPostData };
    } else {
      addressData = { deliveryOption, ...courierData };
    }

    try {
      const result = await createOrder(addressData, cart.item, productTotal);

      if (result.error) {
        setError(result.error);
      }else if(result.message === 'ok') {
        clearCart();  
        router.push(`/order-confirmation?orderId=${result.orderId}`)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error during order creation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-4 sm:p-6 border border-gray-400 shadow-md shadow-gray-300"
    >
      <h2 className="text-lg font-semibold mb-4">{t('checkout_form_title')}</h2>
      <div className="mb-4 flex space-x-2 sm:space-x-4">
        <label className="block mb-2 font-semibold text-gray-600">{t('delivery_opt')}:</label>
        <div className="flex flex-col space-y-2">
          <label className={`flex items-center font-bold ${deliveryOption === 'courier' ? 'text-blue-800' : 'text-gray-700'}`}>
            <input
              type="radio"
              value="courier"
              checked={deliveryOption === 'courier'}
              onChange={() => handleDeliveryOptionChange('courier')}
              className="mr-2 checked:accent-blue-700 hover:cursor-pointer"
            />
            DHL
          </label>
          <label className={`flex items-center font-bold ${deliveryOption === 'inpost' ? 'text-blue-800' : 'text-gray-700'} `}>
            <input
              type="radio"
              value="inpost"
              checked={deliveryOption === 'inpost'}
              onChange={() => handleDeliveryOptionChange('inpost')}
              className="mr-2 checked:accent-blue-700 hover:cursor-pointer"
            />
            InPost Parcel Locker
          </label>
        </div>
      </div>

      {deliveryOption === 'inpost' ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
          <div>
            <label className="block mb-2 text-gray-600">{t('name')}:</label>
            <input
              type="text"
              name="name"
              value={inPostData.name}
              onChange={handleInPostChange}
              placeholder={t('name_placeholder')}
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">{t('phone')}:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={inPostData.phoneNumber}
              onChange={handleInPostChange}
              placeholder={t('phone_placeholder')}
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">{t('email')}:</label>
            <input
              type="email"
              name="email"
              value={inPostData.email}
              onChange={handleInPostChange}
              placeholder={t('email_placeholder')}
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">{t('pmn')}:</label>
            <input
              type='text'
              name="parcelMachineNumber"
              value={inPostData.parcelMachineNumber}
              onChange={handleInPostChange}
              placeholder={t('pmn')}
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50 text-gray-600"
              required
            />
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
          <div>
            <label className="block mb-2 text-gray-600">{t('name')}:</label>
            <input
              type="text"
              name="name"
              value={courierData.name}
              onChange={handleCourierChange}
              placeholder={t('name_placeholder')}
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">{t('phone')}:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={courierData.phoneNumber}
              onChange={handleCourierChange}
              placeholder={t('phone_placeholder')}
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">{t('email')}:</label>
            <input
              type="email"
              name="email"
              value={courierData.email}
              onChange={handleCourierChange}
              placeholder={t('email_placeholder')}
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">{t('country')}:</label>
            <input
              type='text'
              name="country"
              value={courierData.country}
              onChange={handleCourierChange}
              placeholder={t('country_placeholder')}
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50 text-gray-600"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-gray-600">{t('address')}:</label>
            <textarea
              name="address"
              value={courierData.address}
              onChange={handleCourierChange}
              placeholder={t('address_placeholder')}
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"  
        disabled={loading || cart?.item.length === 0}
      >
        {loading ? t('loading') : t('Submit')}
      </button>
    </form>
  );
};

export default AddressForm;