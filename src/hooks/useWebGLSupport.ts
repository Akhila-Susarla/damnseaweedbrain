'use client';

import { useSyncExternalStore } from 'react';

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') || canvas.getContext('webgl');
    return gl !== null;
  } catch {
    return false;
  }
}

// Cache the result so we only probe once per page load
let cachedResult: boolean | null = null;

function getSnapshot(): boolean {
  if (cachedResult === null) {
    cachedResult = checkWebGL();
  }
  return cachedResult;
}

function getServerSnapshot(): boolean {
  // SSR: assume no WebGL
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function subscribe(onStoreChange: () => void): () => void {
  // WebGL support doesn't change at runtime; no-op subscription
  return () => {};
}

export function useWebGLSupport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Reset cached result (for testing only)
 */
export function _resetWebGLCache(): void {
  cachedResult = null;
}
