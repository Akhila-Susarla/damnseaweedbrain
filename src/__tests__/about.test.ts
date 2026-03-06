import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import { usePortfolioStore } from '@/lib/store';

// Mock gsap
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
    from: vi.fn(),
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

// Import after mocks
import AboutSection from '@/components/sections/AboutSection';

describe('AboutSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders both education entries (UTD and SRM)', () => {
    render(createElement(AboutSection));

    expect(
      screen.getByText('The University of Texas at Dallas')
    ).toBeDefined();
    expect(screen.getByText('SRM University, Amaravati')).toBeDefined();
  });

  it('displays GPA values', () => {
    render(createElement(AboutSection));

    expect(screen.getByText('(3.78/4.0)')).toBeDefined();
    expect(screen.getByText('(3.64/4.0)')).toBeDefined();
  });

  it('has h2 heading', () => {
    render(createElement(AboutSection));

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toBe('DOSSIER // Origin Story');
  });

  it('has dossier-field elements', () => {
    const { container } = render(createElement(AboutSection));

    const fields = container.querySelectorAll('.dossier-field');
    expect(fields.length).toBeGreaterThanOrEqual(2);
  });

  it('displays codename', () => {
    render(createElement(AboutSection));

    expect(screen.getByText('damnseaweedbrain')).toBeDefined();
  });
});
