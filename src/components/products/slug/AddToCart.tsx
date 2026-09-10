'use client'

import React, { useState } from 'react';
import { Heart, Check, Share2 } from 'lucide-react';
import { Product, ProductColor } from '@/types';

export interface AddToCartProps {
  product: Product;
  currency: string;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string | undefined, quantity: number) => void;
  onOpenSizeGuide?: () => void;
}

export const AddToCart: React.FC<AddToCartProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide
}) => {
  const [selectedColorState, setSelectedColorState] = useState<ProductColor>(product.colors[0]);
  const [selectedSizeState, setSelectedSizeState] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const formatPrice = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    const converted = Math.round(amount * (currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1));
    return `${symbol}${converted}`;
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColorState, selectedSizeState, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div id="product-add-to-cart-section" className="space-y-5 pt-2">
      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-neutral-700">
            Color: <span className="text-black font-semibold">{selectedColorState.name}</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColorState(c)}
              className={`group relative flex items-center justify-center p-1 rounded-full border transition-all cursor-pointer ${
                selectedColorState.name === c.name
                  ? 'border-black ring-1 ring-black scale-105'
                  : 'border-transparent hover:scale-105'
              }`}
              title={c.name}
              aria-label={`Select color ${c.name}`}
            >
              <span
                className="w-7 h-7 rounded-full shadow-inner border border-black/15"
                style={{ backgroundColor: c.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector if available */}
      {product.sizes && (
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-medium text-neutral-700">
              Select Size: <span className="text-black font-semibold">{selectedSizeState}</span>
            </span>
            <button
              onClick={onOpenSizeGuide}
              className="text-neutral-400 font-mono text-[11px] underline cursor-pointer hover:text-black transition-colors"
            >
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSizeState(sz)}
                className={`min-w-[48px] py-2 px-3 text-xs font-mono font-medium rounded-xl border transition-all cursor-pointer ${
                  selectedSizeState === sz
                    ? 'border-black bg-black text-white shadow-2xs'
                    : 'border-neutral-300 bg-white text-neutral-800 hover:border-black'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Stepper & Add to Bag */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center gap-3">
          {/* Quantity Controller */}
          <div className="flex items-center border border-neutral-300 rounded-2xl bg-white px-2 py-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black font-bold cursor-pointer transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center font-mono font-semibold text-sm">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black font-bold cursor-pointer transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Primary Add to Cart Button */}
          <button
            id="product-page-add-to-cart-btn"
            onClick={handleAdd}
            className={`flex-1 py-3.5 px-6 rounded-2xl font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
              addedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-black hover:bg-neutral-800 text-white'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Added to Your Bag</span>
              </>
            ) : (
              <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            id="product-page-wishlist-btn"
            onClick={() => onToggleWishlist(product)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              isWishlisted
                ? 'border-rose-200 bg-rose-50 text-rose-600'
                : 'border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-600'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-3.5 rounded-2xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-600 transition-all relative cursor-pointer"
            title="Share link"
            aria-label="Share product link"
          >
            <Share2 className="w-5 h-5" />
            {copiedLink && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap shadow-sm">
                Link Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
