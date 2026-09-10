'use client'
import React from 'react';
import { Heart, ArrowLeft, Trash2, Plus } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';

interface WishlistViewProps {
  wishlistProducts: Product[];
  currency: string;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToCatalog: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistProducts,
  currency,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  onNavigateToCatalog
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[60vh]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-medium">
            Saved For Later
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 mt-1 flex items-center gap-2.5">
            <span>Wishlist Archive</span>
            <span className="text-sm font-mono font-normal text-neutral-400">
              ({wishlistProducts.length})
            </span>
          </h1>
        </div>

        <button
          onClick={onNavigateToCatalog}
          className="text-xs sm:text-sm font-semibold text-neutral-800 hover:text-black flex items-center gap-1.5 font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-neutral-900">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Save your favorite modern garments, acoustics, and home objects to review anytime.
            </p>
          </div>
          <button
            onClick={onNavigateToCatalog}
            className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
          >
            Explore the Collection
          </button>
        </div>
      ) : (
        <div className="pt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={onQuickAdd}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}

    </div>
  );
};
