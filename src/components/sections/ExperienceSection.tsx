'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePortfolioStore } from '@/lib/store';
import Section from '@/components/layout/Section';
import ExperienceCard from '@/components/ui/ExperienceCard';
import TiltCard from '@/components/ui/TiltCard';
import { experiences } from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mobileDotRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      gsap.set('.exp-row', { opacity: 1, y: 0 });
      if (reducedMotion) {
        if (timelineRef.current) gsap.set(timelineRef.current, { scaleY: 1 });
        if (mobileTimelineRef.current) gsap.set(mobileTimelineRef.current, { scaleY: 1 });
        if (dotRef.current) gsap.set(dotRef.current, { top: '100%' });
        if (mobileDotRef.current) gsap.set(mobileDotRef.current, { top: '100%' });
        return;
      }

      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top 80%', end: 'bottom 20%', scrub: 0.3 } }
        );
      }
      if (mobileTimelineRef.current) {
        gsap.fromTo(mobileTimelineRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top 82%', end: 'bottom 18%', scrub: 0.35 } }
        );
      }

      // Bright shooting star with tail
      if (dotRef.current) {
        gsap.fromTo(dotRef.current,
          { top: '0%' },
          { top: '100%', ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top 80%', end: 'bottom 20%', scrub: 0.3 } }
        );
      }
      if (mobileDotRef.current) {
        gsap.fromTo(mobileDotRef.current,
          { top: '0%' },
          { top: '100%', ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top 82%', end: 'bottom 18%', scrub: 0.35 } }
        );
      }

      gsap.fromTo('.exp-row',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="experience" depth={3}>
      <div ref={containerRef} className="mx-auto max-w-5xl px-4 tablet:px-6">
        <div className="mb-10 flex items-center gap-4">
          <h2 className="font-heading text-2xl text-cream mobile:text-3xl tablet:text-4xl desktop:text-5xl">
            Experience
          </h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-slate/25 to-transparent mobile:block" />
        </div>

        {/* Timeline layout — date left (25%), timeline center, card right (75%) */}
        <div className="relative">
          {/* Timeline line — centered between columns */}
          <div
            ref={timelineRef}
            className="absolute left-[25%] top-0 bottom-0 hidden w-[3px] origin-top rounded-full tablet:block"
            style={{ background: 'linear-gradient(to bottom, #ff8533 0%, #6b85ad 40%, #6b85ad 80%, transparent 100%)' }}
          />
          {/* Mobile fallback line */}
          <div
            ref={mobileTimelineRef}
            className="absolute left-2 top-0 bottom-0 w-[3px] origin-top rounded-full tablet:hidden"
            style={{ background: 'linear-gradient(to bottom, #ff8533 0%, #6b85ad 40%, transparent 100%)' }}
          />

          {/* Shooting star */}
          <div ref={dotRef} className="absolute left-[calc(25%-6px)] z-10 hidden tablet:block" style={{ top: '0%' }}>
            <div className="h-[14px] w-[14px] rounded-full bg-orange"
              style={{ animation: 'pulse-glow 1.2s ease-in-out infinite' }} />
            {/* Bright tail */}
            <div className="absolute -top-20 left-1/2 h-20 w-[3px] -translate-x-1/2 rounded-full"
              style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,133,51,0.15) 30%, rgba(255,133,51,0.5) 70%, rgba(255,133,51,0.9) 100%)' }} />
          </div>
          {/* Mobile shooting star */}
          <div ref={mobileDotRef} className="absolute left-[3.5px] z-10 tablet:hidden" style={{ top: '0%' }}>
            <div className="h-3 w-3 rounded-full bg-orange shadow-[0_0_10px_rgba(255,133,51,0.75)]" style={{ animation: 'pulse-glow 1.2s ease-in-out infinite' }} />
          </div>

          {/* Entries */}
          <div className="space-y-6 tablet:space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="exp-row grid grid-cols-1 gap-4 pl-6 mobile:pl-7 tablet:grid-cols-[24%_76%] tablet:gap-0 tablet:pl-0">
                {/* Left: Date card */}
                <div className="flex items-start tablet:pr-10 tablet:text-right">
                  <div className="tablet:ml-auto tablet:mr-6">
                    <TiltCard maxAngle={8}>
                      <div className="rounded-xl border border-slate/20 bg-base/30 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:border-slate/35 hover:shadow-[0_0_20px_rgba(107,133,173,0.08)]">
                        <p className="font-nav text-[14px] font-semibold uppercase tracking-wider text-slate-light">
                          {exp.period}
                        </p>
                      </div>
                    </TiltCard>
                  </div>
                </div>

                {/* Right: Company card */}
                <div className="tablet:pl-8">
                  <ExperienceCard experience={exp} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
