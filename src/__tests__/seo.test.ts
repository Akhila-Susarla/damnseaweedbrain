import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import { usePortfolioStore } from '@/lib/store';

// Mock lenis/react
vi.mock('lenis/react', () => ({
  useLenis: vi.fn(() => null),
  ReactLenis: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock @gsap/react
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}));

// Mock gsap
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
    utils: { toArray: vi.fn(() => []) },
  },
}));

// Mock gsap/ScrollTrigger
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    update: vi.fn(),
    batch: vi.fn(),
  },
}));

import Home from '@/app/page';

describe('SEO heading hierarchy', () => {
  beforeEach(() => {
    usePortfolioStore.setState({ currentSection: 'hero', reducedMotion: true });
  });

  afterEach(() => {
    cleanup();
  });

  it('has exactly one h1 element on the page', () => {
    const { container } = render(createElement(Home));
    const h1s = container.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  it('has h2 elements for each main section', () => {
    const { container } = render(createElement(Home));
    const h2s = container.querySelectorAll('h2');
    // At minimum one h2 per non-hero section (about, abilities, case-files, intel, social)
    expect(h2s.length).toBeGreaterThanOrEqual(5);
  });

  it('has no heading level skips (h1->h3 without h2)', () => {
    const { container } = render(createElement(Home));
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const levels = Array.from(headings).map((h) => parseInt(h.tagName[1], 10));

    for (let i = 1; i < levels.length; i++) {
      const jump = levels[i] - levels[i - 1];
      // Heading can go deeper by at most 1 level, or go back up any amount
      expect(jump, `Heading skip from h${levels[i - 1]} to h${levels[i]} at index ${i}`).toBeLessThanOrEqual(1);
    }
  });
});
