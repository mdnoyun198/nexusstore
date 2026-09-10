'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  className = ''
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400">
        No image available
      </div>
    );
  }

  return (
    <div id="product-gallery" className={`flex flex-col bg-[#F3F0EA] relative rounded-2xl sm:rounded-3xl overflow-hidden ${className}`}>
      {/* Main big image view */}
      <div className="relative aspect-square md:aspect-auto md:h-full min-h-[340px] sm:min-h-[460px] overflow-hidden flex items-center justify-center">
        <img
          src={images[activeImageIdx]}
          alt={`${productName} - View ${activeImageIdx + 1}`}
          className="w-full h-full object-cover object-center transition-all duration-300 select-none"
          referrerPolicy="no-referrer"
        />

        {/* Gallery Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Photo count indicator */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-mono">
          {activeImageIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="p-3 bg-white/80 backdrop-blur-xs border-t border-[#E5E3DD] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIdx(idx)}
              className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                activeImageIdx === idx
                  ? 'border-neutral-900 ring-1 ring-neutral-900 scale-95'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Select photo ${idx + 1}`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
