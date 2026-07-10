import React from 'react';

interface PolicyTableOfContentsProps {
  sections: Array<{ heading: string }>;
}

/** Convert a heading string to a URL-safe anchor id */
function headingToId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * In-page jump nav rendered as a compact card.
 * Lists all section headings as anchor links.
 */
export const PolicyTableOfContents: React.FC<PolicyTableOfContentsProps> = ({ sections }) => {
  if (!sections || sections.length === 0) return null;

  return (
    <nav
      className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222]
        rounded-xl p-6 transition-colors duration-200"
      aria-label="Table of contents"
    >
      <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#555] mb-4">
        On this page
      </h2>

      <ul className="space-y-2">
        {sections.map((section) => {
          const id = headingToId(section.heading);
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update URL hash without jumping
                    window.history.replaceState(null, '', `#${id}`);
                  }
                }}
                className="block text-sm text-gray-600 dark:text-[#888]
                  hover:text-black dark:hover:text-white
                  transition-colors duration-200 leading-relaxed"
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PolicyTableOfContents;
