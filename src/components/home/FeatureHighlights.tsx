'use client'

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Feather } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const perks = [
    {
      id: 'perk-delivery',
      icon: <Truck className="w-5 h-5 text-neutral-800 group-hover:text-black transition-colors" />,
      title: 'Carbon-Neutral Delivery',
      desc: '100% emission offsets on worldwide ground and express shipping.'
    },
    {
      id: 'perk-returns',
      icon: <RotateCcw className="w-5 h-5 text-neutral-800 group-hover:text-black transition-colors" />,
      title: '30-Day Trial & Returns',
      desc: 'Prepaid return shipping slips provided in every order box.'
    },
    {
      id: 'perk-provenance',
      icon: <Feather className="w-5 h-5 text-neutral-800 group-hover:text-black transition-colors" />,
      title: 'Small-Batch Provenance',
      desc: 'Crafted in limited runs with ethical European & Japanese mills.'
    },
    {
      id: 'perk-guarantee',
      icon: <ShieldCheck className="w-5 h-5 text-neutral-800 group-hover:text-black transition-colors" />,
      title: 'Lifetime Guarantee',
      desc: 'Free repairs and hardware replacement on all carry & acoustics.'
    }
  ];

  return (
    <section 
      id="brand-perks-section"
      className="py-12 sm:py-16 border-t border-neutral-200/90 bg-[#FAF9F6] transition-colors"
      aria-label="Value proposition and brand guarantees"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {perks.map((perk) => (
            <div 
              key={perk.id} 
              id={perk.id}
              className="group flex items-start gap-4 p-4 rounded-2xl bg-white/80 border border-neutral-200/60 shadow-2xs hover:shadow-xs hover:border-neutral-300 hover:bg-white transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F5F4F0] flex items-center justify-center shrink-0 border border-neutral-200/80 group-hover:bg-neutral-900 group-hover:text-white transition-all">
                {React.cloneElement(perk.icon, {
                  className: "w-5 h-5 text-neutral-800 group-hover:text-white transition-colors"
                })}
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm sm:text-base text-neutral-900 tracking-tight">
                  {perk.title}
                </h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-normal">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Also export as BrandPerks for backwards compatibility
export const BrandPerks = FeatureHighlights;
