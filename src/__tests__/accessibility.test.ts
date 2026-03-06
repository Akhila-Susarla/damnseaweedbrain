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
    create: vi.fn(() => ({ kill: vi.fn() })),
    update: vi.fn(),
    batch: vi.fn(),
  },
}));

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  default: () => {
    const Stub = () => createElement('div', { 'data-testid': 'dynamic-stub' });
    return Stub;
  },
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => createElement('img', { ...props, fill: undefined }),
}));

// Mock motion/react
vi.mock('motion/react', () => {
  const filterProps = (props: any) => {
    const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
    return rest;
  };
  return {
    motion: {
      div: ({ children, ...props }: any) => createElement('div', { ...filterProps(props), key: undefined }, children),
      span: ({ children, ...props }: any) => createElement('span', { ...filterProps(props), key: undefined }, children),
      nav: ({ children, ...props }: any) => createElement('nav', { ...filterProps(props), key: undefined }, children),
      a: ({ children, ...props }: any) => createElement('a', { ...filterProps(props), key: undefined }, children),
      button: ({ children, ...props }: any) => createElement('button', { ...filterProps(props), key: undefined }, children),
      li: ({ children, ...props }: any) => createElement('li', { ...filterProps(props), key: undefined }, children),
      p: ({ children, ...props }: any) => createElement('p', { ...filterProps(props), key: undefined }, children),
      g: ({ children, ...props }: any) => createElement('g', { ...filterProps(props), key: undefined }, children),
    },
    AnimatePresence: ({ children }: any) => children,
    useScroll: vi.fn(() => ({ scrollYProgress: { get: () => 0, on: vi.fn() } })),
    useTransform: vi.fn(() => ({ get: () => 0, on: vi.fn() })),
    useMotionValueEvent: vi.fn(),
    useReducedMotion: vi.fn(() => false),
  };
});

import Home from '@/app/page';

describe('Accessibility', () => {
  beforeEach(() => {
    usePortfolioStore.setState({ currentSection: 'hero', reducedMotion: true });
  });

  afterEach(() => {
    cleanup();
  });

  it('all button elements have aria-label or visible text', () => {
    const { container } = render(createElement(Home));
    const buttons = container.querySelectorAll('button');

    for (const btn of Array.from(buttons)) {
      const hasAriaLabel = btn.hasAttribute('aria-label') && btn.getAttribute('aria-label')!.trim() !== '';
      const hasText = btn.textContent!.trim() !== '';
      expect(
        hasAriaLabel || hasText,
        `Button missing accessible name: ${btn.outerHTML.slice(0, 120)}`
      ).toBe(true);
    }
  });

  it('all anchor elements have aria-label or visible text', () => {
    const { container } = render(createElement(Home));
    const links = container.querySelectorAll('a');

    for (const link of Array.from(links)) {
      const hasAriaLabel = link.hasAttribute('aria-label') && link.getAttribute('aria-label')!.trim() !== '';
      const hasText = link.textContent!.trim() !== '';
      expect(
        hasAriaLabel || hasText,
        `Anchor missing accessible name: ${link.outerHTML.slice(0, 120)}`
      ).toBe(true);
    }
  });

  it('all img elements have alt attribute', () => {
    const { container } = render(createElement(Home));
    const images = container.querySelectorAll('img');

    for (const img of Array.from(images)) {
      expect(
        img.hasAttribute('alt'),
        `Image missing alt attribute: ${img.outerHTML.slice(0, 120)}`
      ).toBe(true);
    }
  });

  it('nav elements have aria-labels', () => {
    const { container } = render(createElement(Home));
    const navs = container.querySelectorAll('nav');

    for (const nav of Array.from(navs)) {
      const hasAriaLabel = nav.hasAttribute('aria-label') && nav.getAttribute('aria-label')!.trim() !== '';
      const hasAriaLabelledBy = nav.hasAttribute('aria-labelledby');
      expect(
        hasAriaLabel || hasAriaLabelledBy,
        `Nav element missing aria-label: ${nav.outerHTML.slice(0, 120)}`
      ).toBe(true);
    }
  });

  it('expandable elements have aria-expanded attribute', () => {
    const { container } = render(createElement(Home));
    // CaseFolder buttons and AbilityCard buttons are expandable
    const expandableButtons = container.querySelectorAll('[aria-expanded]');
    // We expect at least the case folder buttons to have aria-expanded
    // (3 case files + ability cards that toggle detail)
    expect(expandableButtons.length).toBeGreaterThanOrEqual(1);
  });
});
