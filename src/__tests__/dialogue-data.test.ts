import { describe, it, expect } from 'vitest';
import type { DialogueSequence, DialogueLine } from '@/data/types';

import heroIntro from '@/data/dialogue/hero-intro.json';
import aboutTransition from '@/data/dialogue/about-transition.json';
import abilitiesTransition from '@/data/dialogue/abilities-transition.json';
import casefilesTransition from '@/data/dialogue/casefiles-transition.json';
import intelTransition from '@/data/dialogue/intel-transition.json';
import socialTransition from '@/data/dialogue/social-transition.json';

const validExpressions = ['neutral', 'smirk', 'laugh', 'serious', 'annoyed', 'mysterious'];

function validateDialogueSequence(data: unknown): data is DialogueSequence {
  const seq = data as DialogueSequence;
  return (
    typeof seq.id === 'string' &&
    typeof seq.section === 'string' &&
    (seq.type === 'intro' || seq.type === 'transition') &&
    Array.isArray(seq.lines) &&
    seq.lines.length > 0 &&
    seq.lines.every(
      (line: DialogueLine) =>
        typeof line.id === 'string' &&
        line.character === 'dazai' &&
        validExpressions.includes(line.expression) &&
        typeof line.text === 'string' &&
        line.text.length > 0
    )
  );
}

describe('Dialogue JSON data files', () => {
  it('hero-intro.json has valid DialogueSequence schema', () => {
    expect(validateDialogueSequence(heroIntro)).toBe(true);
  });

  it('hero-intro.json has 3-5 lines with type "intro"', () => {
    expect(heroIntro.type).toBe('intro');
    expect(heroIntro.lines.length).toBeGreaterThanOrEqual(3);
    expect(heroIntro.lines.length).toBeLessThanOrEqual(5);
  });

  it('about-transition.json has valid schema with type "transition"', () => {
    expect(validateDialogueSequence(aboutTransition)).toBe(true);
    expect(aboutTransition.type).toBe('transition');
  });

  it('about-transition.json has 1-2 lines', () => {
    expect(aboutTransition.lines.length).toBeGreaterThanOrEqual(1);
    expect(aboutTransition.lines.length).toBeLessThanOrEqual(2);
  });

  it('abilities-transition.json has valid schema with type "transition"', () => {
    expect(validateDialogueSequence(abilitiesTransition)).toBe(true);
    expect(abilitiesTransition.type).toBe('transition');
  });

  it('abilities-transition.json has 1-2 lines', () => {
    expect(abilitiesTransition.lines.length).toBeGreaterThanOrEqual(1);
    expect(abilitiesTransition.lines.length).toBeLessThanOrEqual(2);
  });

  it('casefiles-transition.json has valid schema with type "transition"', () => {
    expect(validateDialogueSequence(casefilesTransition)).toBe(true);
    expect(casefilesTransition.type).toBe('transition');
  });

  it('casefiles-transition.json has 1-2 lines', () => {
    expect(casefilesTransition.lines.length).toBeGreaterThanOrEqual(1);
    expect(casefilesTransition.lines.length).toBeLessThanOrEqual(2);
  });

  it('intel-transition.json has valid schema with type "transition"', () => {
    expect(validateDialogueSequence(intelTransition)).toBe(true);
    expect(intelTransition.type).toBe('transition');
  });

  it('intel-transition.json has 1-2 lines', () => {
    expect(intelTransition.lines.length).toBeGreaterThanOrEqual(1);
    expect(intelTransition.lines.length).toBeLessThanOrEqual(2);
  });

  it('social-transition.json has valid schema with type "transition"', () => {
    expect(validateDialogueSequence(socialTransition)).toBe(true);
    expect(socialTransition.type).toBe('transition');
  });

  it('social-transition.json has 1-2 lines', () => {
    expect(socialTransition.lines.length).toBeGreaterThanOrEqual(1);
    expect(socialTransition.lines.length).toBeLessThanOrEqual(2);
  });

  it('all sequences have unique IDs', () => {
    const allSequences = [
      heroIntro,
      aboutTransition,
      abilitiesTransition,
      casefilesTransition,
      intelTransition,
      socialTransition,
    ];
    const ids = allSequences.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
