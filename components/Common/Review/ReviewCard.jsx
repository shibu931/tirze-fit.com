// components/ReviewCard.js
'use client'
import React from 'react';
import RatingStar from '../RatingStar';
const ReviewCard = ({ name, rating, message, date }) => {    
    const firstLetter = name.split(" ")
        .map((word) => word.charAt(0))
        .join("");

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="relative bg-white shadow-md shadow-gray-300 border border-gray-400/90 p-6 pb-8">
            <div className='flex space-x-2 sm:space-x-3 border-b border-gray-400/75 pb-1 mb-1'>
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700 mb-4 md:mb-0 border border-gray-400">
                    {firstLetter}
                </div>
                <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <RatingStar className={'text-lg'} rating={rating}/>
                </div>
            </div>
            <p className="text-gray-700">{message}</p>
            <span className='absolute bottom-1 text-sm text-gray-600 right-2'>{formattedDate}</span>
        </div>
    );
};

export default ReviewCard;