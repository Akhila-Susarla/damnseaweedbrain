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

// Import after mocks
import HeroSection from '@/components/sections/HeroSection';

describe('HeroSection', () => {
  beforeEach(() => {
    usePortfolioStore.setState({ currentSection: 'hero', reducedMotion: true });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders three parallax layer elements', () => {
    const { container } = render(createElement(HeroSection));

    const bg = container.querySelector('.parallax-bg');
    const mid = container.querySelector('.parallax-mid');
    const fg = container.querySelector('.parallax-fg');

    expect(bg).toBeTruthy();
    expect(mid).toBeTruthy();
    expect(fg).toBeTruthy();
  });

  it('character placeholder element exists in midground layer', () => {
    render(createElement(HeroSection));

    const placeholder = screen.getByTestId('character-placeholder');
    expect(placeholder).toBeTruthy();
  });

  it('scroll-down indicator button exists with correct aria-label', () => {
    render(createElement(HeroSection));

    const scrollBtn = screen.getByLabelText('Scroll down to explore');
    expect(scrollBtn).toBeTruthy();
    expect(scrollBtn.tagName.toLowerCase()).toBe('button');
  });

  it('h1 heading element exists', () => {
    render(createElement(HeroSection));

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeTruthy();
  });

  it('subtitle text "Data Scientist | ML Engineer" is present', () => {
    render(createElement(HeroSection));

    const subtitle = screen.getByText('Data Scientist | ML Engineer');
    expect(subtitle).toBeTruthy();
  });
});
