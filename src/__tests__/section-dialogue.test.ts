import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import { createElement } from 'react';

// Store ScrollTrigger callbacks on globalThis to avoid hoisting issues
(globalThis as any).__scrollTriggerCallbacks = {};
(globalThis as any).__scrollTriggerCreateCalls = [];

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
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
  },
}));

// Mock gsap/ScrollTrigger
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: (config: any) => {
      (globalThis as any).__scrollTriggerCallbacks[config.trigger] = config;
      (globalThis as any).__scrollTriggerCreateCalls.push(config);
      return { kill: vi.fn() };
    },
    update: vi.fn(),
  },
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => createElement('img', { ...props, fill: undefined }),
}));

// Mock motion/react -- filter non-DOM props
vi.mock('motion/react', () => {
  const filterProps = (props: any) => {
    const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
    return rest;
  };
  return {
    motion: {
      div: ({ children, ...props }: any) => createElement('div', { ...filterProps(props), key: undefined }, children),
      span: ({ children, ...props }: any) => createElement('span', { ...filterProps(props), key: undefined }, children),
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

import DialogueOverlay from '@/components/vn/DialogueOverlay';
import { usePortfolioStore } from '@/lib/store';

describe('DialogueOverlay', () => {
  beforeEach(() => {
    (globalThis as any).__scrollTriggerCallbacks = {};
    (globalThis as any).__scrollTriggerCreateCalls = [];
    usePortfolioStore.setState({ reducedMotion: true });
  });

  afterEach(() => {
    cleanup();
  });

  it('does not render dialogue content before scroll trigger fires', () => {
    render(createElement(DialogueOverlay));

    const dialogueEl = screen.queryByTestId('section-dialogue-about');
    expect(dialogueEl).toBeNull();
  });

  it('creates ScrollTriggers for all sections', () => {
    render(createElement(DialogueOverlay));

    const calls = (globalThis as any).__scrollTriggerCreateCalls;
    const triggers = calls.map((c: any) => c.trigger);
    expect(triggers).toContain('#about');
    expect(triggers).toContain('#abilities');
    expect(triggers).toContain('#case-files');
    expect(triggers).toContain('#intel');
    expect(triggers).toContain('#social');
  });

  it('renders dialogue when scroll trigger fires for a section', () => {
    render(createElement(DialogueOverlay));

    act(() => {
      (globalThis as any).__scrollTriggerCallbacks['#about']?.onEnter?.();
    });

    const dialogueEl = screen.queryByTestId('section-dialogue-about');
    expect(dialogueEl).toBeTruthy();
  });

  it('renders dialogue region with correct aria label when triggered', () => {
    render(createElement(DialogueOverlay));

    act(() => {
      (globalThis as any).__scrollTriggerCallbacks['#about']?.onEnter?.();
    });

    const region = screen.queryByRole('region', { name: /dialogue/i });
    expect(region).toBeTruthy();
  });
});
