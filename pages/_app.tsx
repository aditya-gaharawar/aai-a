import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next";
import '../styles/globals.css';

// Read the saved theme synchronously before first render to avoid flash
function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {}
  // Default: system preference, fallback dark
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Sync from localStorage on mount (avoids SSR mismatch)
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <>
      {/* Skip-to-main-content for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4
          focus:px-4 focus:py-2 focus:rounded-lg focus:bg-black dark:focus:bg-white
          focus:text-white dark:focus:text-black focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div
        id="main-content"
        className="bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-200 min-h-screen
          selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-300"
      >
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Component {...pageProps} />
        <Footer />
      </div>
      <SpeedInsights />
    </>
  );
}
