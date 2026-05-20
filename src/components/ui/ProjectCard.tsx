'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTilt } from '@/hooks/useTilt';
import { usePortfolioStore } from '@/lib/store';
import type { Project } from '@/data/types';

interface ProjectCardProps {
  project: Project;
  glowColor?: 'orange' | 'blue';
}

const statusStyles: Record<string, string> = {
  Published: 'bg-slate/15 text-slate-light',
  Deployed: 'bg-orange/15 text-orange',
  Prototype: 'bg-cream/5 text-cream/50',
  Completed: 'bg-cream/5 text-cream/50',
};

const glowStyles = {
  orange: 'hover:border-orange/50 hover:shadow-[0_0_25px_rgba(255,133,51,0.12)]',
  blue: 'hover:border-slate/50 hover:shadow-[0_0_25px_rgba(139,163,203,0.15)]',
};

export default function ProjectCard({ project, glowColor = 'orange' }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const { ref: tiltRef, style: tiltStyle, handlers: tiltHandlers } = useTilt({ maxAngle: 8 });
  const highlightsId = `project-highlights-${project.id}`;
  const expandTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div
      ref={reducedMotion ? undefined : (tiltRef as React.Ref<HTMLDivElement>)}
      style={reducedMotion ? undefined : tiltStyle}
      onMouseMove={reducedMotion ? undefined : tiltHandlers.onMouseMove}
      onMouseLeave={reducedMotion ? undefined : tiltHandlers.onMouseLeave}
      className={cn(
        'project-card group flex flex-col rounded-xl border border-cream/8 bg-base/30 p-5 backdrop-blur-sm mobile:p-6',
        'transition-all duration-300',
        glowStyles[glowColor]
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-heading text-base leading-snug text-cream transition-colors duration-300 group-hover:text-orange mobile:text-lg">
          {project.title}
        </h3>
        <span
          className={cn(
            'flex-shrink-0 rounded-full px-2.5 py-0.5 font-nav text-[10px] font-bold uppercase tracking-wider',
            statusStyles[project.status] ?? 'bg-cream/5 text-cream/50'
          )}
        >
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-cream/50">
        {project.description}
      </p>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <span key={metric} className="rounded-full border border-orange/20 bg-orange/5 px-3 py-1 font-nav text-[10px] text-orange/70 mobile:text-[11px]">
              {metric}
            </span>
          ))}
        </div>
      )}

      {/* Technologies */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span key={tech} className="rounded-full border border-cream/8 bg-cream/3 px-3 py-1 font-nav text-[10px] text-cream/45 mobile:text-[11px]">
            {tech}
          </span>
        ))}
      </div>

      {project.highlights.length > 0 && (
        <>
          <button
            type="button"
            className="mb-3 inline-flex items-center gap-2 self-start rounded-full border border-cream/10 bg-base/20 px-3 py-1.5 font-nav text-[10px] uppercase tracking-wider text-cream/55 transition-all duration-300 hover:border-orange/30 hover:text-orange mobile:text-[11px]"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            aria-controls={highlightsId}
          >
            <span>{isExpanded ? 'Hide highlights' : 'Show highlights'}</span>
            <svg
              className={cn('h-3 w-3 transition-transform duration-300', isExpanded && 'rotate-90')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id={highlightsId}
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                transition={expandTransition}
                className="overflow-hidden"
              >
                <ul className="mb-4 space-y-1.5 border-t border-cream/5 pt-3">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="relative pl-3 text-[11px] text-cream/50 before:absolute before:left-0 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-orange/40 mobile:text-xs">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Links */}
      {project.links && project.links.filter((l) => l.url).length > 0 && (
        <div className="flex flex-wrap gap-3 border-t border-cream/5 pt-3">
          {project.links
            .filter((link) => link.url)
            .map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-nav text-xs text-orange transition-all duration-300 hover:text-orange-muted hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/50 rounded"
              >
                {link.label} &rarr;
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
