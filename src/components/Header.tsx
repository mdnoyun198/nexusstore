'use client'
import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Globe, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';

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

  const navLinks = [
    { label: 'Home', view: 'home' as ViewMode },
    { label: 'Catalog', view: 'catalog' as ViewMode },
    { label: 'Apparel', view: 'catalog' as ViewMode, category: 'Apparel' },
    { label: 'Everyday Carry', view: 'catalog' as ViewMode, category: 'Everyday Carry' },
    { label: 'Tech & Audio', view: 'catalog' as ViewMode, category: 'Tech & Audio' },
    { label: 'Objects', view: 'catalog' as ViewMode, category: 'Objects & Home' },
  ];

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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-neutral-800 hover:text-black md:hidden rounded-lg hover:bg-neutral-200/50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E6E1] bg-[#F8F7F5] px-6 py-4 space-y-3 animate-fadeIn">
          <div className="space-y-1">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                id={`mobile-nav-${idx}`}
                onClick={() => {
                  onNavigate(item.view, item.category);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2.5 px-3 text-base font-medium text-neutral-800 hover:bg-neutral-200/60 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-neutral-400 text-xs font-mono">→</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>Currency:</span>
            <div className="flex gap-2">
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-2 py-1 rounded ${
                    selectedCurrency === curr ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-800'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
