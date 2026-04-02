'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Section from '@/components/layout/Section';
import { skills } from '@/data/skills';
import { usePortfolioStore } from '@/lib/store';
import type { Skill, SkillCategory } from '@/data/types';

gsap.registerPlugin(ScrollTrigger);

const categoryOrder: SkillCategory[] = [
  'Languages',
  'AI & GenAI',
  'Data Science / ML',
  'Tools & Frameworks',
  'Cloud & DevOps',
];

function groupByCategory(items: Skill[]): Record<string, Skill[]> {
  return items.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const grouped = groupByCategory(skills);

  useGSAP(
    () => {
      const groups = gsap.utils.toArray<HTMLElement>('.skill-group');
      gsap.set('.skill-group', { opacity: 1, y: 0 });
      if (reducedMotion || groups.length === 0) return;

      gsap.fromTo(groups,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="skills" depth={2}>
      <div ref={sectionRef} className="mx-auto max-w-6xl px-4 tablet:px-8">
        <div className="mb-12 flex items-center gap-4">
          <h2 className="font-heading text-3xl text-cream tablet:text-4xl desktop:text-5xl">
            Skills & Tools
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate/20 to-transparent" />
        </div>

        <div className="space-y-8">
          {categoryOrder.map((category) => {
            const categorySkills = grouped[category];
            if (!categorySkills || categorySkills.length === 0) return null;

            return (
              <div key={category} className="skill-group">
                <h3 className="mb-4 font-nav text-xs font-bold uppercase tracking-widest text-slate-light">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-full border border-cream/10 bg-base/30 backdrop-blur-sm px-3.5 py-1.5 font-nav text-xs text-cream/70 transition-all duration-300 hover:border-orange/30 hover:bg-orange/10 hover:text-orange hover:shadow-[0_0_15px_rgba(255,133,51,0.12)]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
