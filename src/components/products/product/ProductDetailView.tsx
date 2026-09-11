'use client'

import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Product, ProductColor, ViewMode } from '@/types';
import { ProductGallery } from './ProductGallery';
import { ProductDetails } from './ProductDetails';
import { AddToCart } from './AddToCart';
import { Reviews } from './Reviews';
import { RelatedProducts } from './RelatedProducts';

export interface ProductDetailViewProps {
  product: Product;
  currency: string;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string | undefined, quantity: number) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onBack?: () => void;
  onNavigate?: (view: ViewMode, category?: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickAdd,
  onSelectProduct,
  onBack,
  onNavigate
}) => {
  const isWishlisted = wishlistIds.includes(product.id);

  return (
    <div id="product-detail-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb Navigation Bar */}
      <nav className="flex items-center justify-between gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-neutral-800 hover:text-black font-semibold cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate?.('catalog')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Storefront
            </button>
          )}

          <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />

          <button
            onClick={() => onNavigate?.('catalog', product.category)}
            className="hover:text-black transition-colors cursor-pointer whitespace-nowrap"
          >
            {product.category}
          </button>

          <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />

          <span className="text-neutral-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </div>

        <span className="text-[11px] text-neutral-400 hidden sm:inline">
          SKU: {product.id.toUpperCase()}
        </span>
      </nav>

      {/* Main Two-Column Layout: Gallery + Details & AddToCart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery Column */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
            className="shadow-xs"
          />
        </div>

        {/* Details & Cart Action Column */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-neutral-200/80 shadow-2xs space-y-6">
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

      {/* Customer Reviews & Breakdown */}
      <Reviews product={product} />

      {/* Related Products Section */}
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
        currency={currency}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onQuickAdd={onQuickAdd}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
};
