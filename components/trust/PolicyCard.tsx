import React from 'react';
import Link from 'next/link';
import { PolicyCategory } from '../../lib/policyTypes';

interface PolicyCardProps {
  number: number;
  title: string;
  slug: string;
  category: PolicyCategory;
  version: string;
  isNew: boolean;
  description?: string;
}

/** Category → badge color mapping */
const categoryColors: Record<PolicyCategory, string> = {
  'Legal':
    'bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-800/50',
  'AI Safety & Trust and Safety':
    'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
  'Governance & Evaluation':
    'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800/50',
  'Trust Center & Compliance':
    'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800/50',
};

/**
 * Card component for the Trust Center directory listing.
 * Shows policy number, title, category badge, version, and optional description.
 * Links to the full policy page.
 */
export const PolicyCard: React.FC<PolicyCardProps> = ({
  number,
  title,
  slug,
  category,
  version,
  isNew,
  description,
}) => {
  return (
    <Link
      href={`/trust/policies/${slug}`}
      className="group block border border-gray-200 dark:border-[#222] rounded-xl
        bg-gray-50 dark:bg-[#0A0A0A]
        hover:bg-gray-100 dark:hover:bg-[#111]
        transition-colors duration-200 p-6 relative overflow-hidden"
    >
      {/* Subtle doc number watermark */}
      <span
        className="absolute top-3 right-4 text-[40px] font-black leading-none
          text-gray-100 dark:text-[#111] select-none pointer-events-none
          transition-colors duration-200 group-hover:text-gray-200 dark:group-hover:text-[#1a1a1a]"
        aria-hidden="true"
      >
        {String(number).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        {/* Top row: badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md border
              text-[10px] font-mono uppercase tracking-widest ${categoryColors[category]}`}
          >
            {category}
          </span>

          {isNew && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-md
                bg-emerald-100 dark:bg-emerald-900/30
                text-emerald-800 dark:text-emerald-300
                border border-emerald-200 dark:border-emerald-800/50
                text-[10px] font-mono uppercase tracking-widest font-bold"
            >
              New
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#EDEDED] mb-1.5 leading-snug
          group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 dark:text-[#888] leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Footer: version */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-[#222]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#555]">
            v{version}
          </span>
          <span className="ml-auto text-gray-400 dark:text-[#555] text-xs
            group-hover:text-gray-600 dark:group-hover:text-[#888]
            transition-colors duration-200">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PolicyCard;
