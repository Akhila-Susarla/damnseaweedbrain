'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/layout/Section';
import { socialLinks } from '@/data/social';
import { usePortfolioStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

const platformIcons: Record<string, string> = {
  LinkedIn: 'LI',
  GitHub: 'GH',
  Email: '@',
};

export default function SocialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      const links = gsap.utils.toArray<HTMLElement>('.social-link');
      if (!links.length) return;

      gsap.set(links, { opacity: 1, x: 0 });
      if (reducedMotion) return;

      gsap.fromTo(links,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="social" depth={4}>
      <div ref={containerRef} className="mx-auto max-w-[800px] px-4">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-heading text-2xl tracking-wide text-cream tablet:text-3xl">
            Get in Touch
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate/20 to-transparent" />
        </div>

        <div className="rounded-xl border border-cream/8 bg-base-light/50 backdrop-blur-sm p-6 tablet:p-8">
          <p className="mb-6 text-sm text-cream/50">
            Interested in working together or have a question? Feel free to reach out.
          </p>
          {socialLinks.map((link, index) => {
            const isEmail = link.platform === 'Email';
            return (
              <div key={link.platform}>
                <a
                  href={link.url}
                  {...(!isEmail && { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={`Contact via ${link.platform}`}
                  className="social-link group flex items-center gap-4 py-4 text-cream/70 transition-all duration-300 hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/10 font-nav text-xs text-cream/40 transition-all duration-300 group-hover:border-orange/40 group-hover:bg-orange/10 group-hover:text-orange">
                    {platformIcons[link.platform] ?? '??'}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-nav text-[10px] uppercase tracking-widest text-cream/30">
                      {link.platform}
                    </span>
                    <span className="text-sm">{link.label}</span>
                  </span>
                  <svg className="ml-auto h-4 w-4 text-cream/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                {index < socialLinks.length - 1 && (
                  <div className="border-b border-cream/5" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
