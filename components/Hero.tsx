import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { heroSlides } from '../constants/data';
import { ArrowRightIcon } from './icons';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const slide = heroSlides[currentSlide];

  return (
    <section
      className="relative w-full h-[65vh] md:h-[75vh] my-4 rounded-3xl overflow-hidden group bg-black"
      aria-label="Featured content slideshow"
    >
      {/* Background images */}
      <div className="w-full h-full overflow-hidden absolute inset-0" aria-hidden="true">
        {heroSlides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div
              className={`w-full h-full bg-cover bg-center ${
                !prefersReducedMotion && index === currentSlide ? 'animate-subtle-zoom' : ''
              }`}
              style={{ backgroundImage: `url(${s.imageUrl})` }}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20 z-20 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 z-30">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div
            key={`title-${currentSlide}`}
            className="overflow-visible mb-5"
          >
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight ${
              prefersReducedMotion ? 'opacity-100' : 'animate-slide-up-fade opacity-0 fill-mode-forwards'
            }`}>
              {slide.title}
            </h1>
          </div>

          {/* Description */}
          <div key={`desc-${currentSlide}`} className="overflow-visible mb-10">
            <p className={`text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light ${
              prefersReducedMotion ? 'opacity-100' : 'animate-slide-up-fade-delay-1 opacity-0 fill-mode-forwards'
            }`}>
              {slide.description}
            </p>
          </div>

          {/* CTA Button */}
          <div
            key={`btn-${currentSlide}`}
            className={prefersReducedMotion ? 'opacity-100' : 'animate-slide-up-fade-delay-2 opacity-0 fill-mode-forwards'}
          >
            <Link
              href={slide.href}
              className="bg-white text-black font-medium py-3.5 px-7 rounded-full
                inline-flex items-center space-x-2
                hover:bg-gray-100 transition-all duration-300
                hover:shadow-[0_0_32px_rgba(255,255,255,0.35)]
                active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
                group/btn"
            >
              <span>{slide.buttonText}</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2.5 z-40"
        role="tablist"
        aria-label="Slideshow navigation"
      >
        {heroSlides.map((s, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={currentSlide === index}
            aria-label={`Go to slide: ${s.title}`}
            onClick={() => setCurrentSlide(index)}
            className="group relative h-1 rounded-full overflow-hidden transition-all duration-500 ease-out backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{
              width: currentSlide === index ? '44px' : '20px',
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}
          >
            {currentSlide === index && !prefersReducedMotion && (
              <div className="absolute inset-y-0 left-0 bg-white w-full animate-progress origin-left" />
            )}
            {currentSlide === index && prefersReducedMotion && (
              <div className="absolute inset-y-0 left-0 bg-white w-full" />
            )}
            <div className="absolute inset-y-0 left-0 w-full bg-white opacity-0 group-hover:opacity-40 transition-opacity" />
          </button>
        ))}
      </div>
    </section>
  );
};
