'use client'
import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Check, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { CartItem } from '../types';
import { PROMO_CODES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: string;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: (promoDiscountPercent: number, appliedCodeName: string) => void;
  onNavigateToCatalog: () => void;
  lastRemovedItem: CartItem | null;
  onUndoRemove: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onNavigateToCatalog,
  lastRemovedItem,
  onUndoRemove
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 75;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.percent) / 100 : 0;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 12;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const formatPrice = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    const converted = Math.round(amount * (currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1));
    return `${symbol}${converted}`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (!clean) return;

    if (PROMO_CODES[clean]) {
      setAppliedPromo({
        code: clean,
        percent: PROMO_CODES[clean].discountPercent
      });
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try WELCOME10 or MINIMAL20');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col justify-between border-l border-neutral-300/80 animate-slideInRight">
          
          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-[#E8E6E1] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-800 stroke-[2]" />
              <h2 className="font-display text-lg font-bold tracking-tight text-neutral-900">
                Shopping Bag
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-semibold">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>

            <button
              id="close-cart-drawer"
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F0EEE8] px-5 py-3 border-b border-neutral-200/80">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <div className="flex items-center gap-1.5 text-neutral-700">
                <Truck className="w-3.5 h-3.5 text-neutral-800" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-800 font-semibold">
                    You unlocked Complimentary Carbon-Neutral Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="font-mono">{formatPrice(amountNeededForFreeShipping)}</strong> more for free shipping
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            
            <div className="w-full bg-neutral-300/70 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  amountNeededForFreeShipping === 0 ? 'bg-emerald-600' : 'bg-neutral-900'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar divide-y divide-neutral-200/70">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-200/70 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="max-w-xs">
                  <h3 className="font-display font-semibold text-lg text-neutral-900">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Discover timeless pieces and minimalist objects engineered for everyday living.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToCatalog();
                  }}
                  className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  Explore Storefront
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3 group">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-neutral-200 shrink-0 border border-neutral-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-neutral-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          id={`remove-item-${item.id}`}
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500 font-mono">
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                        {item.selectedSize && (
                          <>
                            <span>·</span>
                            <span>Size: {item.selectedSize}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity stepper & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-300 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black font-semibold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black font-semibold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono text-sm font-bold text-neutral-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Undo item toast if item removed */}
          {lastRemovedItem && (
            <div className="mx-5 mb-2 p-2.5 bg-neutral-900 text-white text-xs rounded-xl flex items-center justify-between shadow-lg animate-fadeIn">
              <span className="truncate mr-2">Removed {lastRemovedItem.product.name}</span>
              <button
                onClick={onUndoRemove}
                className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold underline shrink-0 font-mono text-[11px]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Undo</span>
              </button>
            </div>
          )}

          {/* Drawer Footer & Checkout Controls */}
          {items.length > 0 && (
            <div className="border-t border-[#E8E6E1] bg-white p-5 space-y-4">
              
              {/* Promo code accordion */}
              <div className="space-y-2">
                {!appliedPromo ? (
                  <div>
                    {!showPromoInput ? (
                      <button
                        onClick={() => setShowPromoInput(true)}
                        className="text-xs text-neutral-600 hover:text-black flex items-center gap-1.5 font-mono"
                      >
                        <Tag className="w-3.5 h-3.5" />
                        <span>Have a discount code?</span>
                      </button>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="e.g. WELCOME10"
                          className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs font-mono uppercase tracking-wider outline-none focus:border-black"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 font-mono"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-rose-600 mt-1 font-mono">{promoError}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-mono font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>{appliedPromo.code} ({appliedPromo.percent}% OFF)</span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-emerald-700 hover:text-emerald-900 underline font-mono text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 font-mono pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedPromo.percent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
                </div>

                <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm font-bold text-neutral-900 font-mono">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                id="cart-checkout-btn"
                onClick={() => onOpenCheckout(appliedPromo?.percent || 0, appliedPromo?.code || '')}
                className="w-full py-3.5 px-4 rounded-xl bg-black text-white text-sm font-semibold hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Checkout · {formatPrice(total)}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                <span>256-Bit Encrypted Secure Checkout · 30-Day Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
