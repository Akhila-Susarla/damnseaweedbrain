import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import { createElement } from 'react';

// Mock lenis/react
const mockStop = vi.fn();
const mockStart = vi.fn();
vi.mock('lenis/react', () => ({
  useLenis: vi.fn(() => ({ stop: mockStop, start: mockStart })),
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
    create: vi.fn(),
    update: vi.fn(),
  },
}));

// Mock next/dynamic to return a placeholder
vi.mock('next/dynamic', () => ({
  default: () => {
    const Stub = () => createElement('div', { 'data-testid': 'scene3d-stub' });
    return Stub;
  },
}));

// Mock motion/react -- filter out non-DOM props
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

import HeroSection from '@/components/sections/HeroSection';
import { usePortfolioStore } from '@/lib/store';

describe('HeroIntro integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    usePortfolioStore.setState({
      currentSection: 'hero',
      reducedMotion: true,
      dialogueActive: false,
    });
    mockStop.mockClear();
    mockStart.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('renders HeroIntro within HeroSection', async () => {
    render(createElement(HeroSection));
    // HeroIntro renders after a 300ms delay
    await act(async () => {
      vi.advanceTimersByTime(350);
    });

    const introEl = screen.queryByTestId('hero-intro');
    expect(introEl).toBeTruthy();
  });

  it('renders dialogue region within HeroIntro', async () => {
    render(createElement(HeroSection));
    await act(async () => {
      vi.advanceTimersByTime(350);
    });

    const dialogue = screen.queryByRole('region', { name: /dialogue/i });
    expect(dialogue).toBeTruthy();
  });

  it('scroll indicator is hidden when dialogue is active', () => {
    usePortfolioStore.setState({ dialogueActive: true });
    const { container } = render(createElement(HeroSection));

    const scrollIndicator = container.querySelector('[class*="opacity-0"]');
    expect(scrollIndicator).toBeTruthy();
  });

  it('scroll indicator is visible when dialogue is not active', () => {
    usePortfolioStore.setState({ dialogueActive: false });
    render(createElement(HeroSection));

    const scrollBtn = screen.getByLabelText('Scroll down to explore');
    const parent = scrollBtn.closest('div[class*="opacity-"]');
    expect(parent?.className).toContain('opacity-100');
  });
});
