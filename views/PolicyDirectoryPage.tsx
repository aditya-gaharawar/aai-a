import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PolicyData, PolicyCategory } from '../lib/policyTypes';
import { categories } from '../constants/policies/categories';
import { getPolicyPath } from '../constants/policies/slugs';
import FixBadge from '../components/trust/FixBadge';

// ─────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────

interface PolicyDirectoryPageProps {
  policies: PolicyData[];
  appendixIndex: Array<{
    policy: string;
    riskLevels: string;
    keyCrossRefs: string;
    isNew: boolean;
  }>;
}

// ─────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────

const PolicyDirectoryPage: React.FC<PolicyDirectoryPageProps> = ({ policies, appendixIndex }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<PolicyCategory | 'All'>('All');

  const filteredPolicies = useMemo(() => {
    let result = policies.filter((p) => p.number !== 34);
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          String(p.number).includes(q)
      );
    }
    return result;
  }, [policies, search, activeCategory]);

  const groupedPolicies = useMemo(() => {
    const map: Record<string, PolicyData[]> = {};
    for (const cat of categories) {
      const catPolicies = filteredPolicies.filter((p) => p.category === cat.name);
      if (catPolicies.length > 0) {
        map[cat.name] = catPolicies;
      }
    }
    return map;
  }, [filteredPolicies]);

  const categoryNames: Array<PolicyCategory | 'All'> = [
    'All',
    ...categories.map((c) => c.name),
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] relative overflow-hidden font-sans text-gray-900 dark:text-[#EDEDED] selection:bg-black/10 dark:selection:bg-white/20 pt-24 pb-32 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 relative z-10">

        {/* ── HEADER ── */}
        <div className="mb-16 text-center flex flex-col items-center">
          <Link
            href="/trust"
            className="text-xs font-mono text-gray-500 dark:text-[#555] uppercase tracking-widest mb-6 hover:text-gray-900 dark:hover:text-[#EDEDED] transition-colors duration-200"
          >
            ← Trust Center
          </Link>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-black dark:text-white mb-6 leading-tight max-w-[800px]">
            Policy Directory
          </h1>
          <p className="text-gray-600 dark:text-[#888] text-lg md:text-xl leading-relaxed max-w-[700px]">
            Browse the complete WEBSPACEAI policy suite. Search by title, filter by category, or navigate the cross-reference index.
          </p>
        </div>

        {/* ── SEARCH & FILTERS ── */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-[#555]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search policies by title or number…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] rounded-xl text-sm text-gray-900 dark:text-[#EDEDED] placeholder-gray-400 dark:placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-[#333] transition-colors duration-200"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryNames.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                    isActive
                      ? 'text-black dark:text-[#EDEDED] bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#444] shadow-sm'
                      : 'text-gray-500 dark:text-[#666] bg-transparent border-transparent hover:text-gray-900 dark:hover:text-[#AAA] hover:bg-gray-100 dark:hover:bg-[#111]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── POLICY LISTING ── */}
        <div className="mb-40">
          {Object.keys(groupedPolicies).length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-[#555] text-sm">No policies match your search.</p>
            </div>
          ) : (
            Object.entries(groupedPolicies).map(([categoryName, catPolicies]) => (
              <div key={categoryName} className="mb-16 last:mb-0">
                <h3 className="text-xs font-mono text-gray-500 dark:text-[#555] uppercase tracking-widest mb-6">
                  {categoryName}
                </h3>

                {/* Desktop: Table layout */}
                <div className="hidden md:block border border-gray-200 dark:border-[#222] rounded-2xl bg-gray-50 dark:bg-[#0A0A0A] overflow-hidden transition-colors duration-300">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-[#222]">
                        <th className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#555] px-6 py-4 w-16">Doc</th>
                        <th className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#555] px-6 py-4">Title</th>
                        <th className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#555] px-6 py-4 w-20">Version</th>
                        <th className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#555] px-6 py-4 w-24">Status</th>
                        <th className="px-6 py-4 w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {catPolicies.map((policy) => (
                        <tr
                          key={policy.number}
                          className="border-b border-gray-200 dark:border-[#222] last:border-0 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm font-mono text-gray-400 dark:text-[#555]">
                            {String(policy.number).padStart(2, '0')}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              href={getPolicyPath(policy.number)}
                              className="text-sm font-medium text-gray-900 dark:text-[#EDEDED] hover:text-black dark:hover:text-white transition-colors duration-200"
                            >
                              {policy.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-gray-500 dark:text-[#666]">
                            v{policy.version}
                          </td>
                          <td className="px-6 py-4">
                            {policy.isNew && <FixBadge text="New in v2.0" />}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={getPolicyPath(policy.number)}
                              className="text-gray-400 dark:text-[#555] hover:text-gray-900 dark:hover:text-[#EDEDED] transition-colors duration-200"
                            >
                              →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile: Card layout */}
                <div className="md:hidden space-y-3">
                  {catPolicies.map((policy) => (
                    <Link
                      key={policy.number}
                      href={getPolicyPath(policy.number)}
                      className="block border border-gray-200 dark:border-[#222] rounded-xl bg-gray-50 dark:bg-[#0A0A0A] p-5 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-gray-400 dark:text-[#555]">
                              Doc {String(policy.number).padStart(2, '0')}
                            </span>
                            {policy.isNew && <FixBadge text="New" />}
                          </div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-[#EDEDED] truncate">
                            {policy.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-gray-400 dark:text-[#555] mt-1">
                          v{policy.version}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── APPENDIX: CROSS-REFERENCE INDEX ── */}
        {appendixIndex.length > 0 && (
          <div className="mb-32">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white mb-4">
                Cross-Reference Index
              </h2>
              <p className="text-gray-600 dark:text-[#888] text-base max-w-[600px] mx-auto">
                Risk-level mappings and cross-references between all policy documents.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-[#222] rounded-2xl bg-gray-50 dark:bg-[#0A0A0A] overflow-x-auto transition-colors duration-300">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-[#222]">
                    <th className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#555] px-6 py-4">
                      Policy
                    </th>
                    <th className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#555] px-6 py-4">
                      Risk Levels
                    </th>
                    <th className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#555] px-6 py-4">
                      Key Cross-Refs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appendixIndex.map((entry, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 dark:border-[#222] last:border-0 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900 dark:text-[#EDEDED]">{entry.policy}</span>
                          {entry.isNew && <FixBadge text="New" />}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600 dark:text-[#888]">
                        {entry.riskLevels}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600 dark:text-[#888] font-mono">
                        {entry.keyCrossRefs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── END MARKER ── */}
        <div className="mt-20 pt-8 pb-12 text-center text-gray-400 dark:text-[#444] text-[11px] font-mono uppercase tracking-widest flex flex-col items-center justify-center gap-3 border-t border-gray-200 dark:border-[#111]">
          <div className="flex items-center gap-2">
            <span>■</span> End of Policy Directory
          </div>
        </div>

      </div>
    </main>
  );
};

export default PolicyDirectoryPage;
