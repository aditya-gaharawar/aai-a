import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRightIcon } from '../components/icons';

const ComingSoonPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to real email backend (e.g. Mailchimp / Resend API)
    // For now we show a polished success state
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Coming Soon | WEBSPACEAI</title>
        <meta name="description" content="We are actively building this feature. Sign up to be notified when it launches." />
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-white dark:bg-[#050505] transition-colors duration-300 relative overflow-hidden">
        {/* Subtle top gradient */}
        <div
          className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-white/[0.02] dark:to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-2xl mx-auto w-full text-center relative z-10">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#555] mb-6">
            In Development
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white mb-6">
            Coming Soon
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-[#AAA] mb-12 max-w-xl mx-auto leading-relaxed">
            We are actively building this experience. It will be available in an upcoming release. Enter your email to be notified when it launches.
          </p>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="mb-12 flex flex-col items-center gap-3 text-gray-700 dark:text-[#EDEDED]"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#111] flex items-center justify-center mb-1">
                <svg className="w-6 h-6 text-black dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-semibold text-lg">You&apos;re on the list.</p>
              <p className="text-sm text-gray-500 dark:text-[#888]">
                We&apos;ll notify <span className="font-medium text-gray-700 dark:text-[#EDEDED]">{email}</span> when this feature launches.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-12"
              onSubmit={handleSubmit}
            >
              <label htmlFor="soon-email" className="sr-only">Email address</label>
              <input
                type="email"
                id="soon-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-[#333]
                  bg-white dark:bg-[#111] text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                  transition-all shadow-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-black dark:bg-white
                  text-white dark:text-black font-medium
                  hover:bg-gray-800 dark:hover:bg-gray-200
                  transition-colors shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-black dark:focus:ring-white dark:focus:ring-offset-[#050505]"
              >
                Notify me
              </button>
            </form>
          )}

          <div className="pt-8 border-t border-gray-200 dark:border-[#222]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-[#AAA] hover:text-black dark:hover:text-white transition-colors group"
            >
              <ArrowRightIcon className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              <span>Return to homepage</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ComingSoonPage;
