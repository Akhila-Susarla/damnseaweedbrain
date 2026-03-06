'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePortfolioStore } from '@/lib/store';
import Section from '@/components/layout/Section';
import IntelDossier from '@/components/ui/IntelDossier';
import { intelDossiers } from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function IntelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set('.intel-dossier', { opacity: 1, x: 0 });
        if (lineRef.current) {
          gsap.set(lineRef.current, { scaleY: 1 });
        }
        return;
      }

      // Staggered slide-in for dossiers
      gsap.from('.intel-dossier', {
        x: -30,
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

      // Animate connecting line height via scrub
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="intel" depth={3}>
      <div ref={containerRef} className="max-w-4xl mx-auto px-4 tablet:px-6">
        <h2 className="font-serif text-gold text-2xl tablet:text-3xl desktop:text-4xl mb-8 tablet:mb-12">
          INTEL <span className="text-parchment/40">{'// '}</span>
          <span className="text-parchment/60">Mission Dossiers</span>
        </h2>

        {/* Timeline container */}
        <div className="relative pl-10 tablet:pl-14">
          {/* Connecting line */}
          <div
            ref={lineRef}
            className="timeline-line absolute left-4 tablet:left-8 top-0 bottom-0 w-px bg-parchment/20"
          />

          {/* Dossier entries */}
          <div className="space-y-8">
            {intelDossiers.map((dossier) => (
              <div key={dossier.id} className="relative">
                {/* Timeline node */}
                <div className="timeline-node absolute -left-10 tablet:-left-14 top-6 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gold border-2 border-midnight" />
                </div>

                <IntelDossier dossier={dossier} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
