'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePortfolioStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import StampBadge from '@/components/ui/StampBadge';
import type { IntelDossier as IntelDossierType } from '@/data/types';

gsap.registerPlugin(ScrollTrigger);

interface IntelDossierProps {
  dossier: IntelDossierType;
  className?: string;
}

export default function IntelDossier({ dossier, className }: IntelDossierProps) {
  const dossierRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const isClassified = dossier.status === 'Classified';

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set('.redaction-bar', { opacity: 0 });
        return;
      }

      gsap.to('.redaction-bar', {
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: dossierRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: dossierRef, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={dossierRef}
      className={cn(
        'intel-dossier relative bg-midnight/60 rounded p-5 tablet:p-8',
        'opacity-0 -translate-x-8',
        isClassified
          ? 'border border-classified-red/40'
          : 'border border-parchment/20',
        className
      )}
    >
      {/* Stamp badge */}
      <div className="absolute top-3 right-3">
        <StampBadge
          status={dossier.status}
          className={isClassified ? '' : 'opacity-50'}
        />
      </div>

      {/* Header */}
      <h3 className="font-serif text-parchment text-lg pr-24">
        {dossier.organization}
      </h3>
      <p className="font-mono text-parchment/70 text-sm mt-1">{dossier.role}</p>
      <p className="font-mono text-parchment/40 text-xs mt-0.5">{dossier.period}</p>

      {/* Highlights with redaction overlay */}
      <ul className="mt-4 space-y-2">
        {dossier.highlights.map((highlight, i) => {
          const showRedaction = isClassified || i < 2;
          return (
            <li key={i} className="relative text-sm text-parchment/80 font-mono leading-relaxed">
              <span>{highlight}</span>
              {showRedaction && (
                <span
                  className={cn(
                    'redaction-bar absolute inset-0',
                    isClassified ? 'bg-black' : 'bg-black/60'
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ul>

      {/* Technologies */}
      <div className="mt-4 flex flex-wrap gap-2">
        {dossier.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono px-2 py-0.5 border border-parchment/20 text-parchment/60 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
