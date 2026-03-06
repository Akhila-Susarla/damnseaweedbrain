'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { Skill } from '@/data/types';

const tierColors: Record<string, string> = {
  S: 'text-gold',
  A: 'text-teal',
  B: 'text-parchment/80',
  C: 'text-parchment/50',
};

interface AbilityCardProps {
  skill: Skill;
  className?: string;
}

export default function AbilityCard({ skill, className }: AbilityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const toggle = () => setIsExpanded((prev) => !prev);

  const transitionConfig = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: 'easeOut' as const };

  return (
    <button
      type="button"
      className={cn(
        'ability-card flex w-full flex-col rounded-lg border border-parchment/15 bg-midnight/60 p-4 text-left',
        'opacity-0 translate-y-5',
        'hover:border-parchment/30 transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
        className
      )}
      aria-expanded={isExpanded}
      aria-label={`${skill.name} - ${skill.tier} tier ability`}
      onClick={toggle}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="block font-sans text-sm font-medium text-parchment">
            {skill.name}
          </span>
          {skill.kanjiName && (
            <span className="block font-mono text-xs text-parchment/40">
              {skill.kanjiName}
            </span>
          )}
        </div>
        <span
          className={cn(
            'flex-shrink-0 font-serif text-2xl font-bold leading-none',
            tierColors[skill.tier] ?? 'text-parchment/50'
          )}
        >
          {skill.tier}
        </span>
      </div>

      <AnimatePresence>
        {isExpanded && skill.description && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={transitionConfig}
            className="overflow-hidden"
          >
            <p className="mt-2 font-sans text-xs text-parchment/60">
              {skill.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
