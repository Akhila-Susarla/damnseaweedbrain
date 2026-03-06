import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDialogue } from '@/hooks/useDialogue';
import type { DialogueSequence } from '@/data/types';

const mockSequence: DialogueSequence = {
  id: 'test-seq',
  section: 'hero',
  type: 'intro',
  lines: [
    { id: 'line-1', character: 'dazai', expression: 'mysterious', text: 'First line.' },
    { id: 'line-2', character: 'dazai', expression: 'smirk', text: 'Second line.' },
    { id: 'line-3', character: 'dazai', expression: 'neutral', text: 'Third line.' },
  ],
};

describe('useDialogue', () => {
  it('starts at line index 0 with isComplete=false', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));
    expect(result.current.lineIndex).toBe(0);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.currentLine).toEqual(mockSequence.lines[0]);
  });

  it('advance() moves to next line and updates currentLine', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));

    act(() => {
      result.current.advance();
    });

    expect(result.current.lineIndex).toBe(1);
    expect(result.current.currentLine).toEqual(mockSequence.lines[1]);
    expect(result.current.isComplete).toBe(false);
  });

  it('advance() on last line sets isComplete=true', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));

    // Advance to last line
    act(() => {
      result.current.advance();
    });
    act(() => {
      result.current.advance();
    });

    // Now on last line (index 2), advance again
    act(() => {
      result.current.advance();
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentLine).toBeNull();
  });

  it('skip() immediately sets isComplete=true', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));

    act(() => {
      result.current.skip();
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentLine).toBeNull();
  });

  it('reset() sets lineIndex back to 0 and isComplete to false', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));

    act(() => {
      result.current.skip();
    });
    expect(result.current.isComplete).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.lineIndex).toBe(0);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.currentLine).toEqual(mockSequence.lines[0]);
  });

  it('reports correct totalLines', () => {
    const { result } = renderHook(() => useDialogue(mockSequence));
    expect(result.current.totalLines).toBe(3);
  });
});
