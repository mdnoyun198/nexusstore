'use client'

import React from 'react';
import { Product, ProductColor } from '@/types';
import { ProductCarousel } from '@/components/ProductCarousel';

export interface AudioAndCarrySectionProps {
  products: Product[];
  currency: string;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const AudioAndCarrySection: React.FC<AudioAndCarrySectionProps> = ({
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
      tag="TECHWEAR & WORKSPACE"
      title="Everyday Carry & Acoustics"
      subtitle="Waterproof ballistic Cordura bags, aerospace titanium wallets, and CNC keyboards."
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
