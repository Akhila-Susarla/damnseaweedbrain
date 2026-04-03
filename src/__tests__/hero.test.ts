import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import { usePortfolioStore } from '@/lib/store';

vi.mock('lenis/react', () => ({
  useLenis: vi.fn(() => null),
  ReactLenis: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('@gsap/react', () => ({ useGSAP: vi.fn() }));

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(), to: vi.fn(), set: vi.fn(), fromTo: vi.fn(),
    timeline: vi.fn(() => ({ fromTo: vi.fn().mockReturnThis(), to: vi.fn().mockReturnThis(), kill: vi.fn() })),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: { create: vi.fn(), update: vi.fn() } }));

import HeroSection from '@/components/sections/HeroSection';

describe('HeroSection', () => {
  beforeEach(() => { usePortfolioStore.setState({ currentSection: 'hero', reducedMotion: true }); });
  afterEach(() => { cleanup(); });

  it('renders parallax background', () => {
    const { container } = render(createElement(HeroSection));
    expect(container.querySelector('.hero-bg-effects')).toBeTruthy();
  });

  it('scroll-down indicator button exists', () => {
    render(createElement(HeroSection));
    const scrollBtn = screen.getByLabelText('Scroll down to explore');
    expect(scrollBtn).toBeTruthy();
  });

  it('h1 heading with name exists', () => {
    render(createElement(HeroSection));
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeTruthy();
    expect(heading.textContent).toContain('Akhila');
    expect(heading.textContent).toContain('Susarla');
  });

  it('subtitle is present', () => {
    render(createElement(HeroSection));
    expect(screen.getByText(/AI\/ML Engineer/)).toBeTruthy();
  });

  it('renders stat cards', () => {
    const { container } = render(createElement(HeroSection));
    const stats = container.querySelectorAll('.hero-stat');
    expect(stats.length).toBe(4);
  });

  it('renders CTA buttons', () => {
    render(createElement(HeroSection));
    expect(screen.getByText('Get in Touch')).toBeTruthy();
    expect(screen.getAllByText('LinkedIn').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('GitHub').length).toBeGreaterThanOrEqual(1);
  });
});
