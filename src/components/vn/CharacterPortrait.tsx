'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePortfolioStore } from '@/lib/store';
import dynamic from 'next/dynamic';
import type { DazaiExpression } from '@/data/types';

const DazaiSprite = dynamic(() => import('./DazaiSprite'), { ssr: false });

interface CharacterPortraitProps {
  expression: DazaiExpression;
  className?: string;
}

export default function CharacterPortrait({ expression, className = '' }: CharacterPortraitProps) {
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  return (
    <div className={`relative flex-shrink-0 ${className}`} aria-hidden="true">
      <AnimatePresence mode="wait">
        <motion.div
          key={expression}
          className="relative w-full h-full"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
        >
          <DazaiSprite expression={expression} className="w-full h-full" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
