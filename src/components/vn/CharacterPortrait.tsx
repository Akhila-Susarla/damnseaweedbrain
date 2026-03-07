'use client';

import dynamic from 'next/dynamic';
import type { DazaiExpression } from '@/data/types';

const DazaiSprite = dynamic(() => import('./DazaiSprite'), { ssr: false });

interface CharacterPortraitProps {
  expression: DazaiExpression;
  className?: string;
}

export default function CharacterPortrait({ expression, className = '' }: CharacterPortraitProps) {
  return (
    <div className={`flex-shrink-0 ${className}`} aria-hidden="true">
      <DazaiSprite expression={expression} className="w-full h-full" />
    </div>
  );
}
