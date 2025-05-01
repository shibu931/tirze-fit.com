'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext'; // Import your CartContext
import { createOrder } from '@/lib/actions/order.action';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/navigation';
import { Input } from '../ui/input';
import { getUserCredits, getUserInvitationCode, verifyInvitationCode } from '@/lib/actions/user.action';
import { Button } from '../ui/button';


const AddressForm = ({ locale }) => {
  const t = useTranslations('Form')
  const router = useRouter()
  const session = useSession()
  const deliveryCharges = {
    inpost: locale === 'pl' ? 20 : 5,
    dpd: locale === 'pl' ? 25 : 10,
    dhl: locale === 'pl' ? 25 : 10,
  }
  const [coupon,setCoupon] = useState('')
  const { cart, setCart, productTotal, clearCart } = useCart();
  const [deliveryOption, setDeliveryOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);

  const [inPostData, setInPostData] = useState({
    name: session?.data?.user?.name || '',
    email: session?.data?.user?.email || '',
    phoneNumber: '',
    parcelMachineNumber: '',
  });
  const [courierData, setCourierData] = useState({
    name: session?.data?.user?.name || '',
    phoneNumber: '',
    email: session?.data?.user?.email || '',
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
      const result = await createOrder(addressData, cart.item, cart?.discount || 0, coupon || null, locale);

      if (result.error) {
        setError(result.error);
      } else if (result.status === 201) {
        clearCart();
        router.push(`/order-details?orderId=${result.orderId}`)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error during order creation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscountChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < 0) {
      setDiscountValue(0);
      setCart({ ...cart, discount: 0 });
    }
    else if (value > credits) {
      setDiscountValue(credits);
      setCart({ ...cart, discount: credits });
    } else {
      setDiscountValue(value);
      setCart({ ...cart, discount: value });
    }
  }

  const applyCoupon = async () => {
    const response = await verifyInvitationCode(coupon)
    if(response.success){
      setCart({...cart,couponDiscount:10})
      setError({...error,couponError:null})
    }else{
      setError({...error,couponError:'Invalid Coupon'})
    }
  }

  useEffect(() => {
    async function getCredits() {
      const userCredits = await getUserCredits(session?.data?.user?.email);
      setCredits(userCredits?.credits || 0);
    }
    async function getCoupon(){
      const {invitationCode} = await getUserInvitationCode(session?.data?.user?.email)
      if(invitationCode) setCoupon(invitationCode)
    }
    if (session?.status === "authenticated") {
      getCredits()
      getCoupon()
    }

  }, [session?.status]);

  useEffect(() => {
    if (cart) setCart({ ...cart, deliveryCharges: deliveryCharges[deliveryOption] })
  }, [deliveryOption]);

  return (
    <div
      className="mx-auto p-4 sm:p-6 border border-gray-400 shadow-md shadow-gray-300"
    >
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <p className='text-gray-600 font-medium mb-1'>Use Coupon Code</p>
          <Input
            type="text"
            defaultValue={coupon}
            onChange={(e)=>setCoupon(e.target.value)}
            placeholder={t('coupon_code')}
            className="w-full !rounded-none"
          />
          <Button onClick={applyCoupon} size="sm" className="mt-2 rounded-none bg-blue-700 hover:bg-blue-800 hover:cursor-pointer">Apply</Button>
          {error?.couponError && <p className='text-red-600'>{error.couponError}</p>}
        </div>
        <div>
          {session?.status === 'authenticated' ? (<div>
            <div className="mb-1 space-y-2">
              <label className="block mb-2 text-gray-600">{t('use_credit')} <span className='text-xs'>(credits is applied to per product)</span></label>
              <Input
                type="number"
                min="0"
                max={credits || 0}
                onChange={(e) => handleDiscountChange(e)}
                value={cart?.discount ? cart.discount : discountValue || ''}
                placeholder={t('enter_credits')}
                className="w-full !rounded-none"
              />
            </div>
            <p className="text-gray-600 font-medium">{t('available_cr')}: <span className="font-bold text-blue-600">{credits || 0}</span></p>
          </div>) :
            (<span>Have a account? <Link href="/auth?tab=login" className="text-blue-600">Login here</Link></span>)
          }
        </div>
      </div>
      <hr className='border-gray-400 my-3' />
      <form
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-3">{t('checkout_form_title')}</h2>
        <div className="mb-4 flex space-x-2 sm:space-x-4">
          <label className="block mb-2 font-semibold text-gray-600">{t('delivery_opt')}:</label>
          <div className="flex flex-col lg:flex-row space-x-4 space-y-2 lg:space-y-1 items-center">
            <label className={`flex items-center font-bold ${deliveryOption === 'dhl' ? 'text-blue-800' : 'text-gray-700'}`}>
              <input
                type="radio"
                value="dhl"
                checked={deliveryOption === 'dhl'}
                onChange={() => handleDeliveryOptionChange('dhl')}
                className="mr-2 checked:accent-blue-700 hover:cursor-pointer"
              />
              DHL
            </label>
            <label className={`flex items-center font-bold ${deliveryOption === 'dpd' ? 'text-blue-800' : 'text-gray-700'}`}>
              <input
                type="radio"
                value="dpd"
                checked={deliveryOption === 'dpd'}
                onChange={() => handleDeliveryOptionChange('dpd')}
                className="mr-2 checked:accent-blue-700 hover:cursor-pointer"
              />
              DPD
            </label>
            <label className={`flex flex-1 items-center font-bold ${deliveryOption === 'inpost' ? 'text-blue-800' : 'text-gray-700'} `}>
              <input
                type="radio"
                value="inpost"
                checked={deliveryOption === 'inpost'}
                onChange={() => handleDeliveryOptionChange('inpost')}
                className="mr-2 checked:accent-blue-700 hover:cursor-pointer"
              />
              InPost (Only in Poland)
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
          className="w-full mt-6 text-white p-2 rounded bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading || cart?.item?.length === 0}
        >
          {loading ? t('loading') : t('Submit')}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;