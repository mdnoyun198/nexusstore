'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: string;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  if (!isOpen) return null;

  const popularTags = ['Heavyweight Hoodie', 'Titanium', 'Headphones', 'Linen', 'Crossbody', 'Stoneware Ceramic'];

  const filtered = query.trim() === ''
    ? []
    : products.filter((p) => {
        const text = `${p.name} ${p.tagline} ${p.category} ${p.tags.join(' ')} ${p.description}`.toLowerCase();
        return text.includes(query.toLowerCase());
      });

  const formatPrice = (amount: number) => {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
    const converted = Math.round(amount * (currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.79 : 1));
    return `${symbol}${converted}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-20 px-4 animate-fadeIn">
      <div className="fixed inset-0" onClick={handleClose} />

      <div
        id="search-dialog"
        className="relative bg-[#FAF9F6] w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 border border-neutral-300/80 my-4"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, materials, silhouettes..."
            className="flex-1 bg-transparent text-sm sm:text-base text-neutral-900 outline-none placeholder:text-neutral-400 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-black p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto no-scrollbar">
          {query.trim() === '' ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Popular Inquiries</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Picks preview */}
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block mb-3">
                  Featured Drops
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {products.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectProduct(item);
                        onClose();
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-neutral-200/80 hover:border-black cursor-pointer transition-all"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg shrink-0 bg-neutral-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-neutral-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-500">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 space-y-2">
              <p className="text-sm font-medium text-neutral-700">No objects found for "{query}"</p>
              <p className="text-xs">Try searching for "Apparel", "Leather", "Audio", or "Wallet".</p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs font-mono text-neutral-400 block mb-1">
                {filtered.length} {filtered.length === 1 ? 'match' : 'matches'} found
              </span>
              <div className="divide-y divide-neutral-200/70">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="py-3 first:pt-0 flex items-center justify-between gap-3 group cursor-pointer hover:bg-neutral-100/50 -mx-2 px-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-12 h-14 object-cover rounded-lg shrink-0 bg-neutral-100 border border-neutral-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono uppercase text-neutral-400">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-semibold text-neutral-900 truncate group-hover:text-neutral-600 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-neutral-500 truncate">
                          {item.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs text-neutral-900 shrink-0">
                      <span className="font-bold">{formatPrice(item.price)}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
