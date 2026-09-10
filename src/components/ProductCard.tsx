'use client'
import React, { useState } from 'react';
import { Heart, Plus, Check, Star } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  currency: string;
  currencyRate?: number;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  currencyRate = 1,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [justAdded, setJustAdded] = useState(false);

  // Format price
  const formatPrice = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    const converted = Math.round(amount * (currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1));
    return `${symbol}${converted}`;
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes ? product.sizes[1] || product.sizes[0] : undefined;
    onQuickAdd(product, selectedColor, defaultSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E9E7E2] overflow-hidden hover:shadow-xl hover:border-neutral-400/50 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProduct(product)}
    >
      {/* Image Viewport */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F2EFE9] cursor-pointer">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold bg-neutral-900 text-white rounded-full">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-wider font-semibold bg-rose-600 text-white rounded-full">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold bg-amber-600/90 text-white rounded-full">
              Staff Pick
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-600 hover:text-rose-500 shadow-sm transition-transform active:scale-90"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-rose-500 text-rose-500' : 'stroke-[2]'
            }`}
          />
        </button>

        {/* Mobile / Hover Quick Add Pill */}
        <div className="absolute bottom-3 inset-x-3 z-10 transition-all duration-300">
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 shadow-md backdrop-blur-md transition-all ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-white/95 text-neutral-900 hover:bg-black hover:text-white sm:opacity-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Quick Add · {formatPrice(product.price)}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-2.5 cursor-pointer">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-1">
            <span className="uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 text-neutral-700 font-sans">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-semibold">{product.rating}</span>
              <span className="text-[10px] text-neutral-400">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-display font-semibold text-neutral-900 text-sm sm:text-base leading-snug group-hover:text-neutral-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Color swatches & Price */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          {/* Color swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-black ring-offset-1 scale-110'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Select color ${c.name}`}
              />
            ))}
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 font-mono text-sm">
            <span className="font-bold text-neutral-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
