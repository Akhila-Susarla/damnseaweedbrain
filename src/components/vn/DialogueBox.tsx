'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
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

  const completeTyping = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
  }, []);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // If reduced motion or not typing, show full text immediately
    if (reducedMotion || !isTyping) {
      el.textContent = text;
      onComplete?.();
      return;
    }

    // Create typewriter animation
    el.textContent = '';
    const chars = text.split('');
    const tl = gsap.timeline({
      onComplete: () => {
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
      className={`relative cursor-pointer select-none ${className}`}
      onClick={handleClick}
      role="log"
      aria-live="polite"
    >
      {/* Dazai name label */}
      <span className="block font-mono text-xs text-parchment/40 mb-1 tracking-wider">
        DAZAI
      </span>

      {/* Handwritten-note speech bubble */}
      <div
        className="font-caveat text-lg md:text-xl leading-relaxed text-parchment/90"
        style={{
          background: 'rgba(196, 184, 168, 0.08)',
          border: '1.5px solid rgba(196, 184, 168, 0.25)',
          borderRadius: '4px 12px 12px 4px',
          padding: '1rem 1.25rem',
          transform: 'rotate(-0.5deg)',
          boxShadow:
            'inset 0 0 0 1px rgba(196, 184, 168, 0.05), 2px 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <p ref={textRef} aria-label={text}>
          {reducedMotion || !isTyping ? text : ''}
        </p>
      </div>
    </div>
  );
}
