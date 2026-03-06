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

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  // On mount: lock scroll, show dialogue after brief delay
  useEffect(() => {
    if (hasPlayed) return;

    const timer = setTimeout(() => {
      lenisRef.current?.stop();
      setDialogueActive(true);
      setIsVisible(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      lenisRef.current?.start();
      setDialogueActive(false);
    };
  }, [hasPlayed, setDialogueActive]);

  const handleComplete = useCallback(() => {
    lenisRef.current?.start();
    setDialogueActive(false);
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
        <>
          {/* Subtle dark vignette overlay to focus attention on dialogue */}
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
            style={{
              background: 'linear-gradient(to top, rgba(10,14,26,0.7) 0%, rgba(10,14,26,0.2) 40%, transparent 60%)',
            }}
          />
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35 }}
            data-testid="hero-intro"
          >
            <DialogueEngine
              sequence={heroSequence}
              onComplete={handleComplete}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
