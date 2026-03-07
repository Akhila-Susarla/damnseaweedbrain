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
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reducedMotion ? undefined : { opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.3 }}
        style={{ willChange: 'opacity' }}
        onClick={handleClick}
        role="region"
        aria-label="Dialogue"
      >
        <div className="max-w-4xl mx-auto px-4 pb-6">
          <div
            className="flex items-start gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4 rounded-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(10,14,26,0.92) 0%, rgba(10,14,26,0.82) 100%)',
              border: '1px solid rgba(212,175,55,0.15)',
              borderBottom: '2px solid rgba(212,175,55,0.2)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 -8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.08)',
            }}
          >
            {/* Character portrait — inside the panel */}
            <div className="w-[72px] h-[100px] sm:w-[100px] sm:h-[144px] md:w-[115px] md:h-[158px] flex-shrink-0 relative overflow-hidden">
              <CharacterPortrait
                expression={currentLine.expression}
                className="absolute inset-0 w-[200%] h-[200%] -translate-x-[25%] -translate-y-[25%]"
              />
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
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
