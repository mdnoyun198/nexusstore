'use client'

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ViewMode } from '@/types';

interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  categoryTarget?: string;
  image: string;
  accentColor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    tag: 'NEW RELEASES · DROP 04',
    title: 'Architectural Silhouettes & Heavy French Terry',
    subtitle: 'Meticulously engineered from 500 GSM loopback cotton. Built to last generations.',
    ctaText: 'Explore Collection',
    categoryTarget: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1600&q=85',
    accentColor: '#D7D1C7'
  },
  {
    id: 'hero-2',
    tag: 'ACOUSTIC ENGINEERING',
    title: 'Pure Lossless Sound. Machined Aluminum.',
    subtitle: 'Studio-grade acoustic drivers with physical tactile dial controls and lambskin comfort.',
    ctaText: 'Discover Audio',
    categoryTarget: 'Tech & Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=85',
    accentColor: '#D8D8DC'
  },
  {
    id: 'hero-3',
    tag: 'EVERYDAY UTILITY',
    title: 'Modular Waterproof Carry Systems',
    subtitle: '500D Cordura ballistic weave meets German Fidlock magnetic mechanical fasteners.',
    ctaText: 'Shop Everyday Carry',
    categoryTarget: 'Everyday Carry',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=85',
    accentColor: '#8F9398'
  }
];

export interface HeroBannerProps {
  onNavigate: (view: ViewMode, category?: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div
      id="hero-banner"
      className="relative w-full overflow-hidden bg-neutral-900 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Image with Gradient Overlay */}
      <div className="relative h-[480px] sm:h-[560px] md:h-[620px] w-full">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
            {/* Artistic gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-mono tracking-widest text-amber-200 uppercase">
              {slide.tag}
            </div>

            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed line-clamp-2 sm:line-clamp-none max-w-xl">
              {slide.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                id={`hero-cta-${currentSlide}`}
                onClick={() => onNavigate('catalog', slide.categoryTarget)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-100 active:scale-[0.98] transition-all shadow-lg cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                id="hero-view-lookbook-btn"
                onClick={() => onNavigate('catalog')}
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-md transition-all cursor-pointer"
              >
                View Lookbook
              </button>
            </div>
          </div>

          {/* Controls: Next/Prev & Pill Indicators */}
          <div className="absolute bottom-6 right-4 sm:right-8 z-30 flex items-center gap-3">
            {/* Slide indicators */}
            <div className="flex items-center gap-1.5 mr-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                id="hero-prev-btn"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="hero-next-btn"
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Also export as HeroCarousel for alias support
export const HeroCarousel = HeroBanner;
