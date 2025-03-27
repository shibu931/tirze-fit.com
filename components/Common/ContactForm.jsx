'use client'
import { sendContactEmail } from '@/lib/actions/message.action'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

const ContactForm = () => {
    const t = useTranslations('Form');
    const c = useTranslations('Common');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccessMessage('');
        setErrorMessage('');

        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = t('name_required');
        }
        if (!formData.email.trim()) {
            newErrors.email = t('email_required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('email_invalid');
        }
        if (!formData.message.trim()) {
            newErrors.message = t('message_required');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const result = await sendContactEmail(formData);
            if (result && result.success) {
                toast.success('Success',{
                    description:'Submited'
                })
                setFormData({ name: '', email: '', message: '' });
            } else {
                toast.error('error',{
                    description:'Something went wrong'
                })
            }
        } catch (error) {
            toast.error('error',{
                description:'Something went wrong'
            })
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mt-20">
                <h2 className="text-2xl  sm:text-3xl font-semibold uppercase text-neutral-800 mb-2 mt-10" style={{ wordSpacing: '5px' }}>{c('contact_title')}</h2>
                <p className=''>{c('contact_desc')}</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-10'>
                <div className="m-auto order-2 sm:order-1">
                    <form onSubmit={handleSubmit} className='border shadow-lg shadow-gray-400 border-gray-400 p-4 lg:p-6'>
                        <h2 className='text-center text-xl font-medium text-gray-700 mb-4'>{t('title')}</h2>
                        <hr className='border-gray-300 mb-4' />
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="" className='text-gray-700'>{t('name')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={t('name_placeholder')}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-400 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
                                />
                                {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="customerEmail" className='text-gray-700'>{t('email')}</label>
                                <input
                                    id='customerEmail'
                                    type="email"
                                    name="email"
                                    placeholder={t('email_placeholder')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-400 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
                                />
                                {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="message" className='text-gray-700'>{t('message')}</label>
                                <textarea
                                    id='message'
                                    name="message"
                                    placeholder={t('message_placeholder')}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full border border-gray-400 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
                                ></textarea>
                                {errors.message && <p className='text-red-500 text-sm'>{errors.message}</p>}
                            </div>
                            <div className="col-span-2">
                                <label className='text-sm text-gray-600'>
                                    <input
                                        type='checkbox'
                                        className='me-2 mt-1'
                                        required
                                    />
                                    {t('checkbox_label')}
                                </label>
                            </div>
                            <button
                                type="submit"
                                className='flex col-span-2 w-full items-center justify-center mx-auto font-medium border border-blue-800 px-3 py-1.5 bg-blue-700 text-white text-sm hover:bg-blue-800 hover:shadow shadow-gray-400 hover:cursor-pointer transition-all duration-200 disabled:bg-gray-400 disabled:border-gray-600 disabled:cursor-not-allowed'
                                disabled={loading}
                            >
                                {loading ? t('loading') : t('Submit')}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="my-auto order-1 sm:order-2">
                    <Image
                        src="/assets/Contact us.svg"
                        height={400}
                        width={400}
                        className="w-full"
                        alt='Contact us'
                    />
                </div>
            </div>
        </div>
    )
}

export default ContactForm