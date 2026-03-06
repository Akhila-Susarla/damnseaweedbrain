'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Section from '@/components/layout/Section';
import AbilityCard from '@/components/ui/AbilityCard';
import { skills } from '@/data/skills';
import { usePortfolioStore } from '@/lib/store';
import type { Skill, SkillCategory } from '@/data/types';

gsap.registerPlugin(ScrollTrigger);

const categoryKanji: Record<SkillCategory, string> = {
  Languages: '言語',
  'Data Science/ML': '科学',
  'Tools & Frameworks': '道具',
  Cloud: '雲',
};

const categoryOrder: SkillCategory[] = [
  'Languages',
  'Data Science/ML',
  'Tools & Frameworks',
  'Cloud',
];

function groupByCategory(items: Skill[]): Record<SkillCategory, Skill[]> {
  return items.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, Skill[]>
  );
}

export default function AbilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const grouped = groupByCategory(skills);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.ability-card');

      if (reducedMotion || cards.length === 0) {
        // Show all cards immediately
        gsap.set('.ability-card', { opacity: 1, y: 0 });
        return;
      }

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.4,
              ease: 'power2.out',
            }
          );
        },
        once: true,
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <Section id="abilities" depth={2}>
      <div ref={sectionRef} className="mx-auto max-w-6xl px-4 tablet:px-8">
        <h2 className="mb-10 font-serif text-2xl text-gold tablet:text-3xl desktop:text-4xl">
          ABILITIES{' '}
          <span className="text-parchment/40">{'// '}</span>
          <span className="text-parchment/60">Supernatural Registry</span>
        </h2>

        {categoryOrder.map((category, idx) => {
          const categorySkills = grouped[category];
          if (!categorySkills || categorySkills.length === 0) return null;

          return (
            <div
              key={category}
              className={idx < categoryOrder.length - 1 ? 'mb-8 border-b border-parchment/10 pb-8' : 'mb-8'}
            >
              <h3 className="mb-4 font-serif text-lg text-parchment">
                {category}
                <span className="ml-2 font-mono text-xs text-parchment/40">
                  {categoryKanji[category]}
                </span>
              </h3>
              <div className="grid grid-cols-2 gap-3 tablet:grid-cols-3 desktop:grid-cols-4">
                {categorySkills.map((skill) => (
                  <AbilityCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
