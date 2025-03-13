'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const ContactForm = () => {
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        message:''
    })
    const [errors, setErrors] = useState({});
    const [loading,setLoading] = useState(false)
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-10'>
            <div className="max-w-lg m-auto order-2 sm:order-1">
                <form action="" className='border shadow-lg shadow-gray-400 border-gray-400 p-4 lg:p-6'>
                    <h2 className='text-center text-xl font-medium text-gray-700 mb-4'>Skontaktuj się z nami</h2>
                    <hr className='border-gray-300 mb-4' />
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="" className='text-gray-700'>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-400 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
                            />
                            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="customerEmail" className='text-gray-700'>Email</label>
                            <input
                                id='customerEmail'
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-400 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
                            />
                            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="message" className='text-gray-700'>Komunikat</label>
                            <textarea
                                id='message'
                                name="message"
                                placeholder="Your Review"
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
                            Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w formularzu kontaktowym dla potrzeb niezbędnych do realizacji i obsługi procesu kontaktu zgodnie z ustawą z dnia 29.08.1997 r. o ochronie danych osobowych (Dz.U. z 2002 r. Nr 101, poz. 926 z późn.zm.).
                            </label>
                        </div>
                    <button className='flex col-span-2 w-full items-center justify-center mx-auto font-medium border border-blue-800 px-3 py-1.5 bg-blue-700 text-white text-sm hover:bg-blue-800 hover:shadow shadow-gray-400 hover:cursor-pointer transition-all duration-200 disabled:bg-gray-400 disabled:border-gray-600 disabled:cursor-not-allowed' disabled={loading}>{loading ? 'Przetwarzanie' : 'Prześlij'}</button>
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
    )
}

export default ContactForm