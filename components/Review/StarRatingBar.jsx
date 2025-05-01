import { useTranslations } from 'next-intl';
import React from 'react';

const StarRatingBar = ({ starCount, percentage }) => {
  const t = useTranslations('Common')
  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="flex-shrink-0 text-xs sm:text-sm w-16 sm:w-12 text-left">
        {starCount} {t('Star')}
      </div>
      <div className="relative w-54 sm:w-64 h-4 bg-gray-200 overflow-hidden">
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