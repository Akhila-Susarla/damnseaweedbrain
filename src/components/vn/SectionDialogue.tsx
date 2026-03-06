'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DialogueEngine from './DialogueEngine';
import { usePortfolioStore } from '@/lib/store';
import type { DialogueSequence } from '@/data/types';

gsap.registerPlugin(ScrollTrigger);

interface SectionDialogueProps {
  sectionId: string;
  dialogueData: DialogueSequence;
  className?: string;
}

export default function SectionDialogue({ sectionId, dialogueData, className = '' }: SectionDialogueProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useEffect(() => {
    if (hasPlayed) return;

    triggerRef.current = ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        setIsVisible(true);
      },
    });

    return () => {
      triggerRef.current?.kill();
    };
  }, [sectionId, hasPlayed]);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      setHasPlayed(true);
    }, 300);
  };

  if (hasPlayed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`w-full max-w-lg mx-auto mb-4 ${className}`}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          data-testid={`section-dialogue-${sectionId}`}
        >
          <DialogueEngine
            sequence={dialogueData}
            onComplete={handleComplete}
            compact
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
