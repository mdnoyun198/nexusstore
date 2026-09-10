'use client'
import React from 'react';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { ViewMode } from '../types';

interface MobileBottomNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-lg border-t border-[#E5E3DD] md:hidden px-3 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          id="mobile-tab-home"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            currentView === 'home' ? 'text-black' : 'text-neutral-500'
          }`}
        >
          <Home className={`w-5 h-5 ${currentView === 'home' ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
          <span className={`text-[10px] tracking-tight mt-0.5 ${currentView === 'home' ? 'font-semibold' : 'font-normal'}`}>
            Home
          </span>
        </button>

        {/* Catalog */}
        <button
          id="mobile-tab-catalog"
          onClick={() => onNavigate('catalog')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            currentView === 'catalog' ? 'text-black' : 'text-neutral-500'
          }`}
        >
          <Compass className={`w-5 h-5 ${currentView === 'catalog' ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
          <span className={`text-[10px] tracking-tight mt-0.5 ${currentView === 'catalog' ? 'font-semibold' : 'font-normal'}`}>
            Catalog
          </span>
        </button>

        {/* Search */}
        <button
          id="mobile-tab-search"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center w-14 py-1 rounded-xl text-neutral-500 hover:text-black transition-all"
        >
          <Search className="w-5 h-5 stroke-[1.6]" />
          <span className="text-[10px] tracking-tight mt-0.5 font-normal">
            Search
          </span>
        </button>

        {/* Wishlist */}
        <button
          id="mobile-tab-wishlist"
          onClick={() => onNavigate('wishlist')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all relative ${
            currentView === 'wishlist' ? 'text-rose-600' : 'text-neutral-500'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${currentView === 'wishlist' ? 'fill-rose-500 stroke-rose-500' : 'stroke-[1.6]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] tracking-tight mt-0.5 ${currentView === 'wishlist' ? 'font-semibold text-rose-600' : 'font-normal'}`}>
            Saved
          </span>
        </button>

        {/* Cart Bag */}
        <button
          id="mobile-tab-cart"
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center w-14 py-1 rounded-xl text-neutral-800 transition-all relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-medium">
            Bag
          </span>
        </button>
      </div>
    </div>
  );
};
