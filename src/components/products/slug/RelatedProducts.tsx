'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '@/types';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '../ProductCard';

export interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  currency: string;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  category,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct
}) => {
  // Find related products in same category or fallback to other featured items
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === category && p.id !== currentProductId
  );
  const fallback = PRODUCTS.filter((p) => p.id !== currentProductId);
  const related = (sameCategory.length >= 3 ? sameCategory : [...sameCategory, ...fallback]).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section id="related-products-section" className="pt-12 sm:pt-16 border-t border-neutral-200 mt-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
            Complete the Capsule
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
            Related & Recommended Objects
          </h3>
          <p className="text-sm text-neutral-500 mt-1 font-normal">
            Pieces designed to pair aesthetically with similar materials and silhouettes.
          </p>
        </div>

        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-700 hover:text-black py-2 px-3.5 rounded-full bg-white border border-neutral-300 shadow-2xs transition-all self-start sm:self-auto cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {related.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            currency={currency}
            isWishlisted={wishlistIds.includes(item.id)}
            onToggleWishlist={onToggleWishlist}
            onQuickAdd={onQuickAdd}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
};
