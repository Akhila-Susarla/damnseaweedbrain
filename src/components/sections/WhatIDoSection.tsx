'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Section from '@/components/layout/Section';
import TiltCard from '@/components/ui/TiltCard';
import { specialties } from '@/data/whatido';
import { usePortfolioStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

const cardAccents = [
  'hover:border-orange/50 hover:shadow-[0_0_25px_rgba(255,133,51,0.12)]',
  'hover:border-slate/50 hover:shadow-[0_0_25px_rgba(139,163,203,0.15)]',
  'hover:border-orange/50 hover:shadow-[0_0_25px_rgba(255,133,51,0.12)]',
  'hover:border-slate/50 hover:shadow-[0_0_25px_rgba(139,163,203,0.15)]',
];

export default function WhatIDoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.specialty-card');
      if (!cards.length) return;

      gsap.set(cards, { opacity: 1, y: 0 });
      if (reducedMotion) return;

      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="what-i-do" depth={2}>
      <div ref={containerRef} className="mx-auto max-w-6xl px-4 tablet:px-8">
        <div className="mb-10 flex items-center gap-4">
          <h2 className="font-heading text-2xl text-cream mobile:text-3xl tablet:text-4xl desktop:text-5xl">
            What I Do
          </h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-slate/20 to-transparent mobile:block" />
        </div>

        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
          {specialties.map((specialty, i) => (
            <TiltCard key={specialty.title}>
              <div className={`specialty-card flex h-full flex-col rounded-xl border border-cream/8 bg-base-light/50 backdrop-blur-sm p-6 transition-all duration-300 ${cardAccents[i]}`}>
                <div className="mb-3 h-1 w-8 rounded-full bg-orange/60" />
                <h3 className="mb-3 font-heading text-lg text-cream">
                  {specialty.title}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-cream/50">
                  {specialty.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {specialty.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-orange/20 bg-orange/5 backdrop-blur-sm px-2.5 py-1 font-nav text-xs text-orange/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
