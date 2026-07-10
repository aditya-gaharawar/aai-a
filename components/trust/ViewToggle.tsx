import React from 'react';

interface ViewToggleProps {
  mode: 'plain' | 'technical';
  onToggle: (mode: 'plain' | 'technical') => void;
}

/**
 * Plain-language / Technical toggle for the Trust Center landing page.
 * Matches the SafetyPage segmented control style.
 */
export const ViewToggle: React.FC<ViewToggleProps> = ({ mode, onToggle }) => {
  return (
    <div
      className="inline-flex p-1 bg-gray-100 dark:bg-[#050505]
        border border-gray-200 dark:border-[#222]
        rounded-xl dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
    >
      <ToggleButton
        label="Plain Language"
        isActive={mode === 'plain'}
        onClick={() => onToggle('plain')}
      />
      <ToggleButton
        label="Technical / Legal"
        isActive={mode === 'technical'}
        onClick={() => onToggle('technical')}
      />
    </div>
  );
};

const ToggleButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none ${
      isActive
        ? 'text-black dark:text-[#EDEDED] bg-white dark:bg-gradient-to-b dark:from-[#2a2a2a] dark:to-[#1a1a1a] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-[#444]'
        : 'text-gray-500 dark:text-[#666] hover:text-gray-900 dark:hover:text-[#AAA] border border-transparent hover:bg-white/50 dark:hover:bg-[#111]'
    }`}
  >
    {label}
  </button>
);

export default ViewToggle;
