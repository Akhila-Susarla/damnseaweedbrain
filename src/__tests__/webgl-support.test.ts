import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useWebGLSupport, _resetWebGLCache } from '@/hooks/useWebGLSupport';

describe('useWebGLSupport', () => {
  beforeEach(() => {
    _resetWebGLCache();
    vi.restoreAllMocks();
  });

  it('returns a boolean', () => {
    const { result } = renderHook(() => useWebGLSupport());
    expect(typeof result.current).toBe('boolean');
  });

  it('returns false when canvas.getContext returns null', () => {
    // Mock createElement to return a canvas whose getContext returns null
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'canvas') {
        const canvas = originalCreateElement('canvas');
        vi.spyOn(canvas, 'getContext').mockReturnValue(null);
        return canvas;
      }
      return originalCreateElement(tag);
    });

    const { result } = renderHook(() => useWebGLSupport());
    expect(result.current).toBe(false);
  });
});
