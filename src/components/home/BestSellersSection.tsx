'use client'

import React from 'react';
import { Product, ProductColor } from '@/types';
import { ProductCarousel } from '@/components/ProductCarousel';

export interface BestSellersSectionProps {
  products: Product[];
  currency: string;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
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
      tag="HIGHEST RATED"
      title="Hall of Fame Editions"
      subtitle="Pieces verified and acclaimed by our design community with 4.9+ star ratings."
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
