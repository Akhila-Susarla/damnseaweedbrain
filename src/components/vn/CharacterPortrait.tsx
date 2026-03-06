'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePortfolioStore } from '@/lib/store';
import type { DazaiExpression } from '@/data/types';

interface CharacterPortraitProps {
  expression: DazaiExpression;
  className?: string;
}

/** SVG expression layers keyed by expression name */
const expressionLayers: Record<DazaiExpression, React.ReactNode> = {
  neutral: (
    <g key="neutral">
      {/* Eyes: calm, open */}
      <ellipse cx="38" cy="52" rx="3" ry="2" fill="#c4b8a8" opacity="0.9" />
      <ellipse cx="58" cy="52" rx="3" ry="2" fill="#c4b8a8" opacity="0.9" />
      {/* Mouth: straight line */}
      <line x1="42" y1="68" x2="54" y2="68" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* Brows: relaxed */}
      <line x1="34" y1="46" x2="42" y2="45" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="54" y1="45" x2="62" y2="46" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </g>
  ),
  smirk: (
    <g key="smirk">
      {/* Eyes: one narrowed */}
      <ellipse cx="38" cy="52" rx="3" ry="1.2" fill="#c4b8a8" opacity="0.9" />
      <ellipse cx="58" cy="52" rx="3" ry="2" fill="#c4b8a8" opacity="0.9" />
      {/* Mouth: one side up */}
      <path d="M42 68 Q48 68 54 65" stroke="#c4b8a8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Brows: one raised */}
      <line x1="34" y1="46" x2="42" y2="45" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="54" y1="43" x2="62" y2="45" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </g>
  ),
  laugh: (
    <g key="laugh">
      {/* Eyes: squinting/closed */}
      <path d="M35 52 Q38 50 41 52" stroke="#c4b8a8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M55 52 Q58 50 61 52" stroke="#c4b8a8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.9" />
      {/* Mouth: wide smile */}
      <path d="M40 66 Q48 73 56 66" stroke="#c4b8a8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Brows: raised */}
      <line x1="34" y1="44" x2="42" y2="43" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="54" y1="43" x2="62" y2="44" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </g>
  ),
  serious: (
    <g key="serious">
      {/* Eyes: sharp, narrow */}
      <ellipse cx="38" cy="52" rx="3.5" ry="1.5" fill="#c4b8a8" opacity="0.95" />
      <ellipse cx="58" cy="52" rx="3.5" ry="1.5" fill="#c4b8a8" opacity="0.95" />
      {/* Mouth: slight frown */}
      <path d="M42 69 Q48 67 54 69" stroke="#c4b8a8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Brows: level, intense */}
      <line x1="33" y1="46" x2="42" y2="46" stroke="#c4b8a8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="54" y1="46" x2="63" y2="46" stroke="#c4b8a8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </g>
  ),
  annoyed: (
    <g key="annoyed">
      {/* Eyes: narrowed */}
      <ellipse cx="38" cy="52" rx="3" ry="1" fill="#c4b8a8" opacity="0.9" />
      <ellipse cx="58" cy="52" rx="3" ry="1.3" fill="#c4b8a8" opacity="0.9" />
      {/* Mouth: slight frown */}
      <path d="M42 69 Q48 66 54 69" stroke="#c4b8a8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Brows: one raised, irritated */}
      <line x1="34" y1="45" x2="42" y2="47" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="54" y1="43" x2="62" y2="46" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </g>
  ),
  mysterious: (
    <g key="mysterious">
      {/* Eyes: half-lidded */}
      <ellipse cx="38" cy="52" rx="3" ry="1.3" fill="#c4b8a8" opacity="0.8" />
      <ellipse cx="58" cy="52" rx="3" ry="1.3" fill="#c4b8a8" opacity="0.8" />
      {/* Mouth: subtle smile */}
      <path d="M43 68 Q48 70 53 68" stroke="#c4b8a8" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Brows: level, calm */}
      <line x1="34" y1="46" x2="42" y2="45.5" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="54" y1="45.5" x2="62" y2="46" stroke="#c4b8a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </g>
  ),
};

export default function CharacterPortrait({ expression, className = '' }: CharacterPortraitProps) {
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  return (
    <div
      className={`w-20 h-32 md:w-28 md:h-40 flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 96 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Base: dark silhouette figure */}
        <defs>
          <linearGradient id="coat-gradient" x1="48" y1="40" x2="48" y2="128" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0a0e1a" />
          </linearGradient>
        </defs>

        {/* Hair */}
        <ellipse cx="48" cy="30" rx="22" ry="18" fill="#1a1a2e" />
        {/* Hair fringe details */}
        <path d="M28 28 Q35 18 48 22 Q55 15 68 28" fill="#111827" />

        {/* Head */}
        <ellipse cx="48" cy="38" rx="16" ry="20" fill="#1e1e32" />

        {/* Bandage across right eye (Dazai signature) */}
        <rect x="30" y="48" width="22" height="5" rx="2" fill="#c4b8a8" opacity="0.2" transform="rotate(-8, 41, 50)" />
        <line x1="31" y1="50" x2="51" y2="47" stroke="#c4b8a8" strokeWidth="0.5" opacity="0.15" />

        {/* Coat / body silhouette */}
        <path
          d="M30 58 L24 128 L72 128 L66 58 Q58 54 48 54 Q38 54 30 58Z"
          fill="url(#coat-gradient)"
        />
        {/* Coat collar detail */}
        <path d="M36 58 L48 68 L60 58" stroke="#c4b8a8" strokeWidth="0.8" fill="none" opacity="0.15" />

        {/* Expression layers with animated transitions */}
        <AnimatePresence mode="wait">
          {reducedMotion ? (
            expressionLayers[expression]
          ) : (
            <motion.g
              key={expression}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {expressionLayers[expression]}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
