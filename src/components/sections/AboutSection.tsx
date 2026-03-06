'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/layout/Section';
import { education } from '@/data/education';
import { usePortfolioStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      const fields = gsap.utils.toArray<HTMLElement>('.dossier-field');
      if (!fields.length) return;

      if (reducedMotion) {
        gsap.set(fields, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(fields, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
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

  // Separate achievements vs leadership from highlights
  const achievements = education.flatMap((e) =>
    e.highlights.filter(
      (h) =>
        h.toLowerCase().includes('award') ||
        h.toLowerCase().includes('recipient') ||
        h.toLowerCase().includes('hackathon') ||
        h.toLowerCase().includes('organizer')
    )
  );

  const leadership = education.flatMap((e) =>
    e.highlights.filter(
      (h) =>
        h.toLowerCase().includes('board') ||
        h.toLowerCase().includes('member') ||
        h.toLowerCase().includes('chapter') ||
        h.toLowerCase().includes('leader')
    )
  );

  return (
    <Section id="about" depth={2}>
      <div ref={containerRef} className="mx-auto max-w-[800px] px-4">
        <h2 className="mb-8 font-serif text-2xl tracking-wide text-gold tablet:text-3xl">
          DOSSIER // Origin Story
        </h2>

        <div className="texture-paper texture-aged-edge rounded border border-parchment/20 bg-midnight/80 p-6 tablet:p-8 desktop:p-10">
          {/* CODENAME */}
          <div className="dossier-field mb-6 opacity-0 translate-y-8">
            <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-parchment/60">
              Codename
            </h3>
            <p className="font-mono text-lg text-parchment">
              damnseaweedbrain
            </p>
          </div>

          {/* ORIGIN */}
          <div className="dossier-field mb-6 opacity-0 translate-y-8">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-parchment/60">
              Origin
            </h3>
            <div className="space-y-4">
              {education.map((entry) => (
                <div key={entry.institution}>
                  <p className="font-serif text-base text-parchment">
                    {entry.institution}
                  </p>
                  <p className="text-sm text-parchment/80">
                    {entry.degree}
                    {entry.gpa && (
                      <span className="ml-2 text-gold">({entry.gpa})</span>
                    )}
                  </p>
                  <p className="font-mono text-xs text-parchment/60">
                    {entry.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* KNOWN ABILITIES */}
          {achievements.length > 0 && (
            <div className="dossier-field mb-6 opacity-0 translate-y-8">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-parchment/60">
                Known Abilities
              </h3>
              <ul className="space-y-1">
                {achievements.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm text-parchment/80"
                  >
                    &mdash; {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* BACKGROUND */}
          {leadership.length > 0 && (
            <div className="dossier-field mb-2 opacity-0 translate-y-8">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-parchment/60">
                Background
              </h3>
              <ul className="space-y-1">
                {leadership.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm text-parchment/80"
                  >
                    &mdash; {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
