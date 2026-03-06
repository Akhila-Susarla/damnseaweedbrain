'use client';

import { useState, useCallback } from 'react';
import type { DialogueSequence, DialogueLine } from '@/data/types';

interface UseDialogueReturn {
  currentLine: DialogueLine | null;
  lineIndex: number;
  totalLines: number;
  advance: () => void;
  skip: () => void;
  isComplete: boolean;
  reset: () => void;
}

export function useDialogue(sequence: DialogueSequence): UseDialogueReturn {
  const [lineIndex, setLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentLine = isComplete ? null : sequence.lines[lineIndex] ?? null;
  const totalLines = sequence.lines.length;

  const advance = useCallback(() => {
    if (isComplete) return;
    if (lineIndex < sequence.lines.length - 1) {
      setLineIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [isComplete, lineIndex, sequence.lines.length]);

  const skip = useCallback(() => {
    setIsComplete(true);
  }, []);

  const reset = useCallback(() => {
    setLineIndex(0);
    setIsComplete(false);
  }, []);

  return { currentLine, lineIndex, totalLines, advance, skip, isComplete, reset };
}
