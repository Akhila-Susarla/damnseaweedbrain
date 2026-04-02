'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePortfolioStore } from '@/lib/store';
import Section from '@/components/layout/Section';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

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
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-heading text-3xl text-cream tablet:text-4xl desktop:text-5xl">
            Projects
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}
