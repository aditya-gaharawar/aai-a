import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-200 min-h-screen selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-300">
      <Header theme={theme} toggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
