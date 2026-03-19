import React, { useEffect, useRef } from 'react';
import { CloseIcon, ArrowRightIcon } from './icons';
import { menuLinks } from '../constants/data';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !overlayRef.current) {
        return;
      }

      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      id="menu-overlay"
      ref={overlayRef}
      className={`fixed inset-0 z-50 bg-white/95 dark:bg-black/80 backdrop-blur-lg transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-modal="true"
      aria-hidden={!isOpen}
      role="dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 z-50"
        aria-label="Close menu"
      >
        <CloseIcon className="w-8 h-8" />
      </button>

      <div className="flex items-center justify-center h-full text-gray-900 dark:text-white px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-5xl">
          {menuLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-xl font-semibold mb-6">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.text}>
                    <a href={link.href} className="text-lg text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center group">
                      <span>{link.text}</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
