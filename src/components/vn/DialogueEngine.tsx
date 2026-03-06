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

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skip();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isTyping) {
          setIsTyping(true);
          advance();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skip, advance, isTyping]);

  const handleTypingComplete = useCallback(() => {
    setIsTyping(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!isTyping) {
      setIsTyping(true);
      advance();
    }
  }, [isTyping, advance]);

  if (isComplete || !currentLine) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentLine.id}
        className={`fixed inset-x-0 bottom-0 z-50 pointer-events-auto ${className}`}
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: 10 }}
        transition={{ duration: reducedMotion ? 0 : 0.3 }}
        onClick={handleClick}
        role="region"
        aria-label="Dialogue"
      >
        <div className="relative max-w-4xl mx-auto px-4 pb-6 pt-2">
          <div className="flex items-end gap-4">
            {/* Character portrait — rises from the panel */}
            <CharacterPortrait
              expression={currentLine.expression}
              className="w-28 h-44 sm:w-36 sm:h-56 md:w-44 md:h-64 -mb-6 relative z-10"
            />

            {/* Text panel */}
            <div
              className="flex-1 min-w-0 px-5 py-4 sm:px-6 sm:py-5 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(10,14,26,0.92) 0%, rgba(10,14,26,0.82) 100%)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderBottom: '2px solid rgba(212,175,55,0.2)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 -8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.08)',
              }}
            >
              <DialogueBox
                text={currentLine.text}
                isTyping={isTyping}
                onComplete={handleTypingComplete}
              />
            </div>
          </div>
        </div>

        {/* Skip hint */}
        <div className="absolute top-2 right-4 font-mono text-[9px] tracking-wider text-parchment/25">
          ESC to skip
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
