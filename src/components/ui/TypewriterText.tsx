'use client';

import { useRef, createElement } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePortfolioStore } from '@/lib/store';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function TypewriterText({
  text,
  className,
  delay = 0,
  as: tag = 'span',
}: TypewriterTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(() => {
    if (!ref.current || reducedMotion) return;

    const chars = text.split('');
    ref.current.textContent = '';

    const tl = gsap.timeline({ delay });
    chars.forEach((char, i) => {
      tl.to(ref.current!, {
        duration: 0.05,
        onComplete: () => {
          if (ref.current) ref.current.textContent = text.slice(0, i + 1);
        },
      });
    });

    return () => {
      tl.kill();
    };
  }, { dependencies: [text, delay, reducedMotion] });

  return createElement(
    tag,
    { ref, className, 'aria-label': text },
    reducedMotion ? text : ''
  );
}
