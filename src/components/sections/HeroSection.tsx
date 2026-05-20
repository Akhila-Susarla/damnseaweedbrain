'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import Section from '@/components/layout/Section';
import { usePortfolioStore } from '@/lib/store';

const Scene3D = dynamic(() => import('@/components/three/Scene3D'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const tl = gsap.timeline({ delay: 0.2 });

      if (reducedMotion) {
        gsap.set('.hero-greeting, .hero-name, .hero-title, .hero-about, .hero-cta, .hero-stat', { opacity: 1, y: 0, scale: 1 });
        return;
      }

      tl.fromTo('.hero-greeting', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.2)
      .fromTo('.hero-name', { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0.3)
      .fromTo('.hero-title', { y: 20 }, { y: 0, duration: 0.6, ease: 'power3.out' }, 0.45)
      .fromTo('.hero-about', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.9)
      .fromTo('.hero-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.1)
      .fromTo('.hero-stat', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, 1.2);

      // Keep the text readable; only shift it slightly on scroll.
      gsap.to('.hero-text-content', {
        yPercent: 20,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: '70% top', scrub: 0.6 },
      });
      gsap.to('.hero-bg-effects', {
        yPercent: -10, scale: 1.1,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    },
    { scope: heroRef, dependencies: [reducedMotion] }
  );

  const handleScrollDown = () => { lenis?.scrollTo('#what-i-do', { duration: 1.2 }); };

  return (
    <Section id="hero" depth={1} className="!py-0">
      <div ref={heroRef} className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
        {/* ===== BACKGROUND — transparent, lets warped grid show through ===== */}
        <div className="hero-bg-effects absolute inset-0 z-0 will-change-transform">
          {/* Subtle color washes — no solid fills */}
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 50% 40% at 70% 25%, rgba(255,133,51,0.05) 0%, transparent 70%),
              radial-gradient(ellipse 50% 50% at 25% 65%, rgba(107,133,173,0.07) 0%, transparent 70%)
            `,
          }} />

          {/* Accent lines */}
          <div className="absolute top-[18%] right-0 hidden h-px w-[35%] bg-gradient-to-l from-transparent via-orange/15 to-transparent mobile:block" />
          <div className="absolute bottom-[28%] left-0 hidden h-px w-[30%] bg-gradient-to-r from-transparent via-slate/25 to-transparent mobile:block" />
          <div className="absolute top-[50%] right-[10%] hidden h-[20%] w-px bg-gradient-to-b from-transparent via-slate/15 to-transparent mobile:block" />
        </div>

        <div className="absolute inset-0 z-[1]"><Scene3D /></div>

        {/* ===== CONTENT ===== */}
        <div className="relative z-10 flex min-h-[calc(100svh-4rem)] items-start px-4 pb-16 pt-4 mobile:pb-20 mobile:pt-6 tablet:items-center tablet:px-8 tablet:pb-0 tablet:pt-0">
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid grid-cols-1 gap-12 desktop:grid-cols-[1.2fr_1fr] desktop:items-center desktop:gap-16">
              {/* Left: Name & Bio — no solid card, just content floating */}
              <div className="hero-text-content">
                <div>
                  <p className="hero-greeting mb-5 font-nav text-sm uppercase tracking-[0.3em] text-slate-light">
                    Hello, I&apos;m
                  </p>
                  <h1 className="hero-name mb-5 font-heading text-6xl font-bold leading-[1.05] tracking-tight text-cream tablet:text-7xl desktop:text-8xl">
                    Akhila
                    <br />
                    <span className="text-orange drop-shadow-[0_0_35px_rgba(255,133,51,0.25)]">Susarla</span>
                  </h1>
                  <p
                    className="hero-title mb-7 font-nav text-base tracking-wider text-slate-light tablet:text-lg"
                    style={{ color: '#93c5fd' }}
                  >
                    AI/ML Engineer <span className="text-orange">&bull;</span> Data Scientist
                  </p>
                  <p className="hero-about mb-9 max-w-lg text-base leading-relaxed text-cream/50">
                    Building production-grade conversational AI systems, ML pipelines, and data-driven solutions. Currently engineering voice bots handling 10,000+ daily interactions at Copart.
                  </p>
                  <div className="hero-cta flex flex-wrap gap-4">
                    <button
                      onClick={() => lenis?.scrollTo('#social', { duration: 1.2 })}
                      className="group inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3 font-nav text-sm font-semibold uppercase tracking-wider text-base transition-all duration-300 hover:bg-orange-muted hover:shadow-[0_0_35px_rgba(255,133,51,0.35)] cursor-none">
                      Get in Touch
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                    <a href="https://linkedin.com/in/akhila-susarla-1803b41b6/" target="_blank" rel="noopener noreferrer"
                      className="group relative h-12 overflow-hidden rounded-full border border-slate/30 bg-base/30 backdrop-blur-md px-7 font-nav text-sm uppercase tracking-wider text-slate-light transition-all duration-300 hover:border-orange/40 cursor-none">
                      <span className="flex h-full items-center transition-transform duration-300 group-hover:-translate-y-full">LinkedIn</span>
                      <span className="absolute inset-0 flex items-center justify-center translate-y-full text-orange transition-transform duration-300 group-hover:translate-y-0">LinkedIn</span>
                    </a>
                    <a href="https://github.com/Akhila-Susarla" target="_blank" rel="noopener noreferrer"
                      className="group relative h-12 overflow-hidden rounded-full border border-slate/30 bg-base/30 backdrop-blur-md px-7 font-nav text-sm uppercase tracking-wider text-slate-light transition-all duration-300 hover:border-orange/40 cursor-none">
                      <span className="flex h-full items-center transition-transform duration-300 group-hover:-translate-y-full">GitHub</span>
                      <span className="absolute inset-0 flex items-center justify-center translate-y-full text-orange transition-transform duration-300 group-hover:translate-y-0">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Quick stats — translucent cards */}
              <div className="hero-text-content">
                <div className="grid grid-cols-2 gap-5 tablet:gap-6">
                  <div className="hero-stat rounded-2xl border border-orange/10 bg-base/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-orange/25 hover:bg-base/40">
                    <p className="font-heading text-4xl font-bold text-orange tablet:text-5xl">3+</p>
                    <p className="mt-2 font-nav text-xs uppercase tracking-wider text-cream/50">Years Experience</p>
                  </div>
                  <div className="hero-stat rounded-2xl border border-slate/15 bg-base/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate/30 hover:bg-base/40">
                    <p className="font-heading text-4xl font-bold text-slate-light tablet:text-5xl">&lt;2s</p>
                    <p className="mt-2 font-nav text-xs uppercase tracking-wider text-slate/80">Response Latency</p>
                  </div>
                  <div className="hero-stat rounded-2xl border border-slate/15 bg-base/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate/30 hover:bg-base/40">
                    <p className="font-heading text-4xl font-bold text-slate-light tablet:text-5xl">LoRA</p>
                    <p className="mt-2 font-nav text-xs uppercase tracking-wider text-slate/80">LLM Fine-tuning</p>
                  </div>
                  <div className="hero-stat rounded-2xl border border-orange/10 bg-base/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-orange/25 hover:bg-base/40">
                    <p className="font-heading text-4xl font-bold text-orange tablet:text-5xl">3.78</p>
                    <p className="mt-2 font-nav text-xs uppercase tracking-wider text-cream/50">GPA at UT Dallas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2 tablet:bottom-8">
          <button onClick={handleScrollDown} className="group flex flex-col items-center gap-2 border-none bg-transparent cursor-none" aria-label="Scroll down to explore">
            <span className="font-nav text-[11px] tracking-widest text-cream/30 transition-colors group-hover:text-orange/60">SCROLL</span>
            <div className="h-8 w-px bg-gradient-to-b from-orange/30 to-transparent animate-bounce-gentle" />
          </button>
        </div>
      </div>
    </Section>
  );
}
