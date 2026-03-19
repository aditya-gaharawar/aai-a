import React from 'react';
import { footerLinks } from '../constants/data';
import { LogoIcon, ArrowRightIcon, SocialIcons } from './icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-[#111] text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-900 pt-24 pb-12 px-4 md:px-8 lg:px-12 xl:px-24 transition-colors duration-300">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-12 mb-20">
        {footerLinks.map((column) => (
          <div key={column.title}>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-5">{column.title}</h3>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link.text}>
                  <a href={link.href} className="hover:text-black dark:hover:text-white transition-colors flex items-center text-sm group">
                    <span>{link.text}</span>
                    {link.external && <ArrowRightIcon className="w-3 h-3 ml-1 opacity-60 group-hover:opacity-100 transition-opacity" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-900 pt-10 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="flex items-center space-x-4">
          <LogoIcon className="h-6 w-auto invert dark:invert-0 opacity-80" />
          <span className="text-sm">WEBSPACEAI © {currentYear}</span>
        </div>
        <SocialIcons />
      </div>
    </footer>
  );
};
