'use client';

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
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const { ref: tiltRef, style: tiltStyle, handlers: tiltHandlers } = useTilt({ maxAngle: 8 });

  return (
    <div
      ref={reducedMotion ? undefined : (tiltRef as React.Ref<HTMLDivElement>)}
      style={reducedMotion ? undefined : tiltStyle}
      onMouseMove={reducedMotion ? undefined : tiltHandlers.onMouseMove}
      onMouseLeave={reducedMotion ? undefined : tiltHandlers.onMouseLeave}
      className={cn(
        'project-card group flex flex-col rounded-xl border border-cream/8 bg-base/30 backdrop-blur-sm p-6',
        'transition-all duration-300',
        glowStyles[glowColor]
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg text-cream leading-snug group-hover:text-orange transition-colors duration-300">
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
            <span key={metric} className="rounded-full border border-orange/20 bg-orange/5 px-3 py-1 font-nav text-[11px] text-orange/70">
              {metric}
            </span>
          ))}
        </div>
      )}

      {/* Technologies */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span key={tech} className="rounded-full border border-cream/8 bg-cream/3 px-3 py-1 font-nav text-[11px] text-cream/45">
            {tech}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <ul className="mb-4 space-y-1.5 border-t border-cream/5 pt-3">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="relative pl-3 text-xs text-cream/50 before:absolute before:left-0 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-orange/40">
            {highlight}
          </li>
        ))}
      </ul>

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
