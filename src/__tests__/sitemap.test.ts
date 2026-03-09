import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('Sitemap', () => {
  it('returns array with single entry for damnseaweedbrain.com', () => {
    const result = sitemap();
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('https://damnseaweedbrain.com');
  });

  it('has changeFrequency monthly and priority 1', () => {
    const result = sitemap();
    expect(result[0].changeFrequency).toBe('monthly');
    expect(result[0].priority).toBe(1);
  });
});
