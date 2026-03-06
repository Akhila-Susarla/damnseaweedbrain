import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDialogue } from '@/hooks/useDialogue';
import type { DialogueSequence } from '@/data/types';

const mockSequence: DialogueSequence = {
  id: 'skip-test',
  section: 'hero',
  type: 'intro',
  lines: [
    { id: 'skip-1', character: 'dazai', expression: 'mysterious', text: 'Line one.' },
    { id: 'skip-2', character: 'dazai', expression: 'smirk', text: 'Line two.' },
    { id: 'skip-3', character: 'dazai', expression: 'neutral', text: 'Line three.' },
  ],
};

describe('Dialogue skip behavior', () => {
  it('skip() immediately ends dialogue regardless of current position', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));

    // Advance once to be mid-sequence
    act(() => {
      result.current.advance();
    });
    expect(result.current.lineIndex).toBe(1);
    expect(result.current.isComplete).toBe(false);

    // Skip should immediately complete
    act(() => {
      result.current.skip();
    });
    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentLine).toBeNull();
  });

  it('skip() works even on the very first line', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));

    act(() => {
      result.current.skip();
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentLine).toBeNull();
  });

  it('advance() does nothing after skip()', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));

    act(() => {
      result.current.skip();
    });

    const completedState = result.current.isComplete;
    act(() => {
      result.current.advance();
    });

    // Still complete, no errors
    expect(result.current.isComplete).toBe(completedState);
    expect(result.current.currentLine).toBeNull();
  });

  it('content remains accessible after dialogue completes via advance', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));

    // Advance through all lines
    act(() => {
      result.current.advance();
    });
    act(() => {
      result.current.advance();
    });
    act(() => {
      result.current.advance();
    });

    expect(result.current.isComplete).toBe(true);
    // totalLines remains accessible for reference
    expect(result.current.totalLines).toBe(3);
  });
});
