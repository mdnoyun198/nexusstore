'use client'

import React from 'react';
import { Product, ProductColor } from '@/types';
import { ProductCard } from './ProductCard';

export interface ProductGridProps {
  products: Product[];
  currency: string;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onResetFilters?: () => void;
  emptyTitle?: string;
  emptySubtitle?: string;
  columns?: '3' | '4';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  onResetFilters,
  emptyTitle = 'No objects match current criteria',
  emptySubtitle = 'Try adjusting your price ceiling, resetting your category filters, or searching for other keywords.',
  columns = '4'
}) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <h3 className="font-display font-semibold text-lg text-neutral-900">
          {emptyTitle}
        </h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto font-normal">
          {emptySubtitle}
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-5 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  const gridClass =
    columns === '3'
      ? 'grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'
      : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6';

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          currency={currency}
          isWishlisted={wishlistIds.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
          onQuickAdd={onQuickAdd}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
};
