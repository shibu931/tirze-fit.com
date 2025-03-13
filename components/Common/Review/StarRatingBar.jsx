import React from 'react';

const StarRatingBar = ({ starCount, percentage }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-shrink-0 w-12 text-left">
        {starCount} Star
      </div>
      <div className="relative w-64 h-4 bg-gray-200 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-yellow-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex-shrink-0 w-12 text-right">
        {percentage}%
      </div>
    </div>
  );
};

export default StarRatingBar;