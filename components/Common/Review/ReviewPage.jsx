'use client';

import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import RatingStar from '../RatingStar';
import StarRatingBar from './StarRatingBar';
import { getReviewBySlug } from '@/lib/actions/review.action';

const ReviewPage = ({ slug }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingPercentages, setRatingPercentages] = useState({});
  const [totalReviews,setTotalReivews] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    console.log("Running");

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { reviews, averageRating, ratingPercentages, totalPages, totalReviews, currentPage, error } = await getReviewBySlug(slug, page);
        if (error) {
          setError(error);
        } else {
          setReviews(reviews);
          setAverageRating(averageRating);
          setRatingPercentages(ratingPercentages);
          setHasMore(currentPage < totalPages);
          setTotalReivews(totalReviews)
        }
      } catch (err) {
        setError('Failed to load reviews.');
        console.error('Error loading reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const loadMoreReviews = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const { reviews, averageRating, ratingPercentages, totalPages, currentPage, error, totalReviews } = await getReviewBySlug(slug, page + 1);
      if (error) {
        setError(error);
      } else {
        setReviews(reviews);
        setAverageRating(averageRating);
        setRatingPercentages(ratingPercentages);
        setHasMore(currentPage < totalPages);
        setPage(page + 1);
      }
    } catch (err) {
      setError('Failed to load more reviews.');
      console.error('Error loading more reviews:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <p className="text-center my-10">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center my-10 text-red-700">{error}</p>;
  }

  return (
    <>
      <h3 className="text-center font-bold text-2xl ">
        {slug.replaceAll('-', ' ').toUpperCase()} - opinię
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 lg:gap-8 mt-4 sm:mt-8">
        <div className="lg:col-span-4">
          <div className="sticky top-22">
            <ReviewForm slug={slug} />
          </div>
        </div>
        <div className="lg:col-span-6">
          {reviews.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row space-y-4 justify-evenly items-center my-5">
                <div className="flex flex-col items-center">
                  <span className="text-5xl font-bold text-gray-800">{averageRating}</span>
                  <RatingStar rating={averageRating} className={'text-lg'} />
                  <span className="mt-1 text-gray-500 font-medium">Based on {totalReviews} Rating's</span>
                </div>
                <div className="space-y-2">
                  {ratingPercentages.map((rating, index) => (
                    <StarRatingBar key={index} {...rating} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} name={review.name} rating={review.rating} message={review.message} date={review.createdAt} />
                ))}
                {hasMore && (
                  <div className="sm:col-span-2 flex justify-center py-5">
                    <button className="px-2 py-1.5 border-2 border-blue-700 text-blue-700 font-semibold uppercase hover:text-white hover:bg-blue-700 text-sm hover:cursor-pointer" onClick={loadMoreReviews} disabled={loadingMore}>
                      {loadingMore ? 'Loading...' : 'Load More Reviews'}
                      
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-lg font-semibold text-center my-10 text-red-700 sm:col-span-2">
              Żadna recenzja nie została jeszcze opublikowana
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewPage;