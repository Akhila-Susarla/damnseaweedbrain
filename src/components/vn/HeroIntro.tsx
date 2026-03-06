'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import DialogueEngine from './DialogueEngine';
import { usePortfolioStore } from '@/lib/store';
import heroIntroData from '@/data/dialogue/hero-intro.json';
import type { DialogueSequence } from '@/data/types';

const heroSequence = heroIntroData as DialogueSequence;

export default function HeroIntro() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();
  const setDialogueActive = usePortfolioStore((s) => s.setDialogueActive);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const lenisRef = useRef(lenis);

  // Keep ref in sync so cleanup always has latest lenis instance
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  // On mount: lock scroll, show dialogue
  useEffect(() => {
    if (hasPlayed) return;

    // Small delay to let page settle before locking
    const timer = setTimeout(() => {
      lenisRef.current?.stop();
      setDialogueActive(true);
      setIsVisible(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      // Safety: always unlock scroll if component unmounts unexpectedly
      lenisRef.current?.start();
      setDialogueActive(false);
    };
  }, [hasPlayed, setDialogueActive]);

  const handleComplete = useCallback(() => {
    lenisRef.current?.start();
    setDialogueActive(false);
    // Animate out, then mark as played
    setIsVisible(false);
    const timer = setTimeout(() => {
      setHasPlayed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [setDialogueActive]);

  if (hasPlayed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="w-full max-w-lg mx-auto mt-6"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
          data-testid="hero-intro"
        >
          <DialogueEngine
            sequence={heroSequence}
            onComplete={handleComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
