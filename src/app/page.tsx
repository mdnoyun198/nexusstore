'use client'
import React, { useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, ViewMode } from '@/types';
import { PRODUCTS } from '@/data/products';
import { Header } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ProductCarousel } from '@/components/ProductCarousel';
import { CategoryHighlights } from '@/components/CategoryHighlights';
import { BrandPerks } from '@/components/BrandPerks';
import { CatalogView } from '@/components/CatalogView';
import { WishlistView } from '@/components/WishlistView';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { SearchModal } from '@/components/SearchModal';
import { Footer } from '@/components/Footer';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  // Currency State
  const [currency, setCurrency] = useState<string>('USD');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [appliedCheckoutPromo, setAppliedCheckoutPromo] = useState<{ percent: number; code: string }>({
    percent: 0,
    code: ''
  });

  // Undo support for cart item removal
  const [lastRemovedItem, setLastRemovedItem] = useState<CartItem | null>(null);

  // Cart State with LocalStorage Initialization
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Pre-populate with 1 starter item so the cart isn't completely bare on first launch
    const starterProduct = PRODUCTS[0];
    return [
      {
        id: `${starterProduct.id}-Oatmeal Heather-M`,
        productId: starterProduct.id,
        product: starterProduct,
        selectedColor: starterProduct.colors[0],
        selectedSize: 'M',
        quantity: 1,
        addedAt: Date.now()
      }
    ];
  });

  // Wishlist State with LocalStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [PRODUCTS[2].id, PRODUCTS[3].id];
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart_v1', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist_v1', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Navigation handler
  const handleNavigate = (view: ViewMode, category?: string) => {
    if (category) {
      setActiveCategoryFilter(category);
      setCurrentView('catalog');
    } else {
      setCurrentView(view);
    }
  };

  // Add to Cart
  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    size?: string,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${color.name}-${size || 'default'}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          addedAt: Date.now()
        }
      ];
    });

    // Automatically slide in cart drawer to confirm interaction
    setIsCartOpen(true);
  };

  // Update Item Quantity
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Remove Item with Undo support
  const handleRemoveItem = (itemId: string) => {
    const itemToRemove = cartItems.find((i) => i.id === itemId);
    if (itemToRemove) {
      setLastRemovedItem(itemToRemove);
      setTimeout(() => setLastRemovedItem(null), 5000);
    }
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Undo Remove
  const handleUndoRemove = () => {
    if (!lastRemovedItem) return;
    setCartItems((prev) => [...prev, lastRemovedItem]);
    setLastRemovedItem(null);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // Open Checkout
  const handleOpenCheckout = (discountPercent: number, codeName: string) => {
    setAppliedCheckoutPromo({ percent: discountPercent, code: codeName });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order Complete
  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filtered collections for home carousels
  const trendingProducts = PRODUCTS.filter((p) => p.isFeatured);
  const bestSellerProducts = PRODUCTS.filter((p) => p.isBestSeller || p.rating >= 4.9);
  const audioAndCarryProducts = PRODUCTS.filter(
    (p) => p.category === 'Tech & Audio' || p.category === 'Everyday Carry'
  );
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F5] text-[#191919] selection:bg-neutral-900 selection:text-white pb-16 md:pb-0">
      
      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        selectedCurrency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="animate-fadeIn">
            {/* Hero Carousel */}
            <HeroCarousel onNavigate={handleNavigate} />

            {/* Brand Perks Strip */}
            <BrandPerks />

            {/* 1. Featured Drops Carousel */}
            <ProductCarousel
              tag="DROP 04 · CURATED RELEASES"
              title="Trending & Newly Formulated"
              subtitle="Sculptural French Terry garments, Italian footwear, and pure lossless acoustic audio."
              products={trendingProducts}
              currency={currency}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickAdd={(p, c, s) => handleAddToCart(p, c, s, 1)}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onViewAll={() => handleNavigate('catalog')}
            />

            {/* Visual Discipline Highlight Cards */}
            <CategoryHighlights onNavigate={handleNavigate} />

            {/* 2. Audio & Carry Precision Carousel */}
            <ProductCarousel
              tag="TECHWEAR & WORKSPACE"
              title="Everyday Carry & Acoustics"
              subtitle="Waterproof ballistic Cordura bags, aerospace titanium wallets, and CNC keyboards."
              products={audioAndCarryProducts}
              currency={currency}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickAdd={(p, c, s) => handleAddToCart(p, c, s, 1)}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onViewAll={() => handleNavigate('catalog', 'Everyday Carry')}
            />

            {/* 3. Studio Best Sellers Carousel */}
            <ProductCarousel
              tag="HIGHEST RATED"
              title="Hall of Fame Editions"
              subtitle="Pieces verified and acclaimed by our design community with 4.9+ star ratings."
              products={bestSellerProducts}
              currency={currency}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickAdd={(p, c, s) => handleAddToCart(p, c, s, 1)}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onViewAll={() => handleNavigate('catalog')}
            />
          </div>
        )}

        {currentView === 'catalog' && (
          <div className="animate-fadeIn">
            <CatalogView
              products={PRODUCTS}
              initialCategory={activeCategoryFilter}
              currency={currency}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickAdd={(p, c, s) => handleAddToCart(p, c, s, 1)}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          </div>
        )}

        {currentView === 'wishlist' && (
          <div className="animate-fadeIn">
            <WishlistView
              wishlistProducts={wishlistProducts}
              currency={currency}
              onToggleWishlist={handleToggleWishlist}
              onQuickAdd={(p, c, s) => handleAddToCart(p, c, s, 1)}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onNavigateToCatalog={() => handleNavigate('catalog')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Navigation App Bar */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Product Deep Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Minimalist Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={handleOpenCheckout}
        onNavigateToCatalog={() => {
          setIsCartOpen(false);
          handleNavigate('catalog');
        }}
        lastRemovedItem={lastRemovedItem}
        onUndoRemove={handleUndoRemove}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        currency={currency}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        promoDiscountPercent={appliedCheckoutPromo.percent}
        promoCodeName={appliedCheckoutPromo.code}
        onOrderComplete={handleOrderComplete}
      />

    </div>
  );
}
