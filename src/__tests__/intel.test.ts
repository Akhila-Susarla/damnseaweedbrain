import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';

// Mock gsap
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
    from: vi.fn(),
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

// Import after mocks
import IntelSection from '@/components/sections/IntelSection';

describe('IntelSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all 4 dossiers with organization names', () => {
    render(createElement(IntelSection));

    expect(screen.getByText('American Airlines')).toBeDefined();
    expect(screen.getAllByText(/Autodesk/).length).toBe(2);
    expect(screen.getByText('SRM University')).toBeDefined();
  });

  it('timeline connecting line element exists', () => {
    const { container } = render(createElement(IntelSection));

    const line = container.querySelector('.timeline-line');
    expect(line).not.toBeNull();
  });

  it('Classified dossiers (Autodesk) have red border styling', () => {
    const { container } = render(createElement(IntelSection));

    const dossiers = container.querySelectorAll('.intel-dossier');
    expect(dossiers.length).toBe(4);

    // Autodesk dossiers (index 1, 2) should have classified-red border
    const classifiedDossiers = Array.from(dossiers).filter((d) =>
      d.className.includes('border-classified-red')
    );
    expect(classifiedDossiers.length).toBe(2);
  });

  it('each dossier has a stamp badge', () => {
    render(createElement(IntelSection));

    const stamps = screen.getAllByLabelText(/^Status:/);
    expect(stamps.length).toBe(4);
  });

  it('has h2 heading with INTEL text', () => {
    render(createElement(IntelSection));

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toContain('INTEL');
    expect(heading.textContent).toContain('Mission Dossiers');
  });

  it('timeline nodes exist for each dossier', () => {
    const { container } = render(createElement(IntelSection));

    const nodes = container.querySelectorAll('.timeline-node');
    expect(nodes.length).toBe(4);
  });
});
