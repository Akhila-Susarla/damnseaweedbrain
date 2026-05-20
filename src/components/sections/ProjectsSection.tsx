'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePortfolioStore } from '@/lib/store';
import Section from '@/components/layout/Section';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const TABLET_BREAKPOINT = 768;

export function getProjectGlowColor(index: number, isTwoColumnLayout: boolean): 'orange' | 'blue' {
  if (!isTwoColumnLayout) {
    return index % 2 === 0 ? 'orange' : 'blue';
  }

  const row = Math.floor(index / 2);
  const column = index % 2;
  return (row + column) % 2 === 0 ? 'orange' : 'blue';
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const [isTwoColumnLayout, setIsTwoColumnLayout] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const media = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`);
    const update = () => setIsTwoColumnLayout(media.matches);

    update();
    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
    };
  }, []);

  useGSAP(
    () => {
      gsap.set('.project-card', { opacity: 1, y: 0 });
      if (reducedMotion) return;

      gsap.fromTo('.project-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="projects" depth={3}>
      <div ref={containerRef} className="mx-auto max-w-6xl px-4 tablet:px-6">
        <div className="mb-10 flex items-center gap-4">
          <h2 className="font-heading text-2xl text-cream mobile:text-3xl tablet:text-4xl desktop:text-5xl">
            Projects
          </h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-slate/20 to-transparent mobile:block" />
        </div>

        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              glowColor={getProjectGlowColor(i, isTwoColumnLayout)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
