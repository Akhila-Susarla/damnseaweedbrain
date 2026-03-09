import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';

describe('Robots', () => {
  it('allows all user agents on /', () => {
    const result = robots();
    expect(result.rules).toBeDefined();
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.userAgent).toBe('*');
    expect(rules.allow).toBe('/');
  });

  it('includes sitemap URL for damnseaweedbrain.com', () => {
    const result = robots();
    expect(result.sitemap).toBe('https://damnseaweedbrain.com/sitemap.xml');
  });
});
