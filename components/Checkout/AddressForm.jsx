'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext'; // Import your CartContext
import { createOrder } from '@/lib/actions/order.action';
import { useRouter } from 'next/navigation';

const AddressForm = () => {
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
      <h2 className="text-lg font-semibold mb-4">Adres</h2>
      <div className="mb-4 flex space-x-2 sm:space-x-4">
        <label className="block mb-2 font-semibold text-gray-600">Opcje dostawy:</label>
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
            <label className="block mb-2 text-gray-600">Name:</label>
            <input
              type="text"
              name="name"
              value={inPostData.name}
              onChange={handleInPostChange}
              placeholder='Enter your name'
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={inPostData.phoneNumber}
              onChange={handleInPostChange}
              placeholder='Enter your phone no.'
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Email Address:</label>
            <input
              type="email"
              name="email"
              value={inPostData.email}
              onChange={handleInPostChange}
              placeholder='Enter your email'
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Parcel Machine Number:</label>
            <input
              type='text'
              name="parcelMachineNumber"
              value={inPostData.parcelMachineNumber}
              onChange={handleInPostChange}
              placeholder='Enter your PMN'
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50 text-gray-600"
              required
            />
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
          <div>
            <label className="block mb-2 text-gray-600">Name:</label>
            <input
              type="text"
              name="name"
              value={courierData.name}
              onChange={handleCourierChange}
              placeholder='Enter your name'
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={courierData.phoneNumber}
              onChange={handleCourierChange}
              placeholder='Enter your phone no.'
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Email Address:</label>
            <input
              type="email"
              name="email"
              value={courierData.email}
              onChange={handleCourierChange}
              placeholder='Enter your email'
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Country:</label>
            <input
              type='text'
              name="country"
              value={courierData.country}
              onChange={handleCourierChange}
              placeholder='Enter your country'
              className="w-full border border-gray-300 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50 text-gray-600"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-gray-600">Address:</label>
            <textarea
              name="address"
              value={courierData.address}
              onChange={handleCourierChange}
              placeholder='Emter full address - House no., Street, City'
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
        {loading ? 'Processing...' : 'Submit Address'}
      </button>
    </form>
  );
};

export default AddressForm;