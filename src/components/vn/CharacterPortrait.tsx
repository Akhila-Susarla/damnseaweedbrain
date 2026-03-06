'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePortfolioStore } from '@/lib/store';
import Image from 'next/image';
import type { DazaiExpression } from '@/data/types';

interface CharacterPortraitProps {
  expression: DazaiExpression;
  className?: string;
}

/**
 * Maps expressions to portrait images and CSS mood adjustments.
 * Uses actual BSD Dazai sprites with subtle filter shifts per expression.
 */
const expressionConfig: Record<DazaiExpression, { src: string; filter?: string }> = {
  neutral: { src: '/characters/dazai/anime.png' },
  smirk: { src: '/characters/dazai/neutral.png' },
  laugh: { src: '/characters/dazai/neutral.png', filter: 'brightness(1.08) saturate(1.1)' },
  serious: { src: '/characters/dazai/anime.png', filter: 'brightness(0.85) contrast(1.15)' },
  annoyed: { src: '/characters/dazai/anime.png', filter: 'brightness(0.9) saturate(0.85)' },
  mysterious: { src: '/characters/dazai/smirk.png' },
};

export default function CharacterPortrait({ expression, className = '' }: CharacterPortraitProps) {
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const config = expressionConfig[expression];

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={expression}
          className="relative w-full h-full"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
        >
          <Image
            src={config.src}
            alt=""
            fill
            className="object-contain object-bottom drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            style={{ filter: config.filter }}
            sizes="(max-width: 640px) 120px, 200px"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
