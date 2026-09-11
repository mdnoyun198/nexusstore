'use client'

import React, { useState } from 'react';
import { Star, ChevronRight, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';

export interface ProductDetailsProps {
  product: Product;
  currency: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, currency }) => {
  const [openSection, setOpenSection] = useState<'details' | 'materials' | 'shipping' | null>('details');

  const formatPrice = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    const converted = Math.round(amount * (currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1));
    return `${symbol}${converted}`;
  };

  return (
    <div id="product-details-content" className="space-y-6">
      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1.5">
          <span className="uppercase tracking-widest font-medium">{product.category}</span>
          <div className="flex items-center gap-1.5 text-neutral-800">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-xs">{product.rating}</span>
            <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
          {product.name}
        </h1>

        <p className="text-sm sm:text-base text-neutral-500 mt-1.5 font-normal leading-relaxed">
          {product.tagline}
        </p>

        {/* Pricing Banner */}
        <div className="flex items-baseline gap-3 mt-3.5">
          <span className="text-2xl sm:text-3xl font-bold text-neutral-900 font-mono">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-base sm:text-lg text-neutral-400 line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold bg-rose-100 text-rose-700">
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* In-Stock & Dispatch Perk */}
      <div className="flex items-center gap-2.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-2.5 rounded-xl">
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
        <span>In Stock · Ready to dispatch within 24 hours from Studio Warehouse</span>
      </div>

      {/* Accordion Specs & Details */}
      <div className="border-t border-neutral-200 divide-y divide-neutral-200 pt-3">
        {/* Product Details */}
        <div className="py-3">
          <button
            onClick={() => setOpenSection(openSection === 'details' ? null : 'details')}
            className="w-full flex items-center justify-between text-xs font-semibold text-neutral-900 tracking-wide uppercase py-1 cursor-pointer"
          >
            <span>Design & Fit Details</span>
            <ChevronRight
              className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                openSection === 'details' ? 'rotate-90' : ''
              }`}
            />
          </button>
          {openSection === 'details' && (
            <div className="pt-2.5 text-xs sm:text-sm text-neutral-600 space-y-2 leading-relaxed font-normal animate-fadeIn">
              <p className="mb-2 text-neutral-700">{product.description}</p>
              <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Materials & Sustainability */}
        <div className="py-3">
          <button
            onClick={() => setOpenSection(openSection === 'materials' ? null : 'materials')}
            className="w-full flex items-center justify-between text-xs font-semibold text-neutral-900 tracking-wide uppercase py-1 cursor-pointer"
          >
            <span>Materials & Sustainability</span>
            <ChevronRight
              className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                openSection === 'materials' ? 'rotate-90' : ''
              }`}
            />
          </button>
          {openSection === 'materials' && (
            <div className="pt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal animate-fadeIn">
              <p>{product.materials}</p>
            </div>
          )}
        </div>

        {/* Shipping & Returns */}
        <div className="py-3">
          <button
            onClick={() => setOpenSection(openSection === 'shipping' ? null : 'shipping')}
            className="w-full flex items-center justify-between text-xs font-semibold text-neutral-900 tracking-wide uppercase py-1 cursor-pointer"
          >
            <span>Shipping & Free Returns</span>
            <ChevronRight
              className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                openSection === 'shipping' ? 'rotate-90' : ''
              }`}
            />
          </button>
          {openSection === 'shipping' && (
            <div className="pt-2.5 text-xs sm:text-sm text-neutral-600 space-y-2.5 leading-relaxed font-normal animate-fadeIn">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Complimentary carbon-neutral express shipping on all orders over $75.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>30-day hassle-free trial returns & prepaid worldwide return labels.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>2-year manufacturer warranty covering construction and materials.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
