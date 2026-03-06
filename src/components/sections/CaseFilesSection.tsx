'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePortfolioStore } from '@/lib/store';
import Section from '@/components/layout/Section';
import CaseFolder from '@/components/ui/CaseFolder';
import { caseFiles } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function CaseFilesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set('.case-folder', { opacity: 1, y: 0 });
        return;
      }

      gsap.from('.case-folder', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="case-files" depth={3}>
      <div ref={containerRef} className="max-w-6xl mx-auto px-4 tablet:px-6">
        <h2 className="font-serif text-gold text-2xl tablet:text-3xl desktop:text-4xl mb-8 tablet:mb-12">
          CASE FILES <span className="text-parchment/40">{'// '}</span>
          <span className="text-parchment/60">Investigation Archive</span>
        </h2>

        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
          {caseFiles.map((caseFile) => (
            <CaseFolder key={caseFile.id} caseFile={caseFile} />
          ))}
        </div>
      </div>
    </Section>
  );
}
