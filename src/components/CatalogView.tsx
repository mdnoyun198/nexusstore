'use client'
import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, X } from 'lucide-react';
import { Product, ProductColor, SortOption } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface CatalogViewProps {
  products: Product[];
  initialCategory?: string;
  currency: string;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  initialCategory = 'All',
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(400);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Sync category if prop changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (inStockOnly && !p.inStock) return false;
        if (p.price > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, sortBy, inStockOnly, maxPrice]);

  const formatPrice = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    const converted = Math.round(amount * (currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1));
    return `${symbol}${converted}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title & Description Header */}
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-medium">
          The Full Archive
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1">
          Storefront Collection
        </h1>
        <p className="text-sm text-neutral-500 max-w-xl mt-1.5 font-normal">
          Refined wardrobe essentials, precision desktop electronics, and architectural vessels designed without planned obsolescence.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col gap-4 pb-6 border-b border-neutral-200">
        
        {/* Category horizontal pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`cat-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary filters & Sort row */}
        <div className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-neutral-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'object' : 'objects'}
            </span>

            {/* Quick in-stock toggle */}
            <label className="hidden sm:flex items-center gap-1.5 cursor-pointer text-neutral-600 hover:text-black">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-neutral-300 text-black focus:ring-0 cursor-pointer"
              />
              <span>In-stock only</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-xl px-3 py-1.5 text-neutral-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent outline-none cursor-pointer text-xs font-medium text-neutral-800"
              >
                <option value="featured">Featured First</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Filter drawer trigger for mobile/extended */}
            <button
              id="filter-drawer-btn"
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 transition-colors ${
                filterDrawerOpen || inStockOnly || maxPrice < 400
                  ? 'border-black bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
              }`}
              title="Toggle filters"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Collapsible Extended Filters Panel */}
        {filterDrawerOpen && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
            <div>
              <span className="font-semibold text-xs text-neutral-900 block mb-2 font-mono uppercase tracking-wider">
                Max Price: {formatPrice(maxPrice)}
              </span>
              <input
                type="range"
                min="50"
                max="400"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 font-mono mt-1">
                <span>{formatPrice(50)}</span>
                <span>{formatPrice(400)}</span>
              </div>
            </div>

            <div>
              <span className="font-semibold text-xs text-neutral-900 block mb-2 font-mono uppercase tracking-wider">
                Availability
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-neutral-300 text-black focus:ring-0"
                />
                <span>Ready for 24h dispatch</span>
              </label>
            </div>

            <div className="flex items-end justify-end">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMaxPrice(400);
                  setInStockOnly(false);
                  setSortBy('featured');
                }}
                className="text-xs text-neutral-500 hover:text-black font-mono underline"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="pt-8">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <h3 className="font-display font-semibold text-lg text-neutral-900">
              No objects match current criteria
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your price ceiling, resetting your category filters, or searching for other keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setMaxPrice(400);
                setInStockOnly(false);
              }}
              className="px-5 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
