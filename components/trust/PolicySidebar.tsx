import React, { useState } from 'react';
import Link from 'next/link';
import { PolicyCategory } from '../../lib/policyTypes';
import { getPolicyPath } from '../../constants/policies/slugs';
import { categories } from '../../constants/policies/categories';

interface SidebarPolicy {
  number: number;
  title: string;
  id: string;
  isNew: boolean;
  category: PolicyCategory;
}

interface PolicySidebarProps {
  policies: SidebarPolicy[];
  currentSlug?: string;
}

/**
 * Category-grouped sidebar navigation for the Trust Center.
 * Policies are grouped by their category with collapsible sections.
 * Current page is highlighted. Sticky on desktop, hidden on mobile.
 */
export const PolicySidebar: React.FC<PolicySidebarProps> = ({
  policies,
  currentSlug,
}) => {
  // Group policies by category using the canonical category ordering
  const grouped = categories
    .map((cat) => ({
      name: cat.name,
      policies: policies.filter((p) => p.category === cat.name),
    }))
    .filter((g) => g.policies.length > 0);

  return (
    <aside
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto
        w-72 flex-shrink-0 pr-2
        scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-[#333]
        scrollbar-track-transparent"
    >
      <nav aria-label="Policy navigation">
        <div className="space-y-6">
          {grouped.map((group) => (
            <CategoryGroup
              key={group.name}
              name={group.name}
              policies={group.policies}
              currentSlug={currentSlug}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
};

const CategoryGroup: React.FC<{
  name: PolicyCategory;
  policies: SidebarPolicy[];
  currentSlug?: string;
}> = ({ name, policies, currentSlug }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left group mb-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-[#555] group-hover:text-gray-700 dark:group-hover:text-[#888] transition-colors duration-200">
          {name}
        </span>
        <span
          className={`text-gray-400 dark:text-[#555] text-xs transition-transform duration-200 ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <ul className="space-y-0.5">
          {policies.map((policy) => {
            const isCurrent = currentSlug === policy.id;
            return (
              <li key={policy.number}>
                <Link
                  href={getPolicyPath(policy.number)}
                  className={`block text-[13px] py-1.5 rounded-lg transition-colors duration-200 leading-snug ${
                    isCurrent
                      ? 'text-black dark:text-white bg-gray-100 dark:bg-[#111] border-l-2 border-black dark:border-white pl-2.5 pr-3'
                      : 'text-gray-600 dark:text-[#888] hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#0A0A0A] pl-3 pr-3'
                  }`}
                >
                  <span className="font-mono text-[11px] text-gray-400 dark:text-[#555] mr-1.5">
                    {String(policy.number).padStart(2, '0')}
                  </span>
                  {policy.title}
                  {policy.isNew && (
                    <span
                      className="ml-1.5 inline-flex items-center px-1.5 py-0 rounded
                        bg-emerald-100 dark:bg-emerald-900/30
                        text-emerald-800 dark:text-emerald-300
                        border border-emerald-200 dark:border-emerald-800/50
                        text-[9px] font-mono uppercase tracking-widest font-bold
                        align-middle"
                    >
                      New
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PolicySidebar;
