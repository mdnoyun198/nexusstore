'use client'

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ViewMode } from '@/types';

export interface CategoryHighlightsProps {
  onNavigate: (view: ViewMode, category?: string) => void;
}

export const CategoryHighlights: React.FC<CategoryHighlightsProps> = ({ onNavigate }) => {
  const spotlights = [
    {
      category: 'Apparel',
      title: 'Structural Heavyweight Knitwear',
      subtitle: '500 GSM loopback cotton & boiled Shetland wool',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      cols: 'col-span-1 md:col-span-2'
    },
    {
      category: 'Tech & Audio',
      title: 'Acoustic Precision',
      subtitle: 'Anodized aluminum & beryllium sound drivers',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      cols: 'col-span-1'
    },
    {
      category: 'Everyday Carry',
      title: 'Ballistic Utility',
      subtitle: 'Cordura® weave with magnetic German Fidlock',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      cols: 'col-span-1'
    },
    {
      category: 'Objects & Home',
      title: 'Tactile Rituals',
      subtitle: 'Stoneware ceramics & turned brass table lamps',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      cols: 'col-span-1 md:col-span-2'
    }
  ];

  return (
    <section id="category-highlights-section" className="py-8 sm:py-14" aria-label="Curated discipline collections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-medium">
              Curated Collections
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-0.5">
              Explore by Discipline
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {spotlights.map((item, idx) => (
            <div
              key={idx}
              id={`highlight-discipline-${item.category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onNavigate('catalog', item.category)}
              className={`group relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-neutral-200/80 ${item.cols}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.75]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 font-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
