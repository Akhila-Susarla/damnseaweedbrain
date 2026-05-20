'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Section from '@/components/layout/Section';
import { usePortfolioStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

const INSTAGRAM_URL = 'https://www.instagram.com/silvers_.rayleigh_/';

const artPreviews = [
  { src: '/art/IMG_20200619_202714_462.jpg', alt: 'Art piece 1' },
  { src: '/art/IMG_20200710_144540_007.jpg', alt: 'Art piece 2' },
  { src: '/art/IMG_20200715_215727_405.jpg', alt: 'Art piece 3' },
  { src: '/art/20210205_085819.jpg', alt: 'Art piece 4' },
  { src: '/art/IMG_20220307_133351_139.jpg', alt: 'Art piece 5' },
  { src: '/art/20240211_004035.jpg', alt: 'Art piece 6' },
];

export default function ArtSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      gsap.set('.art-item', { opacity: 1, y: 0 });
      if (reducedMotion) return;
      gsap.fromTo('.art-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="art" depth={3}>
      <div ref={containerRef} className="mx-auto max-w-5xl px-4 tablet:px-6">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="font-heading text-2xl text-cream mobile:text-3xl tablet:text-4xl desktop:text-5xl">
            Art & Illustration
          </h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-slate/20 to-transparent mobile:block" />
        </div>
        <p className="mb-8 text-sm text-cream/50 mobile:mb-10 mobile:text-base">
          When I&apos;m not engineering AI systems, I draw. Check out my art page on Instagram.
        </p>

        {/* Rectangular grid — 3 columns, aspect 3:4 for portrait images */}
        <div className="grid grid-cols-1 gap-3 mobile:grid-cols-2 tablet:grid-cols-3 tablet:gap-4">
          {artPreviews.map((item, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="art-item group relative overflow-hidden rounded-xl border border-cream/8 bg-base/30 backdrop-blur-sm transition-all duration-300 hover:border-slate/30 hover:shadow-[0_0_25px_rgba(139,163,203,0.1)] cursor-none"
              style={{ aspectRatio: '3 / 4' }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-base/60 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="text-center">
                  <svg className="mx-auto mb-2 h-6 w-6 text-cream/70" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span className="font-nav text-xs text-cream/60">View on Instagram</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 w-full max-w-sm items-center justify-center overflow-hidden rounded-full border border-slate/25 bg-base/40 px-8 font-nav text-sm font-medium uppercase tracking-wider backdrop-blur-md transition-all duration-400 cursor-none hover:border-slate-light/40 mobile:w-auto"
          >
            <span className="flex h-full items-center justify-center text-cream transition-transform duration-300 group-hover:-translate-y-full">
              @silvers_.rayleigh_ &rarr;
            </span>
            <span className="absolute inset-0 flex items-center justify-center translate-y-full text-slate-light transition-transform duration-300 group-hover:translate-y-0">
              @silvers_.rayleigh_ &rarr;
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}
