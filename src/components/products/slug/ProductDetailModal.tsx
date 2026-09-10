'use client'

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Product, ProductColor } from '@/types';
import { ProductGallery } from './ProductGallery';
import { ProductDetails } from './ProductDetails';
import { AddToCart } from './AddToCart';

export interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: string;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string | undefined, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="product-detail-dialog"
        className="relative bg-[#FAF9F6] w-full max-w-5xl rounded-none sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col md:flex-row max-h-[100vh] sm:max-h-[90vh]"
      >
        {/* Close Button Top Right */}
        <button
          id="close-detail-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
          aria-label="Close Product View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Modular Gallery */}
        <div className="w-full md:w-1/2 flex flex-col bg-[#F3F0EA]">
          <ProductGallery
            images={product.images}
            productName={product.name}
            className="h-full rounded-none"
          />
        </div>

        {/* Right Column: Information, Options & Add To Cart */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto no-scrollbar flex flex-col justify-between">
          <div className="space-y-6">
            <ProductDetails product={product} currency={currency} />
            <AddToCart
              product={product}
              currency={currency}
              isWishlisted={isWishlisted}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
