'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { usePortfolioStore } from '@/lib/store';
import type { Experience } from '@/data/types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const isCurrent = experience.status === 'Current';

  const expandTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div
      className={cn(
        'experience-card group rounded-xl border bg-base/30 backdrop-blur-sm transition-all duration-300',
        isCurrent
          ? 'border-orange/20 hover:border-orange/50 hover:shadow-[0_0_30px_rgba(255,133,51,0.12)]'
          : 'border-cream/8 hover:border-slate/50 hover:shadow-[0_0_25px_rgba(139,163,203,0.12)]'
      )}
    >
      <button
        type="button"
        className="w-full cursor-pointer rounded-xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/50 focus-visible:ring-inset mobile:p-5 tablet:p-6"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={`${experience.organization} - ${experience.role}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="truncate font-heading text-xl font-bold text-cream">
              {experience.organization}
            </h3>
            <span className="whitespace-nowrap font-nav text-[13px] text-slate/80 mobile:text-sm tablet:text-[15px]">
              {experience.location}
            </span>
          </div>
          <span
            className={cn(
              'flex-shrink-0 rounded-full px-3 py-1 text-right font-nav text-xs font-bold uppercase tracking-wider backdrop-blur-sm',
              isCurrent
                ? 'bg-orange/15 text-orange'
                : 'bg-slate/15 text-slate-light'
            )}
          >
            {experience.status}
          </span>
        </div>
        <p className="mt-1.5 font-nav text-base text-slate-light">
          {experience.role}
        </p>

        {/* Tech preview */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {experience.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="rounded-full border border-cream/10 bg-base/30 backdrop-blur-sm px-2 py-1 font-nav text-[10px] text-cream/60 mobile:px-2.5 mobile:text-xs">
              {tech}
            </span>
          ))}
          {experience.technologies.length > 5 && (
            <span className="rounded-full border border-cream/10 bg-base/30 backdrop-blur-sm px-2 py-1 font-nav text-[10px] text-cream/40 mobile:px-2.5 mobile:text-xs">
              +{experience.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Expand indicator */}
        <div className="mt-3 flex items-center gap-1.5">
          <svg
            className={cn('h-3 w-3 text-cream/30 transition-transform duration-300', isExpanded && 'rotate-90')}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-nav text-[10px] text-cream/30">
            {isExpanded ? 'collapse' : 'view details'}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={expandTransition}
            className="overflow-hidden"
          >
            <div className="border-t border-cream/5 px-4 pb-4 pt-4 mobile:px-5 mobile:pb-5 tablet:px-6 tablet:pb-6">
              <div className="mb-4 flex flex-wrap gap-1.5">
                {experience.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-slate/30 bg-slate/10 px-2.5 py-0.5 font-nav text-[10px] text-slate-light mobile:text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-2.5">
                {experience.highlights.map((highlight, i) => (
                  <li key={i} className="relative pl-4 text-sm leading-relaxed text-cream/60 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-orange/50">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
