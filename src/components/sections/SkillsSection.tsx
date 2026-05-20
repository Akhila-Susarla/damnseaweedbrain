'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'motion/react';
import Section from '@/components/layout/Section';
import { skills } from '@/data/skills';
import { usePortfolioStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { Skill, SkillCategory } from '@/data/types';

gsap.registerPlugin(ScrollTrigger);

interface NodeDef {
  id: SkillCategory;
  label: string;
  accent: 'orange' | 'blue';
}

const nodes: NodeDef[] = [
  { id: 'Languages',          label: 'Languages',          accent: 'orange' },
  { id: 'AI & GenAI',         label: 'AI & GenAI',         accent: 'blue' },
  { id: 'Data Science / ML',  label: 'Data Science\n& ML', accent: 'orange' },
  { id: 'Tools & Frameworks', label: 'Tools &\nFrameworks', accent: 'blue' },
  { id: 'Cloud & DevOps',     label: 'Cloud &\nDevOps',    accent: 'orange' },
];

function groupByCategory(items: Skill[]): Record<string, Skill[]> {
  return items.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Skill[]>);
}

const st = {
  orange: {
    border: 'border-orange/20',
    activeBorder: 'border-orange/60',
    glow: 'shadow-[0_0_35px_rgba(255,133,51,0.2)]',
    text: 'text-orange',
    dot: 'bg-orange shadow-[0_0_10px_rgba(255,133,51,0.8),0_0_25px_rgba(255,133,51,0.4)]',
    lineDefault: 'from-orange/35 via-orange/15 to-transparent',
    lineActive: 'from-orange/50 via-orange/20 to-transparent',
    chipBright: 'border-orange/30 text-orange/80',
    chipPopup: 'border-orange/40 text-orange shadow-[0_0_12px_rgba(255,133,51,0.1)]',
    chipHover: 'hover:border-orange/60 hover:text-orange',
  },
  blue: {
    border: 'border-slate/20',
    activeBorder: 'border-slate-light/60',
    glow: 'shadow-[0_0_35px_rgba(139,163,203,0.25)]',
    text: 'text-slate-light',
    dot: 'bg-slate-light shadow-[0_0_10px_rgba(139,163,203,0.8),0_0_25px_rgba(139,163,203,0.4)]',
    lineDefault: 'from-slate-light/35 via-slate-light/15 to-transparent',
    lineActive: 'from-slate-light/50 via-slate-light/20 to-transparent',
    chipBright: 'border-slate/30 text-slate-light/80',
    chipPopup: 'border-slate/40 text-slate-light shadow-[0_0_12px_rgba(139,163,203,0.12)]',
    chipHover: 'hover:border-slate/60 hover:text-slate-light',
  },
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const grouped = groupByCategory(skills);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleEnter = (id: string) => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
    setActiveNode(id);
  };
  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveNode(null), 150);
  };

  useGSAP(() => {
    gsap.set('.skill-col', { opacity: 1, y: 0 });
    if (reducedMotion) return;
    gsap.fromTo('.skill-col',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
    );
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  const activeNodeDef = nodes.find((n) => n.id === activeNode);
  const activeAccent = activeNodeDef ? st[activeNodeDef.accent] : null;
  const activeSkills = activeNode ? (grouped[activeNode] || []) : [];

  return (
    <Section id="skills" depth={2}>
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4 tablet:px-6">
        <div className="mb-6 flex flex-col items-start gap-2 mobile:mb-8 mobile:flex-row mobile:items-end mobile:gap-4 tablet:mb-10">
          <h2 className="font-heading text-2xl text-cream mobile:text-3xl tablet:text-4xl desktop:text-5xl">Skills & Tools</h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-slate/20 to-transparent mobile:block" />
          <p className="hidden shrink-0 font-nav text-xs text-cream/40 tracking-wide tablet:block">Hover over a category to explore</p>
        </div>

        {/* Wrapper for hover reset */}
        <div onMouseLeave={handleLeave}>
          {/* Mobile: vertical zig-zag with inline expansion */}
          <div className="space-y-4 tablet:hidden">
            {nodes.map((node, i) => {
              const isActive = activeNode === node.id;
              const accent = st[node.accent];
              const nodeSkills = grouped[node.id] || [];
              const isLeft = i % 2 === 0;

              return (
                <div key={node.id} className="flex flex-col">
                  <div className={cn('flex w-full', isLeft ? 'justify-start' : 'justify-end')}>
                    <motion.button
                      type="button"
                      onClick={() => setActiveNode(isActive ? null : node.id)}
                      animate={isActive ? { scale: 1.08 } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                      className={cn(
                        'relative flex h-[112px] w-[112px] items-center justify-center rounded-full border-2 bg-base/60 backdrop-blur-md transition-all duration-300',
                        isLeft ? 'mr-6' : 'ml-6',
                        isActive ? cn(accent.activeBorder, accent.glow) : accent.border
                      )}
                    >
                      <svg className="absolute h-[136px] w-[136px]" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                        <circle
                          cx="50"
                          cy="50"
                          r="48"
                          stroke={node.accent === 'orange' ? 'rgba(255,133,51,0.11)' : 'rgba(139,163,203,0.11)'}
                          strokeWidth="0.7"
                          strokeDasharray="5 4"
                        />
                      </svg>
                      {isActive && (
                        <div className="absolute inset-[-10px] animate-[orbit_3.5s_linear_infinite]" aria-hidden="true">
                          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                            <div className={cn('h-3 w-3 rounded-full', accent.dot)} />
                          </div>
                        </div>
                      )}
                      <span className={cn('px-3 text-center font-nav text-[10px] font-bold uppercase leading-tight tracking-wider whitespace-pre-line', accent.text)}>
                        {node.label}
                      </span>
                    </motion.button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                        className={cn(
                          'mt-3 overflow-hidden rounded-2xl border bg-base/55 px-4 py-4 backdrop-blur-sm',
                          isLeft ? 'ml-0 mr-8' : 'ml-8 mr-0',
                          isActive ? cn(accent.activeBorder, accent.glow) : accent.border
                        )}
                      >
                        <p className={cn('mb-3 font-nav text-[11px] font-bold uppercase tracking-[0.2em]', accent.text)}>
                          {node.label.replace('\n', ' ')}
                        </p>
                        <div className={cn('flex flex-wrap gap-2', isLeft ? 'justify-start' : 'justify-end')}>
                          {nodeSkills.map((sk, si) => (
                            <motion.span
                              key={sk.name}
                              initial={{ opacity: 0, y: 8, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: si * 0.025, duration: 0.2, ease: 'easeOut' }}
                              className={cn(
                                'inline-block max-w-full whitespace-normal break-words rounded-full border bg-base/50 px-3 py-1.5 text-center font-nav text-[11px] font-semibold leading-tight backdrop-blur-sm',
                                accent.chipPopup, accent.chipHover
                              )}
                            >
                              {sk.name}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Desktop/tablet: existing hover-driven orbit layout */}
          <div className="hidden tablet:block">
            {/* === GLOBES ROW === */}
            <div className="mb-8 grid grid-cols-1 gap-x-2 gap-y-5 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-5 desktop:gap-x-4">
              {nodes.map((node, i) => {
                const isActive = activeNode === node.id;
                const accent = st[node.accent];

                return (
                  <div
                    key={node.id}
                    className="skill-col flex flex-col items-center"
                    onMouseEnter={() => handleEnter(node.id)}
                  >
                    <motion.div
                      animate={isActive ? { scale: 1.12 } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className={cn(
                        'skill-float-group relative flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 bg-base/40 backdrop-blur-md transition-all duration-400 cursor-none mobile:h-[130px] mobile:w-[130px] tablet:h-[150px] tablet:w-[150px]',
                        isActive ? cn(accent.activeBorder, accent.glow) : accent.border
                      )}
                      style={{ animationDelay: `${i * 0.6}s` }}
                    >
                      <svg className="absolute h-[146px] w-[146px] mobile:h-[158px] mobile:w-[158px] tablet:h-[178px] tablet:w-[178px]" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="48"
                          stroke={node.accent === 'orange' ? 'rgba(255,133,51,0.10)' : 'rgba(139,163,203,0.10)'}
                          strokeWidth="0.5" strokeDasharray="5 4" />
                      </svg>
                      {isActive && (
                        <div className="absolute animate-[orbit_3.5s_linear_infinite]" style={{ inset: -12 }}>
                          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                            <div className={cn('h-3 w-3 rounded-full', accent.dot)} />
                          </div>
                        </div>
                      )}
                      <span className={cn('px-3 text-center font-nav text-[10px] font-bold uppercase leading-snug tracking-wider whitespace-pre-line mobile:px-4 mobile:text-[11px] tablet:text-[13px]', accent.text)}>
                        {node.label}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* === SKILLS AREA BELOW GLOBES === */}
            <div className="relative">
              {/* DEFAULT: all columns of chips — hidden via visibility so it still occupies space */}
              <div className={cn(
                'grid grid-cols-1 gap-x-2 gap-y-6 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-5 desktop:gap-x-4 transition-opacity duration-300',
                activeNode ? 'opacity-0' : 'opacity-100'
              )}>
                {nodes.map((node) => {
                  const accent = st[node.accent];
                  const nodeSkills = grouped[node.id] || [];
                  return (
                    <div key={node.id} className="flex flex-col items-center">
                      {/* Connecting line — bright */}
                      <div className={cn('mb-2 h-8 w-[2px] rounded-full bg-gradient-to-b', accent.lineDefault)} />
                      {/* Chips */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {nodeSkills.map((sk) => (
                          <span
                            key={sk.name}
                            className={cn(
                              'inline-block whitespace-nowrap rounded-full border bg-base/40 backdrop-blur-sm px-3.5 py-1.5 font-nav text-[12px] font-semibold transition-all duration-300 cursor-none',
                              accent.chipBright, accent.chipHover
                            )}
                            onMouseEnter={() => handleEnter(node.id)}
                          >
                            {sk.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* HOVER: popup near the hovered globe */}
              <AnimatePresence mode="wait">
                {activeNode && activeAccent && (() => {
                  const nodeIndex = nodes.findIndex((n) => n.id === activeNode);
                  const columnPercent = ((nodeIndex / (nodes.length - 1)) * 80 + 10);
                  const blendedPercent = columnPercent * 0.6 + 50 * 0.4;
                  const linePercent = columnPercent;

                  return (
                    <motion.div
                      key={activeNode}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0 z-10"
                    >
                      {/* Glowing connector line — bright and tall */}
                      <div
                        className={cn('absolute top-0 h-14 w-[3px] rounded-full bg-gradient-to-b', activeAccent.lineActive)}
                        style={{ left: `${linePercent}%`, transform: 'translateX(-50%)',
                          boxShadow: activeNodeDef?.accent === 'orange' ? '0 0 8px rgba(255,133,51,0.3)' : '0 0 8px rgba(139,163,203,0.3)' }}
                      />

                      {/* Chips container — label starts after the line */}
                      <div className="pt-16 flex flex-col items-center" style={{ marginLeft: `${(blendedPercent - 50) * 1.2}%` }}>
                        <p className={cn('mb-4 font-nav text-sm font-bold uppercase tracking-[0.2em]', activeAccent.text)}>
                          {activeNodeDef?.label.replace('\n', ' ')}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2.5 max-w-[750px]">
                          {activeSkills.map((sk, si) => (
                            <motion.span
                              key={sk.name}
                              initial={{ opacity: 0, scale: 0.85, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: si * 0.035, duration: 0.25, ease: 'easeOut' }}
                              className={cn(
                                'inline-block whitespace-nowrap rounded-full border bg-base/50 backdrop-blur-sm px-4 py-2 font-nav text-[13px] font-semibold transition-all duration-300',
                                activeAccent.chipPopup, activeAccent.chipHover
                              )}
                            >
                              {sk.name}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>

        </div>{/* end hover wrapper */}
      </div>
    </Section>
  );
}
