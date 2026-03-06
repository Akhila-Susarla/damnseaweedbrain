import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTilt } from '@/hooks/useTilt';

describe('useTilt', () => {
  it('returns rotateX=0, rotateY=0 initially', () => {
    const { result } = renderHook(() => useTilt());
    // Initially should have identity transform
    expect(result.current.style.transform).toContain('rotateX(0deg)');
    expect(result.current.style.transform).toContain('rotateY(0deg)');
  });

  it('calculates ~0,0 rotation for mouse at center of element', () => {
    const { result } = renderHook(() => useTilt({ maxAngle: 15 }));

    // Create a mock element with getBoundingClientRect
    const mockElement = document.createElement('div');
    Object.defineProperty(mockElement, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 200, height: 200, right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {} }),
    });

    // Assign mock element to ref
    (result.current.ref as { current: HTMLElement | null }).current = mockElement;

    // Simulate mouse move at center (100, 100) of a 200x200 element
    act(() => {
      result.current.handlers.onMouseMove({
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent);
    });

    // At center, rotation should be approximately 0
    expect(result.current.style.transform).toContain('rotateX(0deg)');
    expect(result.current.style.transform).toContain('rotateY(0deg)');
  });

  it('calculates correct rotation for mouse at top-left corner', () => {
    const { result } = renderHook(() => useTilt({ maxAngle: 15 }));

    const mockElement = document.createElement('div');
    Object.defineProperty(mockElement, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 200, height: 200, right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {} }),
    });

    (result.current.ref as { current: HTMLElement | null }).current = mockElement;

    // Mouse at top-left (0, 0)
    act(() => {
      result.current.handlers.onMouseMove({
        clientX: 0,
        clientY: 0,
      } as React.MouseEvent);
    });

    // Top-left: y=0 => (0.5 - 0) * 15 * 2 = 15 (positive rotateX)
    // x=0 => (0 - 0.5) * 15 * 2 = -15 (negative rotateY)
    expect(result.current.style.transform).toContain('rotateX(15deg)');
    expect(result.current.style.transform).toContain('rotateY(-15deg)');
  });

  it('returns 0,0 when mouse leaves element', () => {
    const { result } = renderHook(() => useTilt({ maxAngle: 15 }));

    const mockElement = document.createElement('div');
    Object.defineProperty(mockElement, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 200, height: 200, right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {} }),
    });

    (result.current.ref as { current: HTMLElement | null }).current = mockElement;

    // First move mouse
    act(() => {
      result.current.handlers.onMouseMove({
        clientX: 50,
        clientY: 50,
      } as React.MouseEvent);
    });

    // Then leave
    act(() => {
      result.current.handlers.onMouseLeave();
    });

    expect(result.current.style.transform).toContain('rotateX(0deg)');
    expect(result.current.style.transform).toContain('rotateY(0deg)');
  });
});
