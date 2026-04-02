import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import { usePortfolioStore } from '@/lib/store';

vi.mock('lenis/react', () => ({
  useLenis: vi.fn(() => null),
  ReactLenis: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('@gsap/react', () => ({ useGSAP: vi.fn() }));

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(), to: vi.fn(), from: vi.fn(), set: vi.fn(), fromTo: vi.fn(),
    timeline: vi.fn(() => ({ to: vi.fn().mockReturnThis(), from: vi.fn().mockReturnThis(), fromTo: vi.fn().mockReturnThis(), kill: vi.fn() })),
    utils: { toArray: vi.fn(() => []) },
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn(() => ({ kill: vi.fn() })), update: vi.fn(), batch: vi.fn() },
}));

vi.mock('next/dynamic', () => ({
  default: () => { const Stub = () => createElement('div', { 'data-testid': 'dynamic-stub' }); return Stub; },
}));

vi.mock('next/image', () => ({
  default: (props: any) => createElement('img', { ...props, fill: undefined }),
}));

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

describe('Page section assembly', () => {
  beforeEach(() => { usePortfolioStore.setState({ currentSection: 'hero', reducedMotion: true }); });
  afterEach(() => { cleanup(); });

  it('renders all 7 section elements with correct IDs', () => {
    const { container } = render(createElement(Home));
    const expectedIds = ['hero', 'what-i-do', 'skills', 'experience', 'projects', 'education', 'social'];
    for (const id of expectedIds) {
      const el = container.querySelector(`#${id}`);
      expect(el, `Section #${id} should exist`).toBeTruthy();
    }
  });

  it('sections appear in correct DOM order', () => {
    const { container } = render(createElement(Home));
    const expectedOrder = ['hero', 'what-i-do', 'skills', 'experience', 'projects', 'education', 'social'];
    const allSections = container.querySelectorAll('[id]');
    const sectionIds = Array.from(allSections).map((el) => el.id).filter((id) => expectedOrder.includes(id));
    expect(sectionIds).toEqual(expectedOrder);
  });
});
