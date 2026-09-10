'use client'

import React from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/types';
import { CATEGORIES } from '@/data/products';

export interface ProductFilterProps {
  categories?: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  totalCount: number;
  currency: string;
  onReset: () => void;
  isFilterOpen: boolean;
  onToggleFilterOpen: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  categories = CATEGORIES,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockChange,
  maxPrice,
  onMaxPriceChange,
  totalCount,
  currency,
  onReset,
  isFilterOpen,
  onToggleFilterOpen
}) => {
  const formatPrice = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    const converted = Math.round(amount * (currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1));
    return `${symbol}${converted}`;
  };

  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-neutral-200">
      {/* Category horizontal pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`cat-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
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
            {totalCount} {totalCount === 1 ? 'object' : 'objects'}
          </span>

          {/* Quick in-stock toggle */}
          <label className="hidden sm:flex items-center gap-1.5 cursor-pointer text-neutral-600 hover:text-black">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
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
              onChange={(e) => onSortChange(e.target.value as SortOption)}
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
            onClick={onToggleFilterOpen}
            className={`p-2 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
              isFilterOpen || inStockOnly || maxPrice < 400
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
      {isFilterOpen && (
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
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
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
                onChange={(e) => onInStockChange(e.target.checked)}
                className="rounded border-neutral-300 text-black focus:ring-0 cursor-pointer"
              />
              <span>Ready for 24h dispatch</span>
            </label>
          </div>

          <div className="flex items-end justify-end">
            <button
              onClick={onReset}
              className="text-xs text-neutral-500 hover:text-black font-mono underline cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
