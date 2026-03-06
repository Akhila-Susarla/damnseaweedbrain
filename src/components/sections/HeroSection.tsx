'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import Section from '@/components/layout/Section';
import TypewriterText from '@/components/ui/TypewriterText';
import { usePortfolioStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (reducedMotion || !heroRef.current) return;

      const trigger = {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      };

      // Background layer: farthest — slowest vertical drift, slight zoom
      gsap.to('.parallax-bg', {
        yPercent: -8,
        scale: 1.08,
        scrollTrigger: trigger,
      });

      // Midground layer: middle depth — moderate speed, fades as it rises
      gsap.to('.parallax-mid', {
        yPercent: -25,
        scale: 1.04,
        opacity: 0.1,
        scrollTrigger: { ...trigger },
      });

      // Foreground layer: closest — fastest, drifts down + scales up dramatically
      gsap.to('.parallax-fg', {
        yPercent: 35,
        scale: 1.25,
        opacity: 0,
        scrollTrigger: { ...trigger },
      });
    },
    { scope: heroRef, dependencies: [reducedMotion] }
  );

  const handleScrollDown = () => {
    lenis?.scrollTo('#about', { duration: 1.2 });
  };

  return (
    <Section id="hero" depth={1} className="!py-0">
      <div ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background layer: dark noir atmosphere — farthest depth */}
        <div className="parallax-bg absolute inset-0 z-0 will-change-transform" style={{ filter: 'blur(0.5px)' }}>
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 60% 50% at 70% 20%, rgba(212, 175, 55, 0.06) 0%, transparent 70%),
                radial-gradient(ellipse 80% 60% at 30% 80%, rgba(10, 14, 26, 0.9) 0%, transparent 60%),
                linear-gradient(180deg, #0a0e1a 0%, #0c1020 40%, #080c16 100%)
              `,
            }}
          />
          {/* Yokohama cityscape silhouette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[30%] opacity-30"
            style={{
              background: `
                linear-gradient(0deg, #0a0e1a 0%, transparent 100%),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 40px,
                  rgba(212, 175, 55, 0.03) 40px,
                  rgba(212, 175, 55, 0.03) 42px
                )
              `,
              clipPath:
                'polygon(0% 100%, 0% 60%, 5% 55%, 8% 40%, 10% 42%, 12% 30%, 15% 32%, 18% 50%, 22% 48%, 25% 35%, 28% 38%, 32% 55%, 38% 50%, 42% 25%, 44% 28%, 48% 45%, 52% 42%, 55% 30%, 58% 35%, 62% 50%, 68% 45%, 72% 32%, 75% 38%, 78% 55%, 82% 48%, 85% 35%, 88% 40%, 92% 50%, 95% 42%, 98% 55%, 100% 50%, 100% 100%)',
            }}
          />
        </div>

        {/* Midground layer: Dazai character presence — mid depth */}
        <div className="parallax-mid absolute inset-0 z-[1] flex items-end justify-center will-change-transform">
          <div
            className="relative w-48 tablet:w-64 desktop:w-80 h-[60vh] mb-0 opacity-30"
            aria-hidden="true"
            data-testid="character-placeholder"
            style={{
              background: `
                linear-gradient(180deg,
                  transparent 0%,
                  rgba(212, 175, 55, 0.08) 10%,
                  rgba(196, 184, 168, 0.06) 50%,
                  rgba(10, 14, 26, 0.8) 100%
                )
              `,
              clipPath:
                'polygon(35% 0%, 65% 0%, 68% 5%, 70% 15%, 72% 25%, 73% 40%, 75% 60%, 78% 80%, 80% 95%, 80% 100%, 20% 100%, 20% 95%, 22% 80%, 25% 60%, 27% 40%, 28% 25%, 30% 15%, 32% 5%)',
            }}
          />
        </div>

        {/* Foreground layer: floating decorative elements — nearest depth */}
        <div className="parallax-fg absolute inset-0 z-[2] pointer-events-none will-change-transform" aria-hidden="true">
          {/* Bandage strips — slightly more visible for depth contrast */}
          <div
            className="absolute top-[15%] left-[10%] w-28 h-1.5 bg-parchment/15 rounded-full rotate-[25deg]"
          />
          <div
            className="absolute top-[40%] right-[15%] w-20 h-1 bg-parchment/12 rounded-full -rotate-[15deg]"
          />
          <div
            className="absolute bottom-[30%] left-[20%] w-24 h-1 bg-parchment/10 rounded-full rotate-[45deg]"
          />

          {/* Faint kanji characters — bumped visibility for parallax perception */}
          <span className="absolute top-[25%] right-[10%] font-heading text-6xl text-parchment/[0.06] select-none">
            探
          </span>
          <span className="absolute top-[55%] left-[8%] font-heading text-5xl text-parchment/[0.07] select-none rotate-[-8deg]">
            偵
          </span>
          <span className="absolute bottom-[25%] right-[20%] font-heading text-4xl text-parchment/[0.05] select-none rotate-[5deg]">
            暗
          </span>

          {/* Subtle particle dots */}
          <div className="absolute top-[20%] left-[50%] w-1.5 h-1.5 rounded-full bg-gold/25" />
          <div className="absolute top-[60%] left-[70%] w-1 h-1 rounded-full bg-parchment/20" />
          <div className="absolute top-[45%] left-[30%] w-1.5 h-1.5 rounded-full bg-teal/15" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <TypewriterText
            text="damnseaweedbrain"
            as="h1"
            className="font-heading text-4xl tablet:text-5xl desktop:text-6xl text-gold mb-4 tracking-wide"
            delay={0.5}
          />
          <p className="font-mono text-sm tablet:text-base text-parchment/70 tracking-widest">
            Data Scientist | ML Engineer
          </p>
        </div>

        {/* Scroll-down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none group"
            aria-label="Scroll down to explore"
          >
            <span className="font-mono text-xs text-parchment/50 tracking-wider group-hover:text-parchment/70 transition-colors">
              Scroll to explore
            </span>
            <svg
              className="w-5 h-5 text-parchment/50 animate-bounce-gentle group-hover:text-parchment/70 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </Section>
  );
}
