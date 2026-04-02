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
    fromTo: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
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
  default: (props: Record<string, unknown>) => createElement('img', { ...props, fill: undefined }),
}));

// Mock motion/react
vi.mock('motion/react', () => {
  const filterProps = (props: Record<string, unknown>) => {
    const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
    return rest;
  };
  return {
    motion: {
      div: ({ children, ...props }: Record<string, unknown>) => createElement('div', { ...filterProps(props), key: undefined }, children as React.ReactNode),
      span: ({ children, ...props }: Record<string, unknown>) => createElement('span', { ...filterProps(props), key: undefined }, children as React.ReactNode),
      nav: ({ children, ...props }: Record<string, unknown>) => createElement('nav', { ...filterProps(props), key: undefined }, children as React.ReactNode),
      a: ({ children, ...props }: Record<string, unknown>) => createElement('a', { ...filterProps(props), key: undefined }, children as React.ReactNode),
      button: ({ children, ...props }: Record<string, unknown>) => createElement('button', { ...filterProps(props), key: undefined }, children as React.ReactNode),
      li: ({ children, ...props }: Record<string, unknown>) => createElement('li', { ...filterProps(props), key: undefined }, children as React.ReactNode),
      p: ({ children, ...props }: Record<string, unknown>) => createElement('p', { ...filterProps(props), key: undefined }, children as React.ReactNode),
      g: ({ children, ...props }: Record<string, unknown>) => createElement('g', { ...filterProps(props), key: undefined }, children as React.ReactNode),
    },
    AnimatePresence: ({ children }: Record<string, unknown>) => children,
    useScroll: vi.fn(() => ({ scrollYProgress: { get: () => 0, on: vi.fn() } })),
    useTransform: vi.fn(() => ({ get: () => 0, on: vi.fn() })),
    useMotionValueEvent: vi.fn(),
    useReducedMotion: vi.fn(() => false),
  };
});

import Home from '@/app/page';

describe('JSON-LD structured data', () => {
  beforeEach(() => {
    usePortfolioStore.setState({ currentSection: 'hero', reducedMotion: true });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders Person JSON-LD with correct schema', () => {
    const { container } = render(createElement(Home));
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const jsonLds = Array.from(scripts).map((s) => JSON.parse(s.textContent || '{}'));
    const person = jsonLds.find((j) => j['@type'] === 'Person');
    expect(person).toBeDefined();
    expect(person['@context']).toBe('https://schema.org');
    expect(person.name).toBe('Akhila Susarla');
    expect(person.jobTitle).toBe('AI/ML Engineer');
    expect(person.sameAs).toContain('https://linkedin.com/in/akhila-susarla-1803b41b6/');
    expect(person.sameAs).toContain('https://github.com/akhilasusarla');
  });

  it('renders WebSite JSON-LD with correct schema', () => {
    const { container } = render(createElement(Home));
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const jsonLds = Array.from(scripts).map((s) => JSON.parse(s.textContent || '{}'));
    const website = jsonLds.find((j) => j['@type'] === 'WebSite');
    expect(website).toBeDefined();
    expect(website['@context']).toBe('https://schema.org');
    expect(website.name).toBe('Akhila Susarla \u2014 Portfolio');
    expect(website.url).toBe('https://damnseaweedbrain.com');
  });
});
