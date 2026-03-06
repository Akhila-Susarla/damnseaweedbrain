import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';

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

// Mock motion/react to render plain divs
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown>) =>
      createElement('div', { 'data-testid': 'motion-div', ...filterDomProps(props) }, children as React.ReactNode),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    createElement('div', null, children),
}));

function filterDomProps(props: Record<string, unknown>) {
  const allowed = ['className', 'style', 'id', 'data-testid'];
  const filtered: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (allowed.includes(key) || key.startsWith('aria-') || key.startsWith('data-')) {
      filtered[key] = props[key];
    }
  }
  return filtered;
}

// Import after mocks
import CaseFilesSection from '@/components/sections/CaseFilesSection';

describe('CaseFilesSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all 3 case files', () => {
    const { container } = render(createElement(CaseFilesSection));

    const folders = container.querySelectorAll('.case-folder');
    expect(folders.length).toBe(3);
  });

  it('each case file shows title and stamp badge', () => {
    render(createElement(CaseFilesSection));

    expect(screen.getByText('Influence Maximization in Complex Networks')).toBeDefined();
    expect(screen.getByText('Real-time NER Radar')).toBeDefined();
    expect(screen.getByText(/UniWay/)).toBeDefined();

    // Stamp badges
    const stamps = screen.getAllByLabelText(/^Status:/);
    expect(stamps.length).toBe(3);
  });

  it('stamp badge shows correct status per case file', () => {
    render(createElement(CaseFilesSection));

    // Check status labels exist for each status present in data
    const solvedStamps = screen.getAllByLabelText('Status: Solved');
    expect(solvedStamps.length).toBeGreaterThanOrEqual(1);
  });

  it('case file folders have aria-expanded attribute', () => {
    render(createElement(CaseFilesSection));

    const buttons = screen.getAllByRole('button');
    const caseButtons = buttons.filter(
      (btn) => btn.getAttribute('aria-expanded') !== null
    );
    expect(caseButtons.length).toBe(3);

    // All start closed
    caseButtons.forEach((btn) => {
      expect(btn.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('has h2 heading with correct text', () => {
    render(createElement(CaseFilesSection));

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toContain('CASE FILES');
    expect(heading.textContent).toContain('Investigation Archive');
  });
});
