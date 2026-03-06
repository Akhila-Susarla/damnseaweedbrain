'use client';

import { cn } from '@/lib/utils';
import type { CaseStatus } from '@/data/types';

interface StampBadgeProps {
  status: CaseStatus;
  className?: string;
}

const statusStyles: Record<CaseStatus, string> = {
  Classified: 'border-classified-red text-classified-red',
  Solved: 'border-teal text-teal',
  Active: 'border-gold text-gold',
};

export default function StampBadge({ status, className }: StampBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block border-3 font-mono text-sm font-bold uppercase tracking-widest',
        'px-3 py-1 rotate-[-3deg] opacity-80 select-none',
        statusStyles[status],
        className
      )}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}
