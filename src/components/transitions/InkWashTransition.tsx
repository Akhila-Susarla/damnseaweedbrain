'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

interface InkWashTransitionProps {
  triggerSelector: string;
  className?: string;
}

// Organic clip-path keyframes for each tendril layer
const tendrilPaths = [
  // Tendril 1: sweeps from left edge
  {
    start:
      'polygon(0% 0%, 2% 20%, 0% 40%, 3% 60%, 0% 80%, 2% 100%, 0% 100%, 0% 0%)',
    mid:
      'polygon(0% 0%, 35% 15%, 28% 45%, 40% 55%, 30% 75%, 35% 100%, 0% 100%, 0% 0%)',
    end:
      'polygon(0% 0%, 2% 20%, 0% 40%, 3% 60%, 0% 80%, 2% 100%, 0% 100%, 0% 0%)',
  },
  // Tendril 2: sweeps from right edge
  {
    start:
      'polygon(100% 0%, 98% 25%, 100% 50%, 97% 75%, 100% 100%, 100% 100%, 100% 0%)',
    mid:
      'polygon(100% 0%, 65% 20%, 70% 50%, 60% 70%, 68% 90%, 100% 100%, 100% 0%)',
    end:
      'polygon(100% 0%, 98% 25%, 100% 50%, 97% 75%, 100% 100%, 100% 100%, 100% 0%)',
  },
  // Tendril 3: sweeps from top
  {
    start:
      'polygon(0% 0%, 30% 2%, 50% 0%, 70% 3%, 100% 0%, 100% 0%, 0% 0%)',
    mid:
      'polygon(0% 0%, 25% 30%, 50% 25%, 75% 35%, 100% 0%, 100% 0%, 0% 0%)',
    end:
      'polygon(0% 0%, 30% 2%, 50% 0%, 70% 3%, 100% 0%, 100% 0%, 0% 0%)',
  },
  // Tendril 4: sweeps from bottom
  {
    start:
      'polygon(0% 100%, 25% 98%, 50% 100%, 75% 97%, 100% 100%, 100% 100%, 0% 100%)',
    mid:
      'polygon(0% 100%, 20% 70%, 45% 75%, 70% 65%, 100% 100%, 100% 100%, 0% 100%)',
    end:
      'polygon(0% 100%, 25% 98%, 50% 100%, 75% 97%, 100% 100%, 100% 100%, 0% 100%)',
  },
];

export default function InkWashTransition({
  triggerSelector,
  className,
}: InkWashTransitionProps) {
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const containerRef = useRef<HTMLDivElement>(null);
  const tendrilRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      tendrilRefs.current.forEach((el, i) => {
        if (!el) return;
        const paths = tendrilPaths[i];
        const delay = i * 0.05; // stagger for organic feel

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerSelector,
            start: 'top bottom',
            end: 'top center',
            scrub: 0.5,
          },
        });

        // Phase 1: tendrils expand inward (0 -> 0.5)
        tl.fromTo(
          el,
          {
            clipPath: paths.start,
            opacity: 0,
          },
          {
            clipPath: paths.mid,
            opacity: 0.7 + i * 0.05,
            duration: 0.5,
            delay,
            ease: 'power2.inOut',
          }
        );

        // Phase 2: tendrils recede (0.5 -> 1)
        tl.to(el, {
          clipPath: paths.end,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [triggerSelector, reducedMotion]);

  // Reduced motion: render nothing
  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
      }}
      aria-hidden="true"
    >
      {tendrilPaths.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            tendrilRefs.current[i] = el;
          }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#0c0c0c',
            opacity: 0,
            filter: `blur(${4 + i * 2}px)`,
            clipPath: tendrilPaths[i].start,
          }}
        />
      ))}
    </div>
  );
}
