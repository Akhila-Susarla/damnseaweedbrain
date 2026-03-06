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
