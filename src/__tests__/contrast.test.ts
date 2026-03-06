import { describe, it, expect } from 'vitest';

/**
 * Calculate relative luminance per WCAG 2.0
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  );
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('WCAG AA Contrast Compliance', () => {
  const midnight = '#0a0e1a';

  const normalTextPairs: [string, string, string][] = [
    ['parchment on midnight', '#e8e0d4', midnight],
    ['gold on midnight', '#d4af37', midnight],
    ['gold-muted on midnight', '#c9a84c', midnight],
    ['teal on midnight', '#2dd4bf', midnight],
    ['teal-muted on midnight', '#5eead4', midnight],
    ['classified-red on midnight', '#ef4444', midnight],
  ];

  describe('Normal text (4.5:1 minimum)', () => {
    it.each(normalTextPairs)(
      '%s meets WCAG AA 4.5:1',
      (_name, fg, bg) => {
        const ratio = getContrastRatio(fg, bg);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      }
    );
  });

  describe('Large text (3:1 minimum)', () => {
    it('parchment-dim on midnight meets WCAG AA 3:1 for large text', () => {
      const ratio = getContrastRatio('#c4b8a8', midnight);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });
  });

  it('getContrastRatio returns correct value for known pair', () => {
    // White on black should be 21:1
    const ratio = getContrastRatio('#ffffff', '#000000');
    expect(ratio).toBeCloseTo(21, 0);
  });
});
