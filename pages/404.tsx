import Head from 'next/head';
import Link from 'next/link';
import { ArrowRightIcon } from '../components/icons';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | WEBSPACEAI</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex" />
      </Head>

      <main
        className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center
          font-sans text-gray-900 dark:text-[#EDEDED]
          selection:bg-black/10 dark:selection:bg-white/20
          px-4 transition-colors duration-300"
      >
        <div className="text-center max-w-lg mx-auto">

          {/* Large 404 numerals */}
          <div
            className="text-[120px] sm:text-[160px] font-black tracking-tighter leading-none
              text-gray-100 dark:text-[#111] select-none mb-8"
            aria-hidden="true"
          >
            404
          </div>

          {/* Eyebrow */}
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#555] mb-4">
            Page not found
          </p>

          {/* Headline */}
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-black dark:text-white mb-4 leading-snug">
            This page doesn't exist
          </h1>

          {/* Body */}
          <p className="text-gray-600 dark:text-[#888] text-base leading-relaxed mb-10 max-w-sm mx-auto">
            The page you were looking for may have moved, been removed, or the link might be incorrect.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-black dark:bg-white text-white dark:text-black
                text-sm font-semibold
                hover:bg-gray-800 dark:hover:bg-gray-200
                transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
            >
              <span>Go home</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/trust"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-gray-200 dark:border-[#333]
                bg-white dark:bg-black
                text-sm font-semibold text-gray-700 dark:text-[#EDEDED]
                hover:border-gray-400 dark:hover:border-[#666]
                transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Trust Center
            </Link>

            <Link
              href="/safety"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-gray-200 dark:border-[#333]
                bg-white dark:bg-black
                text-sm font-semibold text-gray-700 dark:text-[#EDEDED]
                hover:border-gray-400 dark:hover:border-[#666]
                transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Safety Framework
            </Link>
          </div>

          {/* Divider */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-[#111]">
            <p className="text-xs text-gray-400 dark:text-[#555] font-mono uppercase tracking-widest">
              WEBSPACEAI — Responsible AI
            </p>
          </div>

        </div>
      </main>
    </>
  );
}
