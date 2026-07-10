import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { PolicyData } from '../lib/policyTypes';
import { getPolicyPath, docNumberToSlug } from '../constants/policies/slugs';
import { categories } from '../constants/policies/categories';
import FixBadge from '../components/trust/FixBadge';
import PolicyMetaBar from '../components/trust/PolicyMetaBar';
import PolicySectionComponent from '../components/trust/PolicySection';
import PolicySidebar from '../components/trust/PolicySidebar';
import PolicyTableOfContents from '../components/trust/PolicyTableOfContents';
import RelatedPolicies from '../components/trust/RelatedPolicies';

// ─────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────

interface PolicyPageProps {
  policy: PolicyData;
  allPolicies: PolicyData[];
  reverseIndex: Record<number, number[]>;
}

// ─────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────

const PolicyPage: React.FC<PolicyPageProps> = ({ policy, allPolicies, reverseIndex }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    [policy.category]: true
  });

  const toggleCategory = (catName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  // Build sidebar data (exclude doc 34)
  const sidebarPolicies = useMemo(
    () =>
      allPolicies
        .filter((p) => p.number !== 34)
        .map((p) => ({
          number: p.number,
          title: p.title,
          id: p.id,
          isNew: p.isNew,
          category: p.category,
        })),
    [allPolicies]
  );

  // Group policies for mobile nav
  const groupedPolicies = useMemo(() => {
    return categories.map((cat) => ({
      name: cat.name,
      policies: sidebarPolicies.filter((p) => p.category === cat.name),
    })).filter(g => g.policies.length > 0);
  }, [sidebarPolicies]);

  // Get prev/next for sequential navigation
  const sortedPolicies = useMemo(
    () => allPolicies.filter((p) => p.number !== 34).sort((a, b) => a.number - b.number),
    [allPolicies]
  );

  const currentIndex = sortedPolicies.findIndex((p) => p.number === policy.number);
  const prevPolicy = currentIndex > 0 ? sortedPolicies[currentIndex - 1] : null;
  const nextPolicy = currentIndex < sortedPolicies.length - 1 ? sortedPolicies[currentIndex + 1] : null;

  // Section IDs for anchor linking
  const sectionId = (heading: string) =>
    heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] relative overflow-hidden font-sans text-gray-900 dark:text-[#EDEDED] selection:bg-black/10 dark:selection:bg-white/20 pt-24 pb-32 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 relative z-10">

        {/* ── BREADCRUMB & MOBILE NAV TRIGGER ── */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/5 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-[#555] uppercase tracking-widest">
            <Link
              href="/trust"
              className="hover:text-gray-900 dark:hover:text-[#EDEDED] transition-colors duration-200"
            >
              Trust Center
            </Link>
            <span>/</span>
            <Link
              href="/trust/policies"
              className="hover:text-gray-900 dark:hover:text-[#EDEDED] transition-colors duration-200"
            >
              Policies
            </Link>
            <span>/</span>
            <span className="text-gray-400 dark:text-[#444]">
              Doc {String(policy.number).padStart(2, '0')}
            </span>
          </div>

          {/* Mobile Browse Button */}
          <div className="lg:hidden relative">
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="flex items-center justify-between gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] rounded-lg hover:bg-gray-100 dark:hover:bg-[#111] transition-all duration-200 focus:outline-none"
            >
              <span>Browse All Policies ({isMobileNavOpen ? 'Close' : 'Open'})</span>
              <span className="text-[10px]">{isMobileNavOpen ? '▲' : '▼'}</span>
            </button>

            {isMobileNavOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] rounded-xl shadow-xl z-50 max-h-[400px] overflow-y-auto p-4 scrollbar-thin">
                <div className="space-y-4">
                  {groupedPolicies.map((group) => {
                    const isCatExpanded = !!expandedCategories[group.name];
                    return (
                      <div key={group.name} className="space-y-2">
                        <button
                          onClick={() => toggleCategory(group.name)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 dark:text-[#555]">
                            {group.name}
                          </span>
                          <span className="text-[9px] text-gray-400 dark:text-[#555]">
                            {isCatExpanded ? '▲' : '▼'}
                          </span>
                        </button>
                        {isCatExpanded && (
                          <ul className="space-y-1 pl-2 border-l border-gray-100 dark:border-white/5">
                            {group.policies.map((p) => {
                              const isActive = p.id === policy.id;
                              return (
                                <li key={p.number}>
                                  <Link
                                    href={getPolicyPath(p.number)}
                                    onClick={() => setIsMobileNavOpen(false)}
                                    className={`block text-xs py-1 px-2 rounded transition-colors ${
                                      isActive
                                        ? 'text-black dark:text-white bg-gray-100 dark:bg-[#111] font-semibold'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                                    }`}
                                  >
                                    <span className="font-mono text-[10px] text-gray-400 dark:text-[#555] mr-1">
                                      {String(p.number).padStart(2, '0')}
                                    </span>
                                    {p.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar (desktop only) */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="sticky top-28">
              <PolicySidebar
                policies={sidebarPolicies}
                currentSlug={policy.id}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* ── HEADER ── */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-black dark:text-white leading-tight flex-1">
                  {policy.title}
                </h1>
                {policy.isNew && (
                  <div className="mt-2 flex-shrink-0">
                    <FixBadge text="New in v2.0" />
                  </div>
                )}
              </div>
              <PolicyMetaBar
                version={policy.version}
                effectiveDate={policy.effectiveDate}
                lastUpdated={policy.lastUpdated}
                nextReview={policy.nextReview}
                isNew={policy.isNew}
              />
            </div>

            {/* ── TABLE OF CONTENTS ── */}
            {policy.sections.length > 0 && (
              <div className="mb-12 border border-gray-200 dark:border-[#222] rounded-2xl bg-gray-50 dark:bg-[#0A0A0A] p-8 transition-colors duration-300">
                <PolicyTableOfContents
                  sections={policy.sections.map((s) => ({ heading: s.heading }))}
                />
              </div>
            )}

            {/* ── POLICY SECTIONS ── */}
            <div className="space-y-0">
              {policy.sections.map((section) => (
                <PolicySectionComponent
                  key={section.heading}
                  heading={section.heading}
                  content={section.content}
                  id={sectionId(section.heading)}
                />
              ))}
            </div>

            {/* ── RELATED POLICIES ── */}
            {(policy.crossRefs.length > 0 || (reverseIndex[policy.number] && reverseIndex[policy.number].length > 0)) && (
              <div className="mt-16">
                <RelatedPolicies
                  currentDoc={policy.number}
                  crossRefs={policy.crossRefs}
                  referencedBy={reverseIndex[policy.number] || []}
                  allPolicies={allPolicies}
                />
              </div>
            )}

            {/* ── PREV / NEXT NAVIGATION ── */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-[#222] grid grid-cols-2 gap-4">
              {prevPolicy ? (
                <Link
                  href={getPolicyPath(prevPolicy.number)}
                  className="group border border-gray-200 dark:border-[#222] rounded-xl bg-gray-50 dark:bg-[#0A0A0A] p-5 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200"
                >
                  <div className="text-[11px] font-mono text-gray-400 dark:text-[#555] uppercase tracking-widest mb-2">
                    ← Previous
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-[#EDEDED] group-hover:text-black dark:group-hover:text-white transition-colors duration-200 truncate">
                    Doc {String(prevPolicy.number).padStart(2, '0')}: {prevPolicy.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPolicy ? (
                <Link
                  href={getPolicyPath(nextPolicy.number)}
                  className="group border border-gray-200 dark:border-[#222] rounded-xl bg-gray-50 dark:bg-[#0A0A0A] p-5 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200 text-right"
                >
                  <div className="text-[11px] font-mono text-gray-400 dark:text-[#555] uppercase tracking-widest mb-2">
                    Next →
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-[#EDEDED] group-hover:text-black dark:group-hover:text-white transition-colors duration-200 truncate">
                    Doc {String(nextPolicy.number).padStart(2, '0')}: {nextPolicy.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* ── END MARKER ── */}
            <div className="mt-20 pt-8 pb-12 text-center text-gray-400 dark:text-[#444] text-[11px] font-mono uppercase tracking-widest flex flex-col items-center justify-center gap-3 border-t border-gray-200 dark:border-[#111]">
              <div className="flex items-center gap-2">
                <span>■</span> End of Document
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default PolicyPage;
