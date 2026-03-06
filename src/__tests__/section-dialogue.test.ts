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

import SectionDialogue from '@/components/vn/SectionDialogue';
import { usePortfolioStore } from '@/lib/store';
import type { DialogueSequence } from '@/data/types';

const mockDialogue: DialogueSequence = {
  id: 'test-transition',
  section: 'about',
  type: 'transition',
  lines: [
    { id: 'test-t1', character: 'dazai', expression: 'smirk', text: 'Test transition line.' },
  ],
};

describe('SectionDialogue', () => {
  beforeEach(() => {
    (globalThis as any).__scrollTriggerCallbacks = {};
    (globalThis as any).__scrollTriggerCreateCalls = [];
    usePortfolioStore.setState({ reducedMotion: true });
  });

  afterEach(() => {
    cleanup();
  });

  it('does not render dialogue content before scroll trigger fires', () => {
    render(createElement(SectionDialogue, {
      sectionId: 'about',
      dialogueData: mockDialogue,
    }));

    const dialogueEl = screen.queryByTestId('section-dialogue-about');
    expect(dialogueEl).toBeNull();
  });

  it('creates a ScrollTrigger for the target section', () => {
    render(createElement(SectionDialogue, {
      sectionId: 'about',
      dialogueData: mockDialogue,
    }));

    const calls = (globalThis as any).__scrollTriggerCreateCalls;
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0]).toMatchObject({
      trigger: '#about',
      start: 'top 80%',
      once: true,
    });
  });

  it('renders dialogue content when scroll trigger fires', () => {
    render(createElement(SectionDialogue, {
      sectionId: 'about',
      dialogueData: mockDialogue,
    }));

    // Simulate ScrollTrigger onEnter callback
    act(() => {
      (globalThis as any).__scrollTriggerCallbacks['#about']?.onEnter?.();
    });

    const dialogueEl = screen.queryByTestId('section-dialogue-about');
    expect(dialogueEl).toBeTruthy();
  });

  it('renders dialogue region with correct aria label when triggered', () => {
    render(createElement(SectionDialogue, {
      sectionId: 'about',
      dialogueData: mockDialogue,
    }));

    act(() => {
      (globalThis as any).__scrollTriggerCallbacks['#about']?.onEnter?.();
    });

    const region = screen.queryByRole('region', { name: /dialogue/i });
    expect(region).toBeTruthy();
  });
});
