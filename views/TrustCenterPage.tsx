import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PolicyData, PolicyCategory } from '../lib/policyTypes';
import { categories } from '../constants/policies/categories';
import { getPolicyPath } from '../constants/policies/slugs';
import PolicyCard from '../components/trust/PolicyCard';
import ViewToggle from '../components/trust/ViewToggle';

// ─────────────────────────────────────────────────
// PLAIN-LANGUAGE CATEGORY DESCRIPTIONS
// ─────────────────────────────────────────────────

const plainDescriptions: Record<PolicyCategory, string> = {
  'Legal': 'The rules and agreements that apply when you use WEBSPACEAI products and services.',
  'AI Safety & Trust and Safety': 'How we build, test, and monitor AI to keep it safe and trustworthy.',
  'Governance & Evaluation': 'How we measure, benchmark, and oversee AI system performance and safety.',
  'Trust Center & Compliance': 'Our security certifications, compliance posture, and transparency commitments.',
};

// ─────────────────────────────────────────────────
// QUICK LINKS DATA
// ─────────────────────────────────────────────────

const quickLinks = [
  {
    title: 'Security Certifications',
    description: 'SOC 2, ISO 27001, and other compliance certifications.',
    href: '/trust/certifications',
    isTodo: true,
  },
  {
    title: 'Sub-processor List',
    description: 'Third-party services that process data on our behalf.',
    href: '/trust/sub-processors',
    isTodo: true,
  },
  {
    title: 'Transparency Reports',
    description: 'Periodic disclosures on content moderation and government requests.',
    href: '/trust/transparency',
    isTodo: true,
  },
  {
    title: 'VPATs / Accessibility',
    description: 'Voluntary Product Accessibility Templates and our accessibility commitment.',
    href: '/trust/policies/13-accessibility-statement',
    isTodo: false,
  },
];

// ─────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────

interface TrustCenterPageProps {
  policies: PolicyData[];
}

const TrustCenterPage: React.FC<TrustCenterPageProps> = ({ policies }) => {
  const [viewMode, setViewMode] = useState<'plain' | 'technical'>('plain');

  const policiesByCategory = useMemo(() => {
    const map: Record<string, PolicyData[]> = {};
    for (const cat of categories) {
      map[cat.name] = policies.filter((p) => cat.docNumbers.includes(p.number));
    }
    return map;
  }, [policies]);

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] relative overflow-hidden font-sans text-gray-900 dark:text-[#EDEDED] selection:bg-black/10 dark:selection:bg-white/20 pt-24 pb-32 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 relative z-10">

        {/* ── HERO ── */}
        <div className="mb-32 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-black dark:text-white mb-6 leading-tight max-w-[800px]">
            Trust Center
          </h1>
          <p className="text-gray-600 dark:text-[#888] text-lg md:text-xl leading-relaxed max-w-[700px]">
            WEBSPACEAI is committed to transparency, security, and responsible AI. Explore our complete policy suite governing how we build, deploy, and operate AI systems.
          </p>
        </div>

        {/* ── VIEW TOGGLE ── */}
        <div className="flex justify-center mb-16">
          <ViewToggle
            mode={viewMode}
            onToggle={(mode) => setViewMode(mode)}
          />
        </div>

        {/* ── QUICK LINKS ── */}
        <div className="mb-40">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white mb-4">Quick Links</h2>
            <p className="text-gray-600 dark:text-[#888] text-base max-w-[600px] mx-auto">
              Jump directly to key trust and compliance resources.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group block border border-gray-200 dark:border-[#222] rounded-2xl bg-gray-50 dark:bg-[#0A0A0A] p-6 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200 relative"
              >
                {link.isTodo && (
                  <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#555] bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#333] px-2 py-0.5 rounded">
                    Soon
                  </span>
                )}
                <h3 className="font-medium text-gray-900 dark:text-[#EDEDED] text-base mb-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── POLICY DIRECTORY ── */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white mb-4">Policy Directory</h2>
            <p className="text-gray-600 dark:text-[#888] text-base max-w-[600px] mx-auto">
              {viewMode === 'plain'
                ? 'All of our policies, organized by topic. Click any policy to read the full text.'
                : 'Complete policy suite organized by governance domain. Each document is versioned, cross-referenced, and independently auditable.'}
            </p>
          </div>

          {categories.map((cat) => {
            const catPolicies = policiesByCategory[cat.name] || [];
            if (catPolicies.length === 0) return null;

            return (
              <div key={cat.name} className="mb-20 last:mb-0">
                <div className="mb-8">
                  <h3 className="text-xs font-mono text-gray-500 dark:text-[#555] uppercase tracking-widest mb-3">
                    {cat.name}
                  </h3>
                  <p className="text-gray-600 dark:text-[#888] text-base leading-relaxed max-w-[700px]">
                    {viewMode === 'plain' ? plainDescriptions[cat.name] : cat.description}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catPolicies
                    .filter((p) => p.number !== 34)
                    .map((policy) => (
                      <PolicyCard
                        key={policy.number}
                        number={policy.number}
                        title={policy.title}
                        slug={policy.id}
                        category={policy.category}
                        version={policy.version}
                        isNew={policy.isNew}
                        description={
                          policy.sections[0]?.content
                            ? policy.sections[0].content.slice(0, 120).replace(/\n/g, ' ').trim() + '…'
                            : undefined
                        }
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FOOTER NOTE ── */}
        <div className="border border-gray-200 dark:border-[#222] rounded-2xl bg-gray-50 dark:bg-[#0A0A0A] p-8 transition-colors duration-300">
          <h4 className="text-xs font-mono text-gray-500 dark:text-[#555] uppercase tracking-widest mb-4">
            Completeness Note
          </h4>
          <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed">
            Version 2.0 of the WEBSPACEAI Policy Suite introduces three new documents: Doc 38 (Multimodal & Generative‑AI Risk Policy), Doc 39 (Environmental Sustainability Policy), and Doc 40 (Training‑Data Provenance & Supply‑Chain Policy). These additions expand coverage to emerging risk domains. All 40 documents are cross‑referenced and available for review.
          </p>
          <div className="mt-4">
            <Link
              href="/trust/policies"
              className="text-sm font-medium text-gray-900 dark:text-[#EDEDED] hover:text-black dark:hover:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-500 dark:hover:decoration-[#888] transition-colors duration-200"
            >
              View full policy directory →
            </Link>
          </div>
        </div>

        {/* ── END MARKER ── */}
        <div className="mt-20 pt-8 pb-12 text-center text-gray-400 dark:text-[#444] text-[11px] font-mono uppercase tracking-widest flex flex-col items-center justify-center gap-3 border-t border-gray-200 dark:border-[#111]">
          <div className="flex items-center gap-2">
            <span>■</span> WEBSPACEAI Trust Center
          </div>
        </div>

      </div>
    </main>
  );
};

export default TrustCenterPage;
