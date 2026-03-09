import { describe, it, expect } from 'vitest';

describe('OG Image module', () => {
  it('exports alt string containing "Akhila Susarla"', async () => {
    const mod = await import('@/app/opengraph-image');
    expect(mod.alt).toContain('Akhila Susarla');
  });

  it('exports size with width 1200 and height 630', async () => {
    const mod = await import('@/app/opengraph-image');
    expect(mod.size).toEqual({ width: 1200, height: 630 });
  });

  it('exports contentType as image/png', async () => {
    const mod = await import('@/app/opengraph-image');
    expect(mod.contentType).toBe('image/png');
  });

  it('exports a default async function', async () => {
    const mod = await import('@/app/opengraph-image');
    expect(typeof mod.default).toBe('function');
  });
});
