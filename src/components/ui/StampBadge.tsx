'use client';

import { cn } from '@/lib/utils';

interface StampBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  Current: 'border-gold text-gold',
  Completed: 'border-teal text-teal',
  Published: 'border-teal text-teal',
  Deployed: 'border-gold text-gold',
  Prototype: 'border-parchment/50 text-parchment/60',
  'In Progress': 'border-teal text-teal',
};

export default function StampBadge({ status, className }: StampBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block border-3 font-nav text-sm font-bold uppercase tracking-widest',
        'px-3 py-1 rotate-[-3deg] opacity-80 select-none',
        statusStyles[status] ?? 'border-parchment/50 text-parchment/60',
        className
      )}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}
