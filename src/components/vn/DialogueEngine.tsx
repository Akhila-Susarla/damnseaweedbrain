'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useDialogue } from '@/hooks/useDialogue';
import { usePortfolioStore } from '@/lib/store';
import CharacterPortrait from './CharacterPortrait';
import DialogueBox from './DialogueBox';
import type { DialogueSequence } from '@/data/types';

interface DialogueEngineProps {
  sequence: DialogueSequence;
  onComplete: () => void;
  className?: string;
}

export default function DialogueEngine({ sequence, onComplete, className = '' }: DialogueEngineProps) {
  const { currentLine, advance, skip, isComplete } = useDialogue(sequence);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const [isTyping, setIsTyping] = useState(true);

  // When dialogue completes, notify parent
  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  // ESC key to skip entire sequence
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skip]);

  const handleTypingComplete = useCallback(() => {
    setIsTyping(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!isTyping) {
      // Typing complete -- advance to next line
      setIsTyping(true);
      advance();
    }
    // If still typing, DialogueBox handles the click-to-complete internally
  }, [isTyping, advance]);

  if (isComplete || !currentLine) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentLine.id}
        className={`flex flex-col sm:flex-row items-start gap-3 sm:gap-4 ${className}`}
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
        onClick={handleClick}
        role="region"
        aria-label="Dialogue"
      >
        <CharacterPortrait expression={currentLine.expression} />
        <DialogueBox
          text={currentLine.text}
          isTyping={isTyping}
          onComplete={handleTypingComplete}
        />
      </motion.div>
    </AnimatePresence>
  );
}
