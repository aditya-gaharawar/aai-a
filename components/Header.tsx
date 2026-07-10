import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogoIcon, MenuIcon, SunIcon, MoonIcon } from './icons';
import { Menu } from './Menu';

interface HeaderProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between p-4 md:px-8 lg:px-12 xl:px-24 h-20">
          <div className="flex items-center space-x-4">
            <Link href="/" aria-label="WEBSPACEAI Homepage" className="hover:opacity-80 transition-opacity">
              <LogoIcon className="h-8 md:h-9 w-auto invert dark:invert-0" />
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <button
                onClick={toggleTheme}
                className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 group"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? (
                   <SunIcon className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                ) : (
                   <MoonIcon className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                )}
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 group"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6 opacity-80 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </header>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
