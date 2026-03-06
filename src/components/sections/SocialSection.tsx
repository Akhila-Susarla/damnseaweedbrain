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
  LinkedIn: '[LI]',
  GitHub: '[GH]',
  Email: '[@]',
};

export default function SocialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      const links = gsap.utils.toArray<HTMLElement>('.social-link');
      if (!links.length) return;

      if (reducedMotion) {
        gsap.set(links, { opacity: 1, x: 0 });
        return;
      }

      gsap.from(links, {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
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

  return (
    <Section id="social" depth={4}>
      <div ref={containerRef} className="mx-auto max-w-[800px] px-4">
        <h2 className="mb-8 font-serif text-2xl tracking-wide text-gold tablet:text-3xl">
          COMMS // Agency Channel
        </h2>

        <div className="rounded border border-parchment/20 bg-midnight/80 p-6 font-mono tablet:p-8">
          {socialLinks.map((link, index) => {
            const isEmail = link.platform === 'Email';
            return (
              <div key={link.platform}>
                <a
                  href={link.url}
                  {...(!isEmail && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                  aria-label={`Contact via ${link.platform}`}
                  className="social-link flex items-center gap-4 py-4 opacity-0 -translate-x-5 text-parchment/80 transition-colors duration-200 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <span className="w-10 text-center text-sm text-parchment/50">
                    {platformIcons[link.platform] ?? '[??]'}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-parchment/50">
                      {link.platform}
                    </span>
                    <span className="text-sm">{link.label}</span>
                  </span>
                </a>
                {index < socialLinks.length - 1 && (
                  <div className="border-b border-parchment/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
