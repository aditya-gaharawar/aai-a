import React, { useState, useEffect } from 'react';
import { heroSlides } from '../constants/data';
import { ArrowRightIcon } from './icons';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative w-full h-[65vh] md:h-[75vh] my-4 rounded-3xl overflow-hidden group bg-black">
      {/* Background Layer */}
      <div className="w-full h-full overflow-hidden absolute inset-0">
          {heroSlides.map((s, index) => (
             <div 
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
             >
                <div 
                    className={`w-full h-full bg-cover bg-center ${index === currentSlide ? 'animate-subtle-zoom' : ''}`}
                    style={{ backgroundImage: `url(${s.imageUrl})` }}
                />
             </div>
          ))}
      </div>
        
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40 z-20 pointer-events-none"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 z-30">
        <div className="max-w-4xl mx-auto">
            {/* Title */}
            <div key={`title-${currentSlide}`} className="overflow-visible mb-6">
                 <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-slide-up-fade opacity-0 fill-mode-forwards leading-tight">
                    {slide.title}
                 </h1>
            </div>
            
            {/* Description */}
            <div key={`desc-${currentSlide}`} className="overflow-visible mb-10">
                <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed animate-slide-up-fade-delay-1 opacity-0 fill-mode-forwards font-light">
                    {slide.description}
                </p>
            </div>

            {/* Button */}
            <div key={`btn-${currentSlide}`} className="animate-slide-up-fade-delay-2 opacity-0 fill-mode-forwards">
                <button className="bg-white text-black font-medium py-4 px-8 rounded-full flex items-center space-x-2 mx-auto hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 group/btn">
                    <span>{slide.buttonText}</span>
                    <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
            </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-40">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative h-1.5 rounded-full overflow-hidden transition-all duration-500 ease-out backdrop-blur-sm"
            style={{ width: currentSlide === index ? '48px' : '24px', backgroundColor: 'rgba(255,255,255,0.3)' }}
            aria-label={`Go to slide ${index + 1}`}
          >
             {currentSlide === index && (
                <div className="absolute inset-y-0 left-0 bg-white w-full animate-progress origin-left" />
             )}
             <div className="absolute inset-y-0 left-0 w-full bg-white opacity-0 group-hover:opacity-50 transition-opacity" />
          </button>
        ))}
      </div>

      <style>{`
        .fill-mode-forwards {
            animation-fill-mode: forwards;
        }
        
        @keyframes subtle-zoom {
            0% { transform: scale(1) translate(0,0); }
            100% { transform: scale(1.1) translate(-1%, -1%); }
        }

        @keyframes slide-up-fade {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.98);
                filter: blur(8px);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
            }
        }

        @keyframes progress {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }

        .animate-subtle-zoom {
            animation: subtle-zoom 20s ease-in-out infinite alternate;
        }

        .animate-slide-up-fade {
            animation: slide-up-fade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .animate-slide-up-fade-delay-1 {
            animation: slide-up-fade 0.8s 0.15s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .animate-slide-up-fade-delay-2 {
            animation: slide-up-fade 0.8s 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .animate-progress {
            animation: progress 6s linear;
        }
      `}</style>
    </section>
  );
};
