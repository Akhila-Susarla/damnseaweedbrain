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

// Import page component after mocks
import Home from '@/app/page';

describe('Page section assembly', () => {
  beforeEach(() => {
    usePortfolioStore.setState({ currentSection: 'hero', reducedMotion: true });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders all 6 section elements with correct IDs', () => {
    const { container } = render(createElement(Home));

    const expectedIds = ['hero', 'about', 'abilities', 'case-files', 'intel', 'social'];
    for (const id of expectedIds) {
      const el = container.querySelector(`#${id}`);
      expect(el, `Section #${id} should exist`).toBeTruthy();
    }
  });

  it('sections appear in correct DOM order', () => {
    const { container } = render(createElement(Home));

    const expectedOrder = ['hero', 'about', 'abilities', 'case-files', 'intel', 'social'];
    const allSections = container.querySelectorAll('[id]');
    const sectionIds = Array.from(allSections)
      .map((el) => el.id)
      .filter((id) => expectedOrder.includes(id));

    expect(sectionIds).toEqual(expectedOrder);
  });
});
