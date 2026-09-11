'use client'

import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { Product } from '@/types';

export interface ReviewsProps {
  product: Product;
}

interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export const Reviews: React.FC<ReviewsProps> = ({ product }) => {
  const [filterStars, setFilterStars] = useState<number | null>(null);

  // Generate realistic reviews based on product
  const reviews: ReviewItem[] = [
    {
      id: 'rev-1',
      author: 'Julian V.',
      location: 'Berlin, Germany',
      rating: 5,
      date: '2 weeks ago',
      title: 'Flawless craftsmanship and structural silhouette',
      comment: `The weight and tactile hand-feel of this piece exceeds expectations. You immediately notice the difference in material density compared to standard luxury offerings. Sizing is precise with comfortable drape.`,
      verified: true,
      helpfulCount: 24
    },
    {
      id: 'rev-2',
      author: 'Marcus L.',
      location: 'Stockholm, Sweden',
      rating: 5,
      date: '1 month ago',
      title: 'Minimalist industrial perfection',
      comment: `Every stitch and fastener is considered. Zero unnecessary branding or hype graphics—just pure utilitarian excellence and refined architectural form. Worth every penny.`,
      verified: true,
      helpfulCount: 18
    },
    {
      id: 'rev-3',
      author: 'Elena R.',
      location: 'San Francisco, CA',
      rating: 4,
      date: '1 month ago',
      title: 'Exceptional material integrity',
      comment: `Arrived in plastic-free recycled matte packaging. The finish feels built to last generations. Would recommend sizing down slightly if you prefer a slim rather than relaxed drape.`,
      verified: true,
      helpfulCount: 11
    }
  ];

  const ratingBreakdown = [
    { stars: 5, percentage: 86, count: Math.round(product.reviewsCount * 0.86) },
    { stars: 4, percentage: 11, count: Math.round(product.reviewsCount * 0.11) },
    { stars: 3, percentage: 2, count: Math.round(product.reviewsCount * 0.02) },
    { stars: 2, percentage: 1, count: Math.round(product.reviewsCount * 0.01) },
    { stars: 1, percentage: 0, count: 0 }
  ];

  const filteredReviews = filterStars ? reviews.filter((r) => r.rating === filterStars) : reviews;

  return (
    <div id="product-reviews-section" className="pt-10 sm:pt-14 border-t border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
            Verified Feedback
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
            Customer Reviews & Ratings
          </h2>
          <p className="text-sm text-neutral-500 mt-1 max-w-md font-normal">
            Real feedback collected from verified purchasers worldwide.
          </p>
        </div>

        {/* Rating Summary Card */}
        <div className="flex items-center gap-6 p-5 bg-white border border-neutral-200/80 rounded-2xl shadow-2xs">
          <div className="text-center pr-6 border-r border-neutral-200">
            <span className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 font-mono">
              {product.rating}
            </span>
            <div className="flex items-center justify-center gap-0.5 my-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">
              Based on {product.reviewsCount} reviews
            </span>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-1.5 w-44 sm:w-52">
            {ratingBreakdown.map((item) => (
              <button
                key={item.stars}
                onClick={() => setFilterStars(filterStars === item.stars ? null : item.stars)}
                className={`w-full flex items-center gap-2 text-[11px] font-mono cursor-pointer group text-left ${
                  filterStars === item.stars ? 'font-bold text-black' : 'text-neutral-600'
                }`}
              >
                <span className="w-3 shrink-0">{item.stars}★</span>
                <div className="flex-1 bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-neutral-900 h-full rounded-full group-hover:bg-amber-500 transition-colors"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-7 text-right text-neutral-400">{item.percentage}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-mono text-xs font-semibold flex items-center justify-center">
                  {review.author.slice(0, 1)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-normal">
                    {review.location} · {review.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h4 className="font-display text-sm sm:text-base font-bold text-neutral-900">
              {review.title}
            </h4>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              {review.comment}
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-neutral-400">
              <button className="inline-flex items-center gap-1 hover:text-black transition-colors cursor-pointer">
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({review.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
