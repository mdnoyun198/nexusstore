'use client'

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Feather } from 'lucide-react';

export const BrandPerks: React.FC = () => {
  const perks = [
    {
      icon: <Truck className="w-5 h-5 text-neutral-800" />,
      title: 'Carbon-Neutral Delivery',
      desc: '100% emission offsets on worldwide ground and express shipping.'
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-neutral-800" />,
      title: '30-Day Trial & Returns',
      desc: 'Prepaid return shipping slips provided in every order box.'
    },
    {
      icon: <Feather className="w-5 h-5 text-neutral-800" />,
      title: 'Small-Batch Provenance',
      desc: 'Crafted in limited runs with ethical European & Japanese mills.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-neutral-800" />,
      title: 'Lifetime Guarantee',
      desc: 'Free repairs and hardware replacement on all carry & acoustics.'
    }
  ];

  return (
    <section className="py-12 border-y border-neutral-200 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                {perk.icon}
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-neutral-900">
                  {perk.title}
                </h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
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
