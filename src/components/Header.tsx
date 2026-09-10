'use client'
import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, Globe, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';
import { MobileDrawer } from './MobileDrawer';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, category?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  selectedCurrency: string;
  onCurrencyChange: (curr: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  selectedCurrency,
  onCurrencyChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP'];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F7F5]/90 backdrop-blur-md border-b border-[#E8E6E1] transition-all">
      {/* Top micro-announcement */}
      <div className="bg-[#1C1B1A] text-[#FAF8F5] text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        <span>Free worldwide express delivery over $75 · Use code <span className="font-mono font-bold text-amber-200">WELCOME10</span> for 10% off</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left section: Mobile menu & Desktop Nav */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-neutral-800 hover:text-black md:hidden rounded-lg hover:bg-neutral-200/50 transition-colors"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium tracking-tight text-neutral-600">
              <button
                id="nav-home"
                onClick={() => onNavigate('home')}
                className={`transition-colors hover:text-black py-1 relative ${
                  currentView === 'home' ? 'text-black font-semibold' : ''
                }`}
              >
                Home
                {currentView === 'home' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                )}
              </button>

              <button
                id="nav-catalog"
                onClick={() => onNavigate('catalog')}
                className={`transition-colors hover:text-black py-1 relative ${
                  currentView === 'catalog' ? 'text-black font-semibold' : ''
                }`}
              >
                Storefront
                {currentView === 'catalog' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                )}
              </button>

              <button
                id="nav-cat-apparel"
                onClick={() => onNavigate('catalog', 'Apparel')}
                className="transition-colors hover:text-black"
              >
                Apparel
              </button>

              <button
                id="nav-cat-carry"
                onClick={() => onNavigate('catalog', 'Everyday Carry')}
                className="transition-colors hover:text-black"
              >
                Carry
              </button>

              <button
                id="nav-cat-tech"
                onClick={() => onNavigate('catalog', 'Tech & Audio')}
                className="transition-colors hover:text-black"
              >
                Tech & Audio
              </button>
            </nav>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="font-display font-bold text-xl sm:text-2xl tracking-[0.2em] text-[#191919] uppercase select-none">
              ATELIER
            </span>
            <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-mono -mt-0.5">
              OBJECTS & WEAR
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Currency selector */}
            <div className="hidden lg:flex items-center gap-1 text-xs font-mono text-neutral-500 border border-neutral-300/80 rounded-full px-2.5 py-1 bg-white/70">
              <Globe className="w-3 h-3 text-neutral-400" />
              <select
                id="currency-selector"
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="bg-transparent text-neutral-700 outline-none cursor-pointer text-xs font-medium"
                aria-label="Currency"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Trigger */}
            <button
              id="search-open-btn"
              onClick={onOpenSearch}
              className="p-2 text-neutral-700 hover:text-black hover:bg-neutral-200/50 rounded-full transition-colors flex items-center gap-1.5"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
              <span className="hidden xl:inline text-xs text-neutral-500 font-normal">Search</span>
            </button>

            {/* Wishlist button */}
            <button
              id="wishlist-header-btn"
              onClick={() => onNavigate('wishlist')}
              className="p-2 text-neutral-700 hover:text-black hover:bg-neutral-200/50 rounded-full transition-colors relative"
              aria-label="View saved items"
            >
              <Heart className={`w-5 h-5 stroke-[1.8] ${currentView === 'wishlist' ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute 0 top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              id="cart-drawer-trigger"
              onClick={onOpenCart}
              className="p-2 text-neutral-800 hover:text-black hover:bg-neutral-200/50 rounded-full transition-colors relative flex items-center gap-1.5 group"
              aria-label="Open cart bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[1.8] group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-medium text-neutral-700 font-mono">
                Bag
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentView={currentView}
        onNavigate={onNavigate}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={onOpenCart}
        onOpenSearch={onOpenSearch}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={onCurrencyChange}
      />
    </header>
  );
};
