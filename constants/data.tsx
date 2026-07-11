import React from 'react';
import { CardData, FooterLinkColumn } from '../types';
import geminiGenerated from '../src/assets/images/gemini_generated.jpg';
import image4 from '../src/assets/images/image4.jpeg';

export const heroSlides = [
  {
    title: 'Explore Our Research',
    description: 'Advancing AI to benefit all of humanity—safely, transparently, and with lasting purpose.',
    imageUrl: geminiGenerated.src,
    buttonText: 'See our research',
    href: '/safety',
  },
  {
    title: 'AI for Everyone',
    description: 'Deploy the world\'s most thoughtfully built AI models in your own applications.',
    imageUrl: image4.src,
    buttonText: 'Explore products',
    href: '/soon',
  },
  {
    title: 'Trust by Design',
    description: 'Transparency, governance, and safety are foundational to everything we build.',
    imageUrl: 'https://picsum.photos/seed/trust-ai/1400/800',
    buttonText: 'Visit Trust Center',
    href: '/trust',
  },
  {
    title: 'Join Our Mission',
    description: 'We\'re building the future of responsible artificial intelligence. Come build it with us.',
    imageUrl: 'https://picsum.photos/seed/webspaceai-team/1200/600',
    buttonText: 'View careers',
    href: '/soon',
  },
];

export const productCards: CardData[] = [
  {
    category: 'For Everyone',
    title: 'WEBSPACEAI Assistant',
    imageUrl: geminiGenerated.src,
  },
  {
    category: 'For Teams',
    title: 'WEBSPACEAI ONE',
    imageUrl: image4.src,
  },
];

export const researchCards: CardData[] = [
  {
    category: 'AI Safety',
    date: 'Jun 2026',
    title: 'Scalable oversight for large language models',
    imageUrl: 'https://picsum.photos/seed/safety_research_2026/600/800',
  },
  {
    category: 'Alignment',
    date: 'Apr 2026',
    title: 'Constitutional AI: Harmlessness from AI feedback',
    imageUrl: 'https://picsum.photos/seed/alignment_research/600/800',
  },
  {
    category: 'Interpretability',
    date: 'Feb 2026',
    title: 'Mechanistic interpretability of transformer circuits',
    imageUrl: 'https://picsum.photos/seed/interpretability/600/800',
  },
  {
    category: 'Multi-modal',
    date: 'Jan 2026',
    title: 'Unified reasoning across text, vision, and audio',
    imageUrl: 'https://picsum.photos/seed/multimodal_2026/600/800',
  },
];

export const newsCards: CardData[] = [
  {
    category: 'Company',
    date: 'Jul 4, 2026',
    title: 'WEBSPACEAI Policy Suite v2.1 — 40 documents, fully cross-referenced',
    imageUrl: 'https://picsum.photos/seed/policy_suite/600/600',
  },
  {
    category: 'Research',
    date: 'Jun 15, 2026',
    title: 'Introducing our AI Safety Framework: five levels of capability-aligned safeguards',
    imageUrl: 'https://picsum.photos/seed/safety_framework/600/600',
  },
];

export const menuLinks: FooterLinkColumn[] = [
  {
    title: 'Research',
    links: [
      { text: 'Overview', href: '/soon' },
      { text: 'Publications', href: '/soon' },
      { text: 'AI Safety', href: '/safety' },
      { text: 'Interpretability', href: '/soon' },
    ],
  },
  {
    title: 'Products',
    links: [
      { text: 'WEBSPACEAI', href: '/soon' },
      { text: 'API Platform', href: '/soon' },
      { text: 'Pricing', href: '/soon' },
      { text: 'For Business', href: '/soon' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About us', href: '/soon' },
      { text: 'News', href: '/soon' },
      { text: 'Careers', href: '/soon' },
      { text: 'Security', href: '/trust/policies/11-security-policy' },
    ],
  },
  {
    title: 'Trust & Safety',
    links: [
      { text: 'Safety Framework', href: '/safety' },
      { text: 'Trust Center', href: '/trust' },
      { text: 'All Policies', href: '/trust/policies' },
      { text: 'Privacy Policy', href: '/trust/policies/01-privacy-policy' },
    ],
  },
];

export const footerLinks: FooterLinkColumn[] = [
  {
    title: 'Research',
    links: [
      { text: 'Overview', href: '/soon' },
      { text: 'Publications', href: '/soon' },
      { text: 'AI Safety', href: '/safety' },
      { text: 'Interpretability', href: '/soon' },
      { text: 'Alignment', href: '/soon' },
    ],
  },
  {
    title: 'Product',
    links: [
      { text: 'For Everyone', href: '/soon' },
      { text: 'For Teams', href: '/soon' },
      { text: 'For Enterprise', href: '/soon' },
      { text: 'Product login', href: '/soon', external: true },
    ],
  },
  {
    title: 'API',
    links: [
      { text: 'Platform overview', href: '/soon' },
      { text: 'Pricing', href: '/soon' },
      { text: 'Documentation', href: '/soon', external: true },
      { text: 'API login', href: '/soon', external: true },
    ],
  },
  {
    title: 'Explore',
    links: [
      { text: 'For business', href: '/soon' },
      { text: 'Stories', href: '/soon' },
      { text: 'Partnerships', href: '/soon' },
    ],
  },
  {
    title: 'Trust & Safety',
    links: [
      { text: 'Safety Framework', href: '/safety' },
      { text: 'Trust Center', href: '/trust' },
      { text: 'All Policies', href: '/trust/policies' },
    ],
  },
  {
    title: 'Teams',
    links: [
      { text: 'Safety Systems', href: '/soon' },
      { text: 'Preparedness', href: '/soon' },
      { text: 'Alignment Research', href: '/soon' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About us', href: '/soon' },
      { text: 'News', href: '/soon' },
      { text: 'Our Charter', href: '/soon' },
      { text: 'Security', href: '/trust/policies/11-security-policy' },
      { text: 'Careers', href: '/soon' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { text: 'Terms of use', href: '/trust/policies/02-terms-of-service' },
      { text: 'Privacy policy', href: '/trust/policies/01-privacy-policy' },
      { text: 'Cookie policy', href: '/trust/policies/04-cookie-policy' },
      { text: 'All policies', href: '/trust/policies' },
    ],
  },
];
