'use client'
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  tag?: string;
  products: Product[];
  currency: string;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll?: () => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  tag,
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  onViewAll
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100 || 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const cardWidth = 320; // approximate card width with gap
    const offset = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            {tag && (
              <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase font-medium">
                {tag}
              </span>
            )}
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-0.5">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-neutral-500 max-w-lg mt-1 font-normal">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="text-xs sm:text-sm font-semibold text-neutral-900 hover:text-neutral-600 flex items-center gap-1 group font-mono transition-colors"
              >
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'bg-white text-neutral-800 hover:bg-neutral-100 active:scale-95 shadow-xs'
                    : 'bg-neutral-100 text-neutral-300 border-neutral-200 cursor-not-allowed'
                }`}
                aria-label="Scroll carousel left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'bg-white text-neutral-800 hover:bg-neutral-100 active:scale-95 shadow-xs'
                    : 'bg-neutral-100 text-neutral-300 border-neutral-200 cursor-not-allowed'
                }`}
                aria-label="Scroll carousel right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport with Scroll Snap */}
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[240px] sm:w-[280px] md:w-[310px] shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                currency={currency}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
              />
            </div>
          ))}
        </div>

        {/* Scroll indicator bar for touch users */}
        <div className="mt-4 w-full max-w-xs mx-auto bg-neutral-200 h-1 rounded-full overflow-hidden sm:hidden">
          <div
            className="bg-neutral-900 h-full rounded-full transition-all duration-150"
            style={{ width: `${Math.max(15, scrollProgress)}%` }}
          />
        </div>

      </div>
    </section>
  );
};
