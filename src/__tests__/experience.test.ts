import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';

// Mock gsap
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
    from: vi.fn(),
    fromTo: vi.fn(),
    to: vi.fn(),
    set: vi.fn(),
  },
}));

// Mock gsap/ScrollTrigger
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

// Mock @gsap/react
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((cb) => cb()),
}));

// Mock motion/react
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) =>
      createElement('div', {}, children as React.ReactNode),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    createElement('div', null, children),
}));

import ExperienceSection from '@/components/sections/ExperienceSection';

describe('ExperienceSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all 5 experience entries', () => {
    const { container } = render(createElement(ExperienceSection));

    const cards = container.querySelectorAll('.experience-card');
    expect(cards.length).toBe(5);
  });

  it('renders organization names', () => {
    render(createElement(ExperienceSection));

    expect(screen.getByText('Copart Inc.')).toBeDefined();
    expect(screen.getByText('American Airlines')).toBeDefined();
    expect(screen.getAllByText(/Autodesk/).length).toBe(2);
    expect(screen.getByText('SRM University')).toBeDefined();
  });

  it('has h2 heading with Experience text', () => {
    render(createElement(ExperienceSection));

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toContain('Experience');
  });

  it('experience cards have aria-expanded attribute', () => {
    render(createElement(ExperienceSection));

    const buttons = screen.getAllByRole('button');
    const expandButtons = buttons.filter(
      (btn) => btn.getAttribute('aria-expanded') !== null
    );
    expect(expandButtons.length).toBe(5);
  });
});
