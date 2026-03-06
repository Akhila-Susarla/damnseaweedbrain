'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import { usePortfolioStore } from '@/lib/store';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'abilities', label: 'Abilities' },
  { id: 'case-files', label: 'Case Files' },
  { id: 'intel', label: 'Intel' },
  { id: 'social', label: 'Social' },
] as const;

export default function NavPanel() {
  const containerRef = useRef<HTMLElement>(null);
  const currentSection = usePortfolioStore((s) => s.currentSection);
  const setCurrentSection = usePortfolioStore((s) => s.setCurrentSection);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const [sectionProgress, setSectionProgress] = useState(0);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (reducedMotion) return;

      SECTIONS.forEach(({ id }) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setCurrentSection(id),
          onEnterBack: () => setCurrentSection(id),
          onUpdate: (self) => {
            if (usePortfolioStore.getState().currentSection === id) {
              setSectionProgress(self.progress);
            }
          },
        });
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  const handleNavClick = (sectionId: string) => {
    if (lenis) {
      lenis.scrollTo(`#${sectionId}`, { offset: 0, duration: 1.2 });
    } else {
      // Fallback for when Lenis is not available
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop: Left side rail */}
      <nav
        ref={containerRef}
        className="fixed left-0 top-0 z-50 hidden h-screen w-16 flex-col items-center justify-center gap-10 bg-midnight/90 backdrop-blur-sm tablet:flex desktop:w-20"
        aria-label="Section navigation"
      >
        {SECTIONS.map(({ id, label }) => {
          const isActive = currentSection === id;
          return (
            <div key={id} className="relative flex h-6 items-center">
              {/* Progress line */}
              {isActive && (
                <div className="absolute -left-1 h-full w-0.5 overflow-hidden bg-parchment/10 desktop:-left-2">
                  <div
                    className="w-full bg-gold transition-transform duration-100"
                    style={{
                      height: '100%',
                      transformOrigin: 'top',
                      transform: `scaleY(${sectionProgress})`,
                    }}
                  />
                </div>
              )}
              <button
                onClick={() => handleNavClick(id)}
                aria-label={`Navigate to ${label}`}
                className={cn(
                  'origin-center -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest transition-all duration-200',
                  'hover:text-gold focus-visible:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight',
                  isActive
                    ? 'scale-110 text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]'
                    : 'text-parchment/50'
                )}
              >
                {label}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Mobile: Bottom bar */}
      <nav
        className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around bg-midnight/95 px-2 py-3 backdrop-blur-sm tablet:hidden"
        aria-label="Section navigation"
      >
        {SECTIONS.map(({ id, label }) => {
          const isActive = currentSection === id;
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              aria-label={`Navigate to ${label}`}
              className={cn(
                'font-mono text-[8px] uppercase tracking-wider transition-colors duration-200',
                'hover:text-gold focus-visible:text-gold focus-visible:outline-none',
                isActive ? 'text-gold' : 'text-parchment/50'
              )}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
