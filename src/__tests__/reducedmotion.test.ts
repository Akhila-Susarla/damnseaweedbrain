import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { usePortfolioStore } from '@/lib/store';

function createMockMQL(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  return {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
      listeners.push(handler);
    }),
    removeEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(handler);
      if (idx >= 0) listeners.splice(idx, 1);
    }),
    dispatchChange(newMatches: boolean) {
      listeners.forEach((fn) =>
        fn({ matches: newMatches } as MediaQueryListEvent)
      );
    },
    _listeners: listeners,
  };
}

describe('useReducedMotion', () => {
  let mockMQL: ReturnType<typeof createMockMQL>;

  beforeEach(() => {
    // Reset store
    usePortfolioStore.setState({ reducedMotion: false });
    mockMQL = createMockMQL(false);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMQL));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('syncs initial media query value (no reduced motion) to store', () => {
    mockMQL = createMockMQL(false);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMQL));

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
    expect(usePortfolioStore.getState().reducedMotion).toBe(false);
  });

  it('syncs initial media query value (reduced motion active) to store', () => {
    mockMQL = createMockMQL(true);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMQL));

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
    expect(usePortfolioStore.getState().reducedMotion).toBe(true);
  });

  it('updates store when media query changes', () => {
    mockMQL = createMockMQL(false);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMQL));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      mockMQL.dispatchChange(true);
    });

    expect(usePortfolioStore.getState().reducedMotion).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    mockMQL = createMockMQL(false);
    vi.stubGlobal('matchMedia', vi.fn(() => mockMQL));

    const { unmount } = renderHook(() => useReducedMotion());

    expect(mockMQL.addEventListener).toHaveBeenCalledTimes(1);
    unmount();
    expect(mockMQL.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
