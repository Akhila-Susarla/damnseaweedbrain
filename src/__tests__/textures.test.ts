import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const texturesCSS = readFileSync(
  join(process.cwd(), 'src/styles/textures.css'),
  'utf-8'
);

describe('BSD Texture CSS', () => {
  const requiredClasses = [
    '.texture-paper',
    '.texture-bandage',
    '.stamp-classified',
    '.texture-ink',
    '.texture-aged-edge',
    '.glow-ability',
  ];

  it.each(requiredClasses)('defines %s class', (className) => {
    expect(texturesCSS).toContain(className);
  });

  it('documents feTurbulence fractalNoise design origin for paper texture', () => {
    // Paper texture uses CSS gradients for cross-browser reliability,
    // but the design note references the original SVG filter approach.
    expect(texturesCSS).toContain('feTurbulence');
    expect(texturesCSS).toContain('fractalNoise');
  });

  it('does not reference external image URLs', () => {
    const externalUrlPattern = /url\(["']?https?:/;
    expect(texturesCSS).not.toMatch(externalUrlPattern);
  });

  it('respects prefers-reduced-motion', () => {
    expect(texturesCSS).toContain('prefers-reduced-motion');
  });
});
