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
        <div className="mb-10 flex items-center gap-4">
          <h2 className="font-heading text-2xl text-cream mobile:text-3xl tablet:text-4xl desktop:text-5xl">Education</h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-slate/20 to-transparent mobile:block" />
        </div>

        <div className="space-y-4 mobile:space-y-5">
          {education.map((entry) => {
            const isUtd = entry.institution === 'The University of Texas at Dallas';
            const accentClass = isUtd
              ? 'hover:border-orange/50 hover:shadow-[0_0_25px_rgba(255,133,51,0.12)]'
              : 'hover:border-slate/50 hover:shadow-[0_0_25px_rgba(139,163,203,0.15)]';
            const highlightDotClass = isUtd ? 'before:bg-orange/40' : 'before:bg-slate-light/50';
            const statusClass = isUtd
              ? 'bg-slate/15 text-slate-light'
              : 'bg-cream/5 text-cream/40';
            return (
              <div
                key={entry.institution}
                className={cn(
                  'education-entry rounded-xl border border-cream/8 bg-base/30 p-5 backdrop-blur-sm transition-all duration-300 mobile:p-6 tablet:p-8',
                  accentClass
                )}
              >
                <div className="tablet:hidden">
                  <h3 className="font-heading text-lg font-bold leading-tight text-cream mobile:text-xl">
                    {entry.institution}
                  </h3>
                  <p className="mt-1 text-sm text-cream/70 mobile:text-base">{entry.degree}</p>
                  <p className="mt-0.5 font-nav text-xs text-cream/40">{entry.location}</p>
                  <p className="mt-1.5 font-nav text-xs text-cream/40">{entry.period}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    {entry.gpa && (
                      <span
                        className={cn(
                          'rounded-full bg-orange/10 px-4 py-1 font-heading text-base font-bold text-orange mobile:text-lg'
                        )}
                      >
                        {entry.gpa}
                      </span>
                    )}
                    <span
                      className={cn('ml-auto rounded-full px-2.5 py-0.5 font-nav text-[10px] font-bold uppercase tracking-wider', statusClass)}
                    >
                      {entry.status}
                    </span>
                  </div>
                </div>

                <div className="hidden flex-col gap-4 tablet:flex tablet:flex-row tablet:items-start tablet:justify-between">
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold text-cream mobile:text-xl tablet:text-2xl">
                      {entry.institution}
                    </h3>
                    <p className="mt-1.5 text-sm text-cream/70 mobile:text-base">{entry.degree}</p>
                    <p className="mt-0.5 font-nav text-xs text-cream/40">{entry.location}</p>
                  </div>

                  <div className="flex items-center gap-3 tablet:flex-col tablet:items-end tablet:gap-2">
                    <p className="font-nav text-xs text-cream/40">{entry.period}</p>
                    {entry.gpa && (
                      <span
                        className={cn(
                          'rounded-full bg-orange/10 px-4 py-1 font-heading text-base font-bold text-orange mobile:text-lg'
                        )}
                      >
                        {entry.gpa}
                      </span>
                    )}
                    <span
                      className={cn('rounded-full px-2.5 py-0.5 font-nav text-[10px] font-bold uppercase tracking-wider', statusClass)}
                    >
                      {entry.status}
                    </span>
                  </div>
                </div>

                {entry.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1.5 border-t border-cream/5 pt-4">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className={cn('relative pl-3 text-[13px] text-cream/55 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full mobile:text-sm', highlightDotClass)}>
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
