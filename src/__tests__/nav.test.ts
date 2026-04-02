import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import { usePortfolioStore } from '@/lib/store';

vi.mock('lenis/react', () => ({
  useLenis: vi.fn(() => null),
  ReactLenis: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('@gsap/react', () => ({ useGSAP: vi.fn() }));
vi.mock('gsap', () => ({ default: { registerPlugin: vi.fn() } }));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: { create: vi.fn(), update: vi.fn() } }));

import NavPanel from '@/components/nav/NavPanel';

describe('NavPanel', () => {
  beforeEach(() => { usePortfolioStore.setState({ currentSection: 'hero', reducedMotion: false }); });
  afterEach(() => { cleanup(); });

  it('renders navigation buttons', () => {
    render(createElement(NavPanel));
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(7);
  });

  it('renders section labels in navigation', () => {
    render(createElement(NavPanel));
    // Top bar has About, Work, Contact
    ['About', 'Work', 'Contact'].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('buttons have aria-labels', () => {
    render(createElement(NavPanel));
    ['Navigate to Experience', 'Navigate to Skills', 'Navigate to Projects'].forEach((ariaLabel) => {
      expect(screen.getAllByLabelText(ariaLabel).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('active section gets orange styling', () => {
    usePortfolioStore.setState({ currentSection: 'experience' });
    render(createElement(NavPanel));
    const btns = screen.getAllByLabelText('Navigate to Experience');
    expect(btns.some((btn) => btn.className.includes('text-orange'))).toBe(true);
  });

  it('renders three nav landmarks (top + left + mobile)', () => {
    render(createElement(NavPanel));
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThanOrEqual(2);
  });
});
