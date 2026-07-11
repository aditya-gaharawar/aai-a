import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from './icons';

export const CallToAction: React.FC = () => {
  return (
    <section className="text-center py-20 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto mb-8 leading-tight text-gray-900 dark:text-white">
        Instant answers. Greater productivity. Endless inspiration.
      </h2>
      <Link href="/soon" className="inline-flex bg-black dark:bg-white text-white dark:text-black font-semibold py-3 px-6 rounded-full items-center space-x-2 mx-auto hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
        <span>Try our Product</span>
        <ArrowRightIcon />
      </Link>
    </section>
  );
};
