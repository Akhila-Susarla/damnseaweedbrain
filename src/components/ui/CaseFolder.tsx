'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { usePortfolioStore } from '@/lib/store';
import type { CaseFile } from '@/data/types';
import StampBadge from './StampBadge';

interface CaseFolderProps {
  caseFile: CaseFile;
}

export default function CaseFolder({ caseFile }: CaseFolderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  const springTransition = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 200, damping: 25 };

  const expandTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div
      className={cn(
        'case-folder relative bg-midnight/60 border border-parchment/15 rounded-lg overflow-hidden',
        'opacity-0 translate-y-8'
      )}
    >
      {/* Folder cover */}
      <motion.div
        animate={{ rotateX: isOpen ? -120 : 0 }}
        transition={springTransition}
        style={{ transformOrigin: 'top', perspective: 800 }}
      >
        <button
          type="button"
          className={cn(
            'relative w-full text-left p-5 cursor-pointer',
            'focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none',
            'texture-paper'
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={`Case file: ${caseFile.title}`}
        >
          {/* Case ID */}
          <span className="block font-mono text-parchment/40 text-xs mb-1">
            {caseFile.id.toUpperCase()}
          </span>

          {/* Title */}
          <h3 className="font-serif text-parchment text-lg leading-snug pr-24">
            {caseFile.title}
          </h3>

          {/* Stamp badge positioned top-right */}
          <StampBadge
            status={caseFile.status}
            className="absolute top-4 right-4 rotate-[3deg]"
          />
        </button>
      </motion.div>

      {/* Expanded details */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={expandTransition}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 space-y-4 border-t border-parchment/10">
              {/* Description */}
              <p className="text-parchment/70 text-sm leading-relaxed pt-4">
                {caseFile.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {caseFile.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex font-mono text-xs bg-parchment/10 text-parchment/60 rounded-full px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-1.5 list-none">
                {caseFile.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-parchment/60 text-sm pl-4 relative before:content-['\u25B8'] before:absolute before:left-0 before:text-gold/50"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Links */}
              {caseFile.links && caseFile.links.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {caseFile.links
                    .filter((link) => link.url)
                    .map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold text-sm hover:underline focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none rounded"
                      >
                        {link.label}
                      </a>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
