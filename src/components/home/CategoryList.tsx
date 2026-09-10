'use client'

import React from 'react';
import { 
  ArrowUpRight, 
  ArrowRight,
  Shirt, 
  Briefcase, 
  Headphones, 
  Coffee, 
  Footprints,
  Sparkles
} from 'lucide-react';
import { ViewMode } from '@/types';
import { PRODUCTS } from '@/data/products';

export interface CategoryListProps {
  onNavigate: (view: ViewMode, category?: string) => void;
}

interface CategoryCardMeta {
  id: string;
  name: string;
  label: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
  tag: string;
}

export const CategoryList: React.FC<CategoryListProps> = ({ onNavigate }) => {
  const categoryMetas: CategoryCardMeta[] = [
    {
      id: 'cat-apparel',
      name: 'Apparel',
      label: 'Apparel',
      subtitle: '500 GSM loopback cotton & knitwear',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      icon: <Shirt className="w-4 h-4" />,
      tag: 'Essentials'
    },
    {
      id: 'cat-carry',
      name: 'Everyday Carry',
      label: 'Everyday Carry',
      subtitle: 'Ballistic Cordura & titanium hardware',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      icon: <Briefcase className="w-4 h-4" />,
      tag: 'Modular'
    },
    {
      id: 'cat-tech',
      name: 'Tech & Audio',
      label: 'Tech & Audio',
      subtitle: 'Lossless acoustics & CNC keyboards',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      icon: <Headphones className="w-4 h-4" />,
      tag: 'Studio Grade'
    },
    {
      id: 'cat-objects',
      name: 'Objects & Home',
      label: 'Objects & Home',
      subtitle: 'Stoneware vessels & brass illumination',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      icon: <Coffee className="w-4 h-4" />,
      tag: 'Living'
    },
    {
      id: 'cat-footwear',
      name: 'Footwear',
      label: 'Footwear',
      subtitle: 'Hand-lasted Italian calfskin trainers',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      icon: <Footprints className="w-4 h-4" />,
      tag: 'Hand-Crafted'
    }
  ];

  // Calculate dynamic counts
  const getCategoryCount = (categoryName: string) => {
    return PRODUCTS.filter((p) => p.category === categoryName).length;
  };

  const totalProductsCount = PRODUCTS.length;

  return (
    <section 
      id="desktop-categories-section"
      className="py-10 sm:py-14 border-t border-neutral-200/70 bg-[#F5F4F0]/60 transition-colors"
      aria-label="Product categories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                Departments & Disciplines
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Shop by Category
            </h2>
            <p className="text-sm text-neutral-500 max-w-xl mt-1 font-normal">
              Explore purpose-built capsules engineered with tactile material integrity and zero compromises.
            </p>
          </div>

          <button
            id="view-all-categories-btn"
            onClick={() => onNavigate('catalog', 'All')}
            className="group inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-800 hover:text-black py-2 px-3.5 rounded-full bg-white border border-neutral-300/80 hover:border-neutral-900 shadow-2xs transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>View All Categories ({totalProductsCount})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Quick Filter Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          <button
            id="category-pill-all"
            onClick={() => onNavigate('catalog', 'All')}
            className="shrink-0 text-xs font-medium px-4 py-2 rounded-full border border-neutral-300/80 bg-white hover:bg-neutral-900 hover:text-white transition-all text-neutral-800 shadow-2xs flex items-center gap-1.5 group cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            <span>All Departments</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-neutral-100 group-hover:bg-neutral-800 text-neutral-600 group-hover:text-neutral-200">
              {totalProductsCount}
            </span>
          </button>

          {categoryMetas.map((cat) => {
            const count = getCategoryCount(cat.name);
            return (
              <button
                key={cat.id}
                id={`category-pill-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onNavigate('catalog', cat.name)}
                className="shrink-0 text-xs font-medium px-4 py-2 rounded-full border border-neutral-300/80 bg-white hover:bg-neutral-900 hover:text-white transition-all text-neutral-800 shadow-2xs flex items-center gap-1.5 group cursor-pointer"
              >
                <span className="text-neutral-500 group-hover:text-white transition-colors">
                  {cat.icon}
                </span>
                <span>{cat.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-neutral-100 group-hover:bg-neutral-800 text-neutral-600 group-hover:text-neutral-200">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Visual Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {categoryMetas.map((cat) => {
            const count = getCategoryCount(cat.name);
            return (
              <div
                key={cat.id}
                id={`category-card-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onNavigate('catalog', cat.name)}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-neutral-400 transition-all duration-300 cursor-pointer text-left"
              >
                {/* Visual Card Image with Zoom Effect */}
                <div className="relative aspect-4/5 sm:aspect-square w-full overflow-hidden bg-neutral-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Gradient Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/85 text-neutral-900 font-semibold backdrop-blur-xs shadow-2xs">
                      {cat.tag}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 shadow-2xs">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Count inside image */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white pointer-events-none">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-200 uppercase">
                      {count} {count === 1 ? 'Piece' : 'Pieces'}
                    </span>
                  </div>
                </div>

                {/* Card Text & Metadata */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-500 group-hover:text-black transition-colors">
                      {cat.icon}
                      <h3 className="font-display text-sm sm:text-base font-bold text-neutral-900 group-hover:text-black">
                        {cat.name}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-normal">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-700 group-hover:text-black transition-colors">
                    <span className="font-mono text-[11px] uppercase tracking-wide">Explore capsule</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// Also export as CategoriesSection for alias support
export const CategoriesSection = CategoryList;
