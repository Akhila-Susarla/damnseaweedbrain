'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';
import { usePortfolioStore } from '@/lib/store';

interface DialogueBoxProps {
  text: string;
  isTyping: boolean;
  onComplete?: () => void;
  className?: string;
}

export default function DialogueBox({ text, isTyping, onComplete, className = '' }: DialogueBoxProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const [showHint, setShowHint] = useState(false);

  const completeTyping = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
  }, []);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    setShowHint(false);

    if (reducedMotion || !isTyping) {
      el.textContent = text;
      setShowHint(true);
      onComplete?.();
      return;
    }

    el.textContent = '';
    const chars = text.split('');
    const tl = gsap.timeline({
      onComplete: () => {
        setShowHint(true);
        onComplete?.();
      },
    });

    chars.forEach((_, i) => {
      tl.to(el, {
        duration: 0.03,
        onComplete: () => {
          if (el) el.textContent = text.slice(0, i + 1);
        },
      });
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, [text, isTyping, reducedMotion, onComplete]);

  const handleClick = useCallback(() => {
    if (isTyping && timelineRef.current && timelineRef.current.progress() < 1) {
      completeTyping();
    }
  }, [isTyping, completeTyping]);

  return (
    <div
      className={`relative cursor-pointer select-none flex-1 min-w-0 ${className}`}
      onClick={handleClick}
      role="log"
      aria-live="polite"
    >
      {/* Name plate — case file label style */}
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block px-2.5 py-0.5 font-mono text-[10px] tracking-[0.2em] uppercase text-gold border border-gold/30 bg-gold/5">
          Dazai
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
      </div>

      {/* Dialogue text */}
      <p
        ref={textRef}
        className="font-caveat text-xl md:text-2xl leading-relaxed text-parchment/90 min-h-[2em]"
        aria-label={text}
      >
        {reducedMotion || !isTyping ? text : ''}
      </p>

      {/* Click to continue hint */}
      <div className="flex justify-end mt-2 h-5">
        {showHint && !isTyping && (
          <motion.span
            className="font-mono text-[10px] tracking-wider text-parchment/40 flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            click to continue
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >
              ▼
            </motion.span>
          </motion.span>
        )}
      </div>
    </div>
  );
}
