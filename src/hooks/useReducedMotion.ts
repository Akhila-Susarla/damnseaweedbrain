'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';

export function useReducedMotion() {
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const setReducedMotion = usePortfolioStore((s) => s.setReducedMotion);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);

    return () => mql.removeEventListener('change', handler);
  }, [setReducedMotion]);

  return reducedMotion;
}
