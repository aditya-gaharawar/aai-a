import React from 'react';
import Link from 'next/link';
import { Hero } from '../components/Hero';
import { Card } from '../components/Card';
import { CallToAction } from '../components/CallToAction';
import {
  productCards,
  researchCards,
  newsCards,
} from '../constants/data';
import { CardData } from '../types';
import { ArrowRightIcon } from '../components/icons';

const HorizontalSection: React.FC<{ title: string; cards: CardData[] }> = ({ title, cards }) => (
    <section className="py-12">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <Link href="/soon" className="text-sm font-semibold text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white flex items-center gap-1 transition-colors group">
                <span>View all</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
        <div className="relative">
            <div className="flex overflow-x-auto space-x-6 pb-6 -mb-6 px-1">
                {cards.map((card, index) => (
                    <Card key={index} {...card} layout="horizontal" />
                ))}
                <div className="flex-shrink-0 w-1"></div>
            </div>
        </div>
    </section>
);

const HomePage: React.FC = () => {
  return (
    <main className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 w-full">
      <Hero />
      <HorizontalSection title="Product" cards={productCards} />
      <HorizontalSection title="Research" cards={researchCards} />
      <HorizontalSection title="News" cards={newsCards} />
      <CallToAction />
    </main>
  );
};

export default HomePage;
