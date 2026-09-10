'use client'
import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#181716] text-[#FAF8F5] pt-16 pb-24 md:pb-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl tracking-[0.25em] uppercase text-white">
                ATELIER
              </span>
              <span className="text-[10px] tracking-[0.3em] font-mono text-neutral-400 uppercase">
                OBJECTS & ESSENTIALS
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              An independent studio formulating timeless wardrobe staples, acoustic systems, and tactile everyday carry objects without transient trends or planned obsolescence.
            </p>
          </div>

          {/* Nav 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button onClick={() => onNavigate('catalog', 'Apparel')} className="hover:text-white transition-colors">
                  Apparel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', 'Everyday Carry')} className="hover:text-white transition-colors">
                  Everyday Carry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', 'Tech & Audio')} className="hover:text-white transition-colors">
                  Audio & Tech
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', 'Objects & Home')} className="hover:text-white transition-colors">
                  Home & Objects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', 'Footwear')} className="hover:text-white transition-colors">
                  Footwear
                </button>
              </li>
            </ul>
          </div>

          {/* Nav 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
              Assistance
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li><span className="cursor-pointer hover:text-white transition-colors">Order Tracking</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Carbon Offsetting</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Size Guide & Fit</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Studio Warranty</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">30-Day Returns</span></li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
              Private Release Dispatch
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Subscribers receive early lookbook previews, access to limited numbered drops, and architectural dispatches.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for private drops"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center shrink-0"
              >
                {subscribed ? <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 font-mono">
                Welcome to Atelier dispatch. Check your inbox.
              </p>
            )}
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div>
            © 2026 Atelier Objects LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="cursor-pointer hover:text-neutral-300">Privacy Policy</span>
            <span className="cursor-pointer hover:text-neutral-300">Terms of Service</span>
            <span className="cursor-pointer hover:text-neutral-300">Material Traceability</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
