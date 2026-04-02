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
  { id: 'hero', label: 'Home' },
  { id: 'what-i-do', label: 'What I Do' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'social', label: 'Contact' },
] as const;

function GitHubIcon() {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>);
}
function LinkedInIcon() {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
}
function XIcon() {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
}
function InstagramIcon() {
  return (<svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>);
}

const SOCIAL_LINKS = [
  { href: 'https://github.com/Akhila-Susarla', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://linkedin.com/in/akhila-susarla-1803b41b6/', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://x.com/', label: 'X', Icon: XIcon },
  { href: 'https://instagram.com/', label: 'Instagram', Icon: InstagramIcon },
];

export default function NavPanel() {
  const containerRef = useRef<HTMLElement>(null);
  const currentSection = usePortfolioStore((s) => s.currentSection);
  const setCurrentSection = usePortfolioStore((s) => s.setCurrentSection);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const [, setSectionProgress] = useState(0);
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
    if (lenis) lenis.scrollTo(`#${sectionId}`, { offset: -80, duration: 1.2 });
    else document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center px-6 tablet:px-10 desktop:px-16">
        {/* Left: Logo — fixed 80px wide to align exactly above sidebar social icons */}
        <div className="flex-shrink-0 desktop:w-20">
          <button
            onClick={() => handleNavClick('hero')}
            className="mx-auto block font-heading text-2xl tracking-wide text-cream transition-colors duration-300 hover:text-orange cursor-none"
          >
            AS<span className="text-orange">.</span>
          </button>
        </div>
        <div className="flex-1" />

        {/* Center: current section indicator */}
        <div className="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tablet:block">
          <span className="font-nav text-sm uppercase tracking-[0.25em] text-orange/80">
            {SECTIONS.find((s) => s.id === currentSection)?.label ?? 'Home'}
          </span>
        </div>

        {/* Right: Nav buttons — brighter, more spacing, pushed to right edge */}
        <nav className="hidden items-center gap-6 tablet:flex" aria-label="Main navigation">
          {[
            { id: 'what-i-do', label: 'About' },
            { id: 'experience', label: 'Work' },
            { id: 'social', label: 'Contact' },
          ].map(({ id, label }) => {
            const isActive = currentSection === id;
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                aria-label={`Navigate to ${label}`}
                className={cn(
                  'group relative h-10 overflow-hidden rounded-full border px-7 font-nav text-sm font-medium uppercase tracking-wider backdrop-blur-md transition-all duration-400 cursor-none',
                  isActive
                    ? 'border-orange/50 bg-orange/15 text-orange shadow-[0_0_20px_rgba(255,133,51,0.15)]'
                    : 'border-cream/25 bg-base/40 text-cream hover:border-orange/40 hover:text-orange'
                )}
              >
                {/* Default text */}
                <span className="flex h-full items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                  {label}
                </span>
                {/* Hover text slides up */}
                <span className="absolute inset-0 flex items-center justify-center translate-y-full text-orange transition-transform duration-300 group-hover:translate-y-0">
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ===== LEFT SIDEBAR — Social icons (Desktop) ===== */}
      <aside
        ref={containerRef}
        className="fixed left-0 bottom-0 z-40 hidden w-20 flex-col items-center pb-8 desktop:flex"
        aria-label="Social links"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="mb-2 h-16 w-px bg-gradient-to-b from-transparent via-slate/40 to-slate/20" />
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex h-11 w-11 items-center justify-center rounded-full text-slate-light transition-all duration-300 hover:text-orange hover:shadow-[0_0_20px_rgba(255,133,51,0.25)] cursor-none"
            >
              <Icon />
            </a>
          ))}
        </div>
      </aside>

      {/* ===== MOBILE BOTTOM BAR ===== */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around bg-base/95 px-2 py-3 backdrop-blur-md border-t border-slate/10 tablet:hidden" aria-label="Section navigation">
        {SECTIONS.filter(({ id }) => !['what-i-do'].includes(id)).map(({ id, label }) => {
          const isActive = currentSection === id;
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              aria-label={`Navigate to ${label}`}
              className={cn(
                'font-nav text-[8px] uppercase tracking-wider transition-colors duration-300',
                isActive ? 'text-orange' : 'text-cream/40'
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
