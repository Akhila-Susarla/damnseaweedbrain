'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DialogueEngine from './DialogueEngine';
import { usePortfolioStore } from '@/lib/store';
import aboutTransition from '@/data/dialogue/about-transition.json';
import abilitiesTransition from '@/data/dialogue/abilities-transition.json';
import casefilesTransition from '@/data/dialogue/casefiles-transition.json';
import intelTransition from '@/data/dialogue/intel-transition.json';
import socialTransition from '@/data/dialogue/social-transition.json';
import type { DialogueSequence } from '@/data/types';

gsap.registerPlugin(ScrollTrigger);

interface QueueEntry {
  sectionId: string;
  sequence: DialogueSequence;
}

const sectionDialogues: QueueEntry[] = [
  { sectionId: 'about', sequence: aboutTransition as DialogueSequence },
  { sectionId: 'abilities', sequence: abilitiesTransition as DialogueSequence },
  { sectionId: 'case-files', sequence: casefilesTransition as DialogueSequence },
  { sectionId: 'intel', sequence: intelTransition as DialogueSequence },
  { sectionId: 'social', sequence: socialTransition as DialogueSequence },
];

export default function DialogueOverlay() {
  const [activeDialogue, setActiveDialogue] = useState<QueueEntry | null>(null);
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const playedRef = useRef<Set<string>>(new Set());
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  // Set up ScrollTriggers for each section — enqueue dialogue when section enters
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    sectionDialogues.forEach((entry) => {
      const trigger = ScrollTrigger.create({
        trigger: `#${entry.sectionId}`,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (playedRef.current.has(entry.sectionId)) return;
          playedRef.current.add(entry.sectionId);
          setQueue((prev) => [...prev, entry]);
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // When queue has items and nothing is active, pop the next one
  useEffect(() => {
    if (activeDialogue || queue.length === 0) return;
    const [next, ...rest] = queue;
    setActiveDialogue(next);
    setQueue(rest);
  }, [activeDialogue, queue]);

  const handleComplete = useCallback(() => {
    setActiveDialogue(null);
  }, []);

  return (
    <AnimatePresence>
      {activeDialogue && (
        <motion.div
          key={activeDialogue.sectionId}
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
          style={{ willChange: 'opacity' }}
          data-testid={`section-dialogue-${activeDialogue.sectionId}`}
        >
          {/* Subtle vignette to draw attention to dialogue */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(10,14,26,0.5) 0%, rgba(10,14,26,0.15) 30%, transparent 50%)',
            }}
          />
          <div className="pointer-events-auto">
            <DialogueEngine
              sequence={activeDialogue.sequence}
              onComplete={handleComplete}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
