import React, { ReactNode } from 'react';
import Link from 'next/link';
import { getPolicyPath } from '../../constants/policies/slugs';
import { FixBadge } from './FixBadge';

interface PolicySectionProps {
  heading: string;
  content: string;
  id?: string;
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
 * Process raw content string into React elements:
 * - Cross-references: (Doc. N) → linked Doc. N
 * - Fix badges: **[FIX — ...]** → FixBadge component
 * - Bold text: **text** → <strong>
 * - List items: lines starting with "- " → <li>
 * - Paragraph breaks: double newlines → <p>
 */
function processContent(content: string): ReactNode[] {
  // Split content into paragraphs first
  const paragraphs = content.split(/\n\n+/);
  const elements: ReactNode[] = [];

  paragraphs.forEach((paragraph, pIdx) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return;

    // Check if this paragraph is a list block (consecutive lines starting with -)
    const lines = trimmed.split('\n');
    const isListBlock = lines.every(
      (line) => line.trim().startsWith('- ') || line.trim() === ''
    );

    if (isListBlock) {
      const listItems = lines
        .filter((line) => line.trim().startsWith('- '))
        .map((line, i) => (
          <li
            key={`${pIdx}-li-${i}`}
            className="flex items-start gap-3 text-sm text-gray-700 dark:text-[#AAA] leading-relaxed"
          >
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-[#444] flex-shrink-0" />
            <span>{processInline(line.trim().slice(2))}</span>
          </li>
        ));

      elements.push(
        <ul key={`p-${pIdx}`} className="space-y-2 my-3">
          {listItems}
        </ul>
      );
    } else {
      elements.push(
        <p
          key={`p-${pIdx}`}
          className="text-sm text-gray-700 dark:text-[#AAA] leading-relaxed mb-4 last:mb-0"
        >
          {processInline(trimmed)}
        </p>
      );
    }
  });

  return elements;
}

/**
 * Process inline formatting within a text string.
 * Returns an array of React nodes (strings and elements).
 */
function processInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let keyCounter = 0;

  while (remaining.length > 0) {
    // Find the earliest match among our patterns
    const patterns: Array<{
      regex: RegExp;
      handler: (match: RegExpExecArray) => ReactNode;
    }> = [
      {
        // **[FIX — ...]** → FixBadge
        regex: /\*\*\[FIX\s*[—–-]\s*(.+?)\]\*\*/i,
        handler: (match) => (
          <FixBadge key={`fix-${keyCounter++}`} text={match[0].replace(/\*\*/g, '')} />
        ),
      },
      {
        // (Doc. N) → Link
        regex: /\(Doc\.\s*(\d+)\)/,
        handler: (match) => {
          const docNum = parseInt(match[1], 10);
          return (
            <Link
              key={`docref-${keyCounter++}`}
              href={getPolicyPath(docNum)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Doc.&nbsp;{docNum}
            </Link>
          );
        },
      },
      {
        // **bold text**
        regex: /\*\*(.+?)\*\*/,
        handler: (match) => (
          <strong
            key={`bold-${keyCounter++}`}
            className="font-semibold text-gray-900 dark:text-[#EDEDED]"
          >
            {match[1]}
          </strong>
        ),
      },
    ];

    let earliestIndex = Infinity;
    let earliestMatch: RegExpExecArray | null = null;
    let earliestHandler: ((match: RegExpExecArray) => ReactNode) | null = null;

    for (const { regex, handler } of patterns) {
      const match = regex.exec(remaining);
      if (match && match.index < earliestIndex) {
        earliestIndex = match.index;
        earliestMatch = match;
        earliestHandler = handler;
      }
    }

    if (earliestMatch && earliestHandler) {
      // Push text before the match
      if (earliestIndex > 0) {
        nodes.push(remaining.slice(0, earliestIndex));
      }
      // Push the matched element
      nodes.push(earliestHandler(earliestMatch));
      // Continue with the rest
      remaining = remaining.slice(earliestIndex + earliestMatch[0].length);
    } else {
      // No more matches — push remaining text and break
      nodes.push(remaining);
      break;
    }
  }

  return nodes;
}

/**
 * Renders a single policy section with heading and processed content.
 * Supports anchor linking, cross-references, fix badges, and markdown-like formatting.
 */
export const PolicySectionBlock: React.FC<PolicySectionProps> = ({
  heading,
  content,
  id,
}) => {
  const anchorId = id || headingToId(heading);

  return (
    <section
      id={anchorId}
      className="scroll-mt-24 mb-10 pl-6 border-l-2 border-gray-200 dark:border-[#222]
        hover:border-gray-400 dark:hover:border-[#444] transition-colors duration-200"
    >
      <h2
        className="text-xl font-semibold text-black dark:text-white mb-4"
      >
        <a
          href={`#${anchorId}`}
          className="hover:underline decoration-gray-300 dark:decoration-[#444] underline-offset-4"
        >
          {heading}
        </a>
      </h2>

      <div>{processContent(content)}</div>
    </section>
  );
};

export default PolicySectionBlock;
