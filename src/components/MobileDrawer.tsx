'use client'
import React, { useState, useEffect } from 'react';
import {
  X,
  Home,
  Compass,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
  Heart,
  ShoppingBag,
  Sparkles,
  Shirt,
  Briefcase,
  Headphones,
  Coffee,
  Footprints,
  Globe,
  ArrowRight,
  Truck
} from 'lucide-react';
import { ViewMode } from '../types';
import { PRODUCTS } from '../data/products';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewMode;
  onNavigate: (view: ViewMode, category?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  selectedCurrency: string;
  onCurrencyChange: (curr: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  selectedCurrency,
  onCurrencyChange
}) => {
  // Categories accordion state: defaults to expanded so user sees categories immediately or can toggle
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState<boolean>(true);

  // Close on Escape or prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  // Clean transition if user resizes back to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        onClose();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categoriesList = [
    {
      name: 'Apparel',
      icon: <Shirt className="w-4 h-4" />,
      tagline: '500 GSM French Terry & knitwear',
      count: PRODUCTS.filter((p) => p.category === 'Apparel').length
    },
    {
      name: 'Everyday Carry',
      icon: <Briefcase className="w-4 h-4" />,
      tagline: 'Cordura bags & titanium gear',
      count: PRODUCTS.filter((p) => p.category === 'Everyday Carry').length
    },
    {
      name: 'Tech & Audio',
      icon: <Headphones className="w-4 h-4" />,
      tagline: 'Acoustic drivers & CNC keyboards',
      count: PRODUCTS.filter((p) => p.category === 'Tech & Audio').length
    },
    {
      name: 'Objects & Home',
      icon: <Coffee className="w-4 h-4" />,
      tagline: 'Hand-thrown ceramics & brass lamps',
      count: PRODUCTS.filter((p) => p.category === 'Objects & Home').length
    },
    {
      name: 'Footwear',
      icon: <Footprints className="w-4 h-4" />,
      tagline: 'Italian leather sneakers & boots',
      count: PRODUCTS.filter((p) => p.category === 'Footwear').length
    }
  ];

  const currencies = ['USD', 'EUR', 'GBP'];

  const handleCategoryClick = (categoryName?: string) => {
    onNavigate('catalog', categoryName);
    onClose();
  };

  return (
    <div 
      id="mobile-drawer-portal"
      className="fixed inset-0 z-50 md:hidden flex"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop overlay */}
      <div
        id="mobile-drawer-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
      />

      {/* Drawer content pane */}
      <div 
        id="mobile-drawer-panel"
        className="relative w-[85%] max-w-sm h-full bg-[#F8F7F5] shadow-2xl flex flex-col border-r border-[#E5E3DD] z-10 overflow-hidden animate-slideInLeft"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#E8E6E1] flex items-center justify-between bg-white/70 backdrop-blur-md">
          <div 
            className="flex flex-col cursor-pointer"
            onClick={() => {
              onNavigate('home');
              onClose();
            }}
          >
            <span className="font-display font-bold text-lg tracking-[0.2em] text-[#191919] uppercase">
              ATELIER
            </span>
            <span className="text-[8px] tracking-[0.25em] text-neutral-400 uppercase font-mono -mt-0.5">
              OBJECTS & WEAR
            </span>
          </div>

          <button
            id="mobile-drawer-close-btn"
            onClick={onClose}
            className="p-2 -mr-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-200/60 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Drawer Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
          
          {/* Quick Search Button */}
          <button
            id="drawer-search-trigger"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-500 hover:text-black hover:border-neutral-400 text-xs font-normal shadow-2xs transition-all text-left"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-neutral-400" />
              <span>Search products, drops, tags...</span>
            </div>
            <span className="font-mono text-[10px] text-neutral-400">⌘K</span>
          </button>

          {/* Core Navigation Items */}
          <div className="space-y-1">
            {/* Home */}
            <button
              id="drawer-nav-home"
              onClick={() => {
                onNavigate('home');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'home'
                  ? 'bg-neutral-900 text-white shadow-2xs font-semibold'
                  : 'text-neutral-800 hover:bg-neutral-200/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </div>
              <ArrowRight className={`w-3.5 h-3.5 ${currentView === 'home' ? 'text-white' : 'text-neutral-400'}`} />
            </button>

            {/* Storefront / All Products */}
            <button
              id="drawer-nav-catalog"
              onClick={() => {
                onNavigate('catalog');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'catalog'
                  ? 'bg-neutral-900 text-white shadow-2xs font-semibold'
                  : 'text-neutral-800 hover:bg-neutral-200/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4" />
                <span>Storefront Archive</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-200/80 text-neutral-800">
                {PRODUCTS.length}
              </span>
            </button>
          </div>

          {/* Prominent Categories Accordion / Expandable Section */}
          <div className="pt-2 border-t border-neutral-200">
            <div className="rounded-2xl border border-neutral-200/80 bg-white shadow-2xs overflow-hidden">
              {/* Accordion Trigger */}
              <button
                id="drawer-categories-accordion-trigger"
                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                className="w-full flex items-center justify-between px-3.5 py-3 text-left hover:bg-neutral-50 transition-colors"
                aria-expanded={isCategoriesExpanded}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900">
                        Categories
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-neutral-100 text-neutral-700 font-semibold border border-neutral-200">
                        {categoriesList.length}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-normal">
                      Explore by discipline
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-neutral-500">
                  <span className="text-xs font-mono">
                    {isCategoriesExpanded ? 'Collapse' : 'Expand'}
                  </span>
                  {isCategoriesExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Accordion Expanded List */}
              {isCategoriesExpanded && (
                <div 
                  id="drawer-categories-list"
                  className="px-2.5 pb-2.5 pt-1 space-y-1 border-t border-neutral-100 bg-neutral-50/50 animate-fadeIn"
                >
                  {/* All Categories Option */}
                  <button
                    id="drawer-cat-item-all"
                    onClick={() => handleCategoryClick('All')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:text-black hover:bg-white hover:shadow-2xs transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-neutral-200/70 flex items-center justify-center text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-neutral-900 group-hover:text-black">
                          All Categories
                        </span>
                        <span className="block text-[10px] text-neutral-400">
                          Complete studio release archive
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 font-medium">
                      {PRODUCTS.length}
                    </span>
                  </button>

                  {/* Individual Categories */}
                  {categoriesList.map((cat, idx) => (
                    <button
                      key={idx}
                      id={`drawer-cat-item-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:text-black hover:bg-white hover:shadow-2xs transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-neutral-200/70 flex items-center justify-center text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                          {cat.icon}
                        </div>
                        <div className="text-left">
                          <span className="font-semibold text-neutral-900 group-hover:text-black">
                            {cat.name}
                          </span>
                          <span className="block text-[10px] text-neutral-400 line-clamp-1">
                            {cat.tagline}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-neutral-200/60 text-neutral-700 font-medium">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Wishlist & Bag Actions */}
          <div className="pt-2 border-t border-neutral-200 space-y-1">
            <button
              id="drawer-nav-wishlist"
              onClick={() => {
                onNavigate('wishlist');
                onClose();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-neutral-800 hover:bg-neutral-200/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-neutral-600'}`} />
                <span>Saved Items</span>
              </div>
              {wishlistCount > 0 && (
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              id="drawer-nav-cart"
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-neutral-800 hover:bg-neutral-200/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-neutral-600" />
                <span>Shopping Bag</span>
              </div>
              {cartCount > 0 && (
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-black text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Perks Micro-card */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-950">
            <Truck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-[11px] text-amber-900">Carbon-Neutral Delivery</span>
              <span className="text-[10px] text-amber-800 leading-tight block mt-0.5">
                Free shipping over $75 · 30-day trial with prepaid returns.
              </span>
            </div>
          </div>

        </div>

        {/* Drawer Footer with Currency & Promo */}
        <div className="p-4 border-t border-[#E8E6E1] bg-white/80 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-600">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span>Currency:</span>
            </div>
            <div className="flex gap-1.5">
              {currencies.map((curr) => (
                <button
                  key={curr}
                  id={`drawer-curr-${curr}`}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                    selectedCurrency === curr
                      ? 'bg-black text-white shadow-2xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <span className="text-[10px] font-mono text-neutral-400">
              Promo: <strong className="text-neutral-700">WELCOME10</strong> for 10% off
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
