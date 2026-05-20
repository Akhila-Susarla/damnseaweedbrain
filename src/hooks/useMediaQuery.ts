'use client';

import { useSyncExternalStore } from 'react';

function getMatchMedia(): typeof window.matchMedia | null {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null;
  }
  return window.matchMedia.bind(window);
}

function getServerSnapshot(defaultValue: boolean): boolean {
  return defaultValue;
}

export function useMediaQuery(query: string, defaultValue = false): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const matchMedia = getMatchMedia();
      if (!matchMedia) {
        return () => {};
      }

      const mediaQueryList = matchMedia(query);
      const handler = () => onStoreChange();

      mediaQueryList.addEventListener('change', handler);
      return () => {
        mediaQueryList.removeEventListener('change', handler);
      };
    },
    () => {
      const matchMedia = getMatchMedia();
      return matchMedia ? matchMedia(query).matches : defaultValue;
    },
    () => getServerSnapshot(defaultValue)
  );
}
