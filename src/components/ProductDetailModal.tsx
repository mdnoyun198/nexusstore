'use client'

import React, { useState, useEffect } from 'react';
import { X, Heart, Star, RefreshCw, Truck, ChevronRight, Check, ChevronLeft, Share2 } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: string;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string | undefined, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColorState, setSelectedColorState] = useState<ProductColor | null>(null);
  const [selectedSizeState, setSelectedSizeState] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [openSection, setOpenSection] = useState<'details' | 'materials' | 'shipping' | null>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [product]);

  if (!product) return null;

  const currentColor = selectedColorState || product.colors[0];
  const currentSize = selectedSizeState !== null ? selectedSizeState : (product.sizes ? product.sizes[0] : undefined);

  const formatPrice = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    const converted = Math.round(amount * (currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1));
    return `${symbol}${converted}`;
  };

  const handleAdd = () => {
    onAddToCart(product, currentColor, currentSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div
        id="product-detail-dialog"
        className="relative bg-[#FAF9F6] w-full max-w-5xl rounded-none sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col md:flex-row max-h-[100vh] sm:max-h-[90vh]"
      >
        {/* Close Button Top Right */}
        <button
          id="close-detail-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition-transform active:scale-90"
          aria-label="Close Product View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Gallery Carousel */}
        <div className="w-full md:w-1/2 flex flex-col bg-[#F3F0EA] relative">
          {/* Main big image view */}
          <div className="relative aspect-square md:aspect-auto md:h-full min-h-[340px] sm:min-h-[420px] overflow-hidden flex items-center justify-center">
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
              referrerPolicy="no-referrer"
            />

            {/* Gallery Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all active:scale-95"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition-all active:scale-95"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Photo count indicator */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-mono">
              {activeImageIdx + 1} / {product.images.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="p-3 bg-white/70 border-t border-[#E5E3DD] flex items-center gap-2 overflow-x-auto no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIdx === idx
                    ? 'border-neutral-900 ring-1 ring-neutral-900 scale-95'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Information & Options */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto no-scrollbar flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1">
                <span className="uppercase tracking-widest">{product.category}</span>
                <div className="flex items-center gap-1.5 text-neutral-800">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-xs">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                {product.name}
              </h2>

              <p className="text-sm text-neutral-500 mt-1">
                {product.tagline}
              </p>

              {/* Pricing banner */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-bold text-neutral-900 font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-neutral-400 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold bg-rose-100 text-rose-700">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* In-Stock & Dispatch perk */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-2 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>In Stock · Ready to dispatch in 24 hours from Studio Warehouse</span>
            </div>

            {/* Color selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium text-neutral-700">
                  Color: <span className="text-black font-semibold">{currentColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorState(c)}
                    className={`group relative flex items-center justify-center p-1 rounded-full border transition-all ${
                      currentColor.name === c.name
                        ? 'border-black ring-1 ring-black scale-105'
                        : 'border-transparent hover:scale-105'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-inner border border-black/15"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector if apparel / footwear */}
            {product.sizes && (
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-neutral-700">
                    Select Size: <span className="text-black font-semibold">{currentSize}</span>
                  </span>
                  <span className="text-neutral-400 font-mono text-[11px] underline cursor-pointer hover:text-black">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSizeState(sz)}
                      className={`min-w-[48px] py-2 px-3 text-xs font-mono font-medium rounded-xl border transition-all ${
                        currentSize === sz
                          ? 'border-black bg-black text-white'
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
                {/* Quantity controller */}
                <div className="flex items-center border border-neutral-300 rounded-2xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-semibold text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
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
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isWishlisted
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-600'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="p-3.5 rounded-2xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-600 transition-all relative"
                  title="Share link"
                >
                  <Share2 className="w-5 h-5" />
                  {copiedLink && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Accordion specs & details */}
            <div className="border-t border-neutral-200 divide-y divide-neutral-200 pt-3">
              {/* Product Details */}
              <div className="py-2.5">
                <button
                  onClick={() => setOpenSection(openSection === 'details' ? null : 'details')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-900 tracking-wide uppercase py-1"
                >
                  <span>Design & Fit Details</span>
                  <ChevronRight className={`w-4 h-4 text-neutral-400 transition-transform ${openSection === 'details' ? 'rotate-90' : ''}`} />
                </button>
                {openSection === 'details' && (
                  <div className="pt-2 text-xs text-neutral-600 space-y-1.5 leading-relaxed font-normal">
                    <p className="mb-2">{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Materials & Care */}
              <div className="py-2.5">
                <button
                  onClick={() => setOpenSection(openSection === 'materials' ? null : 'materials')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-900 tracking-wide uppercase py-1"
                >
                  <span>Materials & Sustainability</span>
                  <ChevronRight className={`w-4 h-4 text-neutral-400 transition-transform ${openSection === 'materials' ? 'rotate-90' : ''}`} />
                </button>
                {openSection === 'materials' && (
                  <div className="pt-2 text-xs text-neutral-600 leading-relaxed font-normal">
                    <p>{product.materials}</p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="py-2.5">
                <button
                  onClick={() => setOpenSection(openSection === 'shipping' ? null : 'shipping')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-900 tracking-wide uppercase py-1"
                >
                  <span>Shipping & Free Returns</span>
                  <ChevronRight className={`w-4 h-4 text-neutral-400 transition-transform ${openSection === 'shipping' ? 'rotate-90' : ''}`} />
                </button>
                {openSection === 'shipping' && (
                  <div className="pt-2 text-xs text-neutral-600 space-y-2 leading-relaxed font-normal">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-neutral-500" />
                      <span>Complimentary carbon-neutral shipping on all orders over $75.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-neutral-500" />
                      <span>30-day hassle-free returns & worldwide prepaid return labels.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
