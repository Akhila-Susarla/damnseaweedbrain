'use client';

import { cn } from '@/lib/utils';
import { useTilt } from '@/hooks/useTilt';
import { usePortfolioStore } from '@/lib/store';

interface TiltCardProps {
  children: React.ReactNode;
  maxAngle?: number;
  className?: string;
  disabled?: boolean;
}

export default function TiltCard({
  children,
  maxAngle = 12,
  className,
  disabled = false,
}: TiltCardProps) {
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const { ref, style, handlers } = useTilt({ maxAngle });

  const isDisabled = disabled || reducedMotion;

  return (
    <div
      ref={isDisabled ? undefined : ref as React.RefObject<HTMLDivElement | null>}
      className={cn(className)}
      style={isDisabled ? undefined : style}
      onMouseMove={isDisabled ? undefined : handlers.onMouseMove}
      onMouseLeave={isDisabled ? undefined : handlers.onMouseLeave}
    >
      {children}
    </div>
  );
}
