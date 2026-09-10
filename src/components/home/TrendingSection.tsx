'use client'

import React from 'react';
import { Product, ProductColor } from '@/types';
import { ProductCarousel } from '@/components/ProductCarousel';

export interface TrendingSectionProps {
  products: Product[];
  currency: string;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  onViewAll,
}) => {
  return (
    <ProductCarousel
      tag="DROP 04 · CURATED RELEASES"
      title="Trending & Newly Formulated"
      subtitle="Sculptural French Terry garments, Italian footwear, and pure lossless acoustic audio."
      products={products}
      currency={currency}
      wishlistIds={wishlistIds}
      onToggleWishlist={onToggleWishlist}
      onQuickAdd={onQuickAdd}
      onSelectProduct={onSelectProduct}
      onViewAll={onViewAll}
    />
  );
};
