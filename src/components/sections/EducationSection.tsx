'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Section from '@/components/layout/Section';
import { cn } from '@/lib/utils';
import { education } from '@/data/education';
import { usePortfolioStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      const entries = gsap.utils.toArray<HTMLElement>('.education-entry');
      if (!entries.length) return;
      gsap.set(entries, { opacity: 1, y: 0 });
      if (reducedMotion) return;
      gsap.fromTo(entries,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="education" depth={2}>
      <div ref={containerRef} className="mx-auto max-w-4xl px-4 tablet:px-6">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-heading text-3xl text-cream tablet:text-4xl desktop:text-5xl">Education</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate/20 to-transparent" />
        </div>

        <div className="space-y-5">
          {education.map((entry) => {
            const isInProgress = entry.status === 'In Progress';
            return (
              <div
                key={entry.institution}
                className={cn(
                  'education-entry rounded-xl border border-cream/8 bg-base/30 backdrop-blur-sm p-6 transition-all duration-300 tablet:p-8',
                  isInProgress
                    ? 'hover:border-orange/50 hover:shadow-[0_0_25px_rgba(255,133,51,0.12)]'
                    : 'hover:border-slate/50 hover:shadow-[0_0_25px_rgba(139,163,203,0.15)]'
                )}
              >
                <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-cream tablet:text-2xl">
                      {entry.institution}
                    </h3>
                    <p className="mt-1.5 text-base text-cream/70">{entry.degree}</p>
                    <p className="mt-0.5 font-nav text-xs text-cream/40">{entry.location}</p>
                  </div>

                  <div className="flex items-center gap-3 tablet:flex-col tablet:items-end tablet:gap-2">
                    <p className="font-nav text-xs text-cream/40">{entry.period}</p>
                    {entry.gpa && (
                      <span className="rounded-full bg-orange/10 px-4 py-1 font-heading text-lg font-bold text-orange">
                        {entry.gpa}
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-nav text-[10px] font-bold uppercase tracking-wider ${
                        isInProgress ? 'bg-slate/15 text-slate-light' : 'bg-cream/5 text-cream/40'
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>
                </div>

                {entry.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1.5 border-t border-cream/5 pt-4">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="relative pl-3 text-sm text-cream/55 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-orange/40">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
