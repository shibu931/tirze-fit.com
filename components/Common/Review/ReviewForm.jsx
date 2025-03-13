'use client'
import { createReview } from '@/lib/actions/review.action';
import React, { useState } from 'react'
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { toast } from 'sonner';

const reviewIinitalState ={
    name: '',
    email: '',
    rating: 5,
    message: '',
}

const ReviewForm = ({slug}) => {
    const [reviewData, setReviewData] = useState(reviewIinitalState)
    const [submitted, setSubmitted] = useState(false);
    const [loading,setLoading] = useState(false)
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!reviewData.name.trim()) newErrors.name = 'Name is required';
        if (!reviewData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (reviewData.rating === 0) newErrors.rating = 'Please select a rating';
        if (!reviewData.message.trim()) newErrors.message = 'Message cannot be empty';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRating = (rate) => {
        setFormData((prev) => ({ ...prev, rating: rate }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try{
            setLoading(true)
            const result = await createReview(slug,reviewData)
            if(result.message === 'ok') {
                setReviewData(reviewIinitalState)
                toast.success("Sukces", {
                    description: "Twoja recenzja zostanie opublikowana po zweryfikowaniu",
                })
            } 
        }catch (err){
            console.error("Error during review post: ",err);
            toast.error("błąd", {
                description: "Twoja recenzja zostanie opublikowana po zweryfikowaniu",
            })
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='w-full border border-gray-400 p-4 sm:p-6'>
            <h4 className='text-xl font-semibold mb-4'>Zostaw opinię</h4>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className='col-span-2 flex flex-col justify-center items-center'>
                        <label htmlFor="ratingStart" className='mb-2 text-lg font-medium text-gray-600'>Wybierz ocenę</label>
                        <div className="flex gap-2" id='ratingStart'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <MdOutlineStarPurple500
                                    key={star}
                                    className={`cursor-pointer text-3xl sm:text-5xl ${reviewData.rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                                    onClick={() => handleRating(star)}
                                />
                            ))}
                        </div>
                        {errors.rating && <p className='text-red-500 text-sm'>{errors.rating}</p>}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="" className='text-gray-700'>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Your Name"
                            value={reviewData.name}
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
                            value={reviewData.email}
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
                            value={reviewData.message}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-400 shadow-md shadow-gray-200 p-2 focus-visible:outline-blue-400/50"
                        ></textarea>
                        {errors.message && <p className='text-red-500 text-sm'>{errors.message}</p>}
                    </div>
                </div>
                <button className='flex w-full items-center justify-center mx-auto font-medium border border-blue-800 px-3 py-1.5 bg-blue-700 text-white text-sm hover:bg-blue-800 hover:shadow shadow-gray-400 hover:cursor-pointer transition-all duration-200 disabled:bg-gray-400 disabled:border-gray-600 disabled:cursor-not-allowed' disabled={loading}>{loading ? 'Przetwarzanie':'Opublikuj recenzję'}</button>
            </form>
        </div>
    )
}

export default ReviewForm