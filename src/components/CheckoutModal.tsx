'use client'
import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Sparkles, ArrowLeft, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: string;
  promoDiscountPercent: number;
  promoCodeName: string;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  promoDiscountPercent,
  promoCodeName,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form fields
  const [email, setEmail] = useState('alex.chen@example.com');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Chen');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('San Francisco');
  const [postalCode, setPostalCode] = useState('94107');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * promoDiscountPercent) / 100;
  const shippingCost = shippingMethod === 'express' ? 18 : (subtotal >= 75 ? 0 : 12);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const formatPrice = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    const converted = Math.round(amount * (currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1));
    return `${symbol}${converted}`;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = 'ATL-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(randomOrder);
      setStep('success');
      onOrderComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={step === 'success' ? onClose : undefined} />

      <div
        id="checkout-dialog"
        className="relative bg-[#FAF9F6] w-full max-w-4xl rounded-none sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[100vh] sm:max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E6E1] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span className="font-display font-bold text-sm tracking-widest uppercase">
              Secure Checkout · Atelier
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'success' ? (
          /* Order Complete Success State */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-5 my-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
            </div>

            <div className="space-y-2 max-w-md">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Order Confirmed
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
                Thank You for Your Order!
              </h2>
              <p className="text-sm text-neutral-500">
                We've sent a detailed confirmation receipt to <strong className="text-neutral-800">{email}</strong>. Your curated studio pieces are being hand-packed.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200 w-full max-w-sm font-mono text-xs text-neutral-600 space-y-2 text-left">
              <div className="flex justify-between">
                <span>Order Reference:</span>
                <span className="font-bold text-neutral-900">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="text-neutral-900 font-semibold">3-5 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span>Paid via:</span>
                <span className="text-neutral-900">Apple Pay / Express Secure</span>
              </div>
              <div className="flex justify-between border-t border-neutral-100 pt-1.5">
                <span>Total Amount:</span>
                <span className="font-bold text-neutral-900">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-md"
            >
              Continue Exploring Collection
            </button>
          </div>
        ) : (
          /* Checkout Split Form */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col md:flex-row gap-8">
            
            {/* Left Form: Shipping & Details */}
            <form onSubmit={handlePlaceOrder} className="w-full md:w-7/12 space-y-6">
              {/* Express checkout quick-options */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium block mb-2.5">
                  Express 1-Touch Checkout
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="py-3 px-4 rounded-xl bg-black text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-all shadow-xs"
                  >
                    <span>Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="py-3 px-4 rounded-xl bg-[#5A31F4] text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#4a26d4] transition-all shadow-xs"
                  >
                    <span>Shop Pay</span>
                  </button>
                </div>
                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <span className="relative bg-[#FAF9F6] px-3 text-[11px] font-mono text-neutral-400 uppercase">
                    or enter standard details
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium block">
                  1. Contact Information
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address for shipping updates"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs outline-none focus:border-black"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium block">
                  2. Shipping Destination
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs outline-none focus:border-black"
                  />
                </div>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address, Apt / Suite"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs outline-none focus:border-black"
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal / ZIP Code"
                    className="px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Shipping Method */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-medium block">
                  3. Delivery Speed
                </span>
                <div className="space-y-2">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-black bg-white ring-1 ring-black'
                        : 'border-neutral-200 bg-white/60 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-neutral-700" />
                      <div>
                        <div className="text-xs font-semibold text-neutral-900">
                          Carbon-Neutral Ground (3-5 Days)
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          100% offset via climate initiatives
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-900">
                      {subtotal >= 75 ? 'FREE' : formatPrice(12)}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-black bg-white ring-1 ring-black'
                        : 'border-neutral-200 bg-white/60 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <div>
                        <div className="text-xs font-semibold text-neutral-900">
                          DHL Express Priority (1-2 Days)
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Signature required at delivery
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-900">
                      {formatPrice(18)}
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Order button */}
              <button
                id="place-order-button"
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-2xl bg-black text-white text-sm font-semibold hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Complete Order · {formatPrice(finalTotal)}</span>
                  </>
                )}
              </button>
            </form>

            {/* Right Summary: Order Items & Breakdown */}
            <div className="w-full md:w-5/12 bg-white rounded-2xl border border-neutral-200 p-5 space-y-4 h-fit">
              <h3 className="font-display font-semibold text-sm text-neutral-900 border-b border-neutral-100 pb-2">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </h3>

              {/* Items preview */}
              <div className="space-y-3 max-h-56 overflow-y-auto no-scrollbar divide-y divide-neutral-100">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-2.5">
                    <div className="w-12 h-14 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-neutral-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-mono">
                        Qty: {item.quantity} · {item.selectedColor.name}
                      </p>
                      <p className="text-xs font-mono font-bold text-neutral-800 mt-0.5">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-neutral-100 pt-3 space-y-2 text-xs font-mono text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({promoCodeName})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-2 flex justify-between text-base font-bold text-neutral-900">
                  <span>Total Due</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl text-[11px] text-neutral-500 space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-neutral-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Studio Lifetime Craftsmanship Warranty</span>
                </div>
                <p>Every piece includes proof of provenance and inspection certification.</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
