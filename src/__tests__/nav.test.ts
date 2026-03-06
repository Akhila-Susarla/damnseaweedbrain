import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
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
  },
}));

// Mock gsap/ScrollTrigger
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    update: vi.fn(),
  },
}));

// Import after mocks
import NavPanel from '@/components/nav/NavPanel';

describe('NavPanel', () => {
  beforeEach(() => {
    usePortfolioStore.setState({ currentSection: 'hero', reducedMotion: false });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders 6 navigation buttons on desktop', () => {
    render(createElement(NavPanel));

    const buttons = screen.getAllByRole('button');
    // 6 desktop + 6 mobile = 12 total buttons
    expect(buttons).toHaveLength(12);
  });

  it('renders correct section labels', () => {
    render(createElement(NavPanel));

    const expectedLabels = ['Hero', 'About', 'Abilities', 'Case Files', 'Intel', 'Social'];
    expectedLabels.forEach((label) => {
      const buttons = screen.getAllByText(label);
      // Each label appears twice (desktop + mobile)
      expect(buttons.length).toBe(2);
    });
  });

  it('each button has correct aria-label', () => {
    render(createElement(NavPanel));

    const expectedAriaLabels = [
      'Navigate to Hero',
      'Navigate to About',
      'Navigate to Abilities',
      'Navigate to Case Files',
      'Navigate to Intel',
      'Navigate to Social',
    ];

    expectedAriaLabels.forEach((ariaLabel) => {
      const buttons = screen.getAllByLabelText(ariaLabel);
      // Each aria-label appears twice (desktop + mobile)
      expect(buttons.length).toBe(2);
    });
  });

  it('active section gets gold styling class', () => {
    usePortfolioStore.setState({ currentSection: 'about' });
    render(createElement(NavPanel));

    const aboutButtons = screen.getAllByLabelText('Navigate to About');
    aboutButtons.forEach((btn) => {
      expect(btn.className).toContain('text-gold');
    });

    // Non-active section should not have gold
    const heroButtons = screen.getAllByLabelText('Navigate to Hero');
    heroButtons.forEach((btn) => {
      expect(btn.className).toContain('text-parchment/50');
      expect(btn.className).not.toContain(' text-gold');
    });
  });

  it('renders two nav landmarks (desktop + mobile)', () => {
    render(createElement(NavPanel));

    const navElements = screen.getAllByRole('navigation');
    expect(navElements).toHaveLength(2);
    navElements.forEach((nav) => {
      expect(nav.getAttribute('aria-label')).toBe('Section navigation');
    });
  });
});
