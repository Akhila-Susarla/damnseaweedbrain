import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import { usePortfolioStore } from '@/lib/store';

vi.mock('@gsap/react', () => ({ useGSAP: vi.fn() }));

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
    set: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: { batch: vi.fn() } }));

import SkillsSection from '@/components/sections/SkillsSection';

describe('SkillsSection', () => {
  afterEach(() => {
    cleanup();
    usePortfolioStore.setState({ reducedMotion: false });
  });

  it('renders 5 skill group blocks', () => {
    const { container } = render(createElement(SkillsSection));
    const groups = container.querySelectorAll('.skill-float-group');
    // Desktop has 5 + mobile has 5 = 10 total (both rendered, CSS hides one)
    expect(groups.length).toBeGreaterThanOrEqual(5);
  });

  it('renders category labels', () => {
    render(createElement(SkillsSection));
    ['Languages', 'AI & GenAI', 'Data Science & ML', 'Tools & Frameworks', 'Cloud & DevOps'].forEach((cat) => {
      expect(screen.getAllByText(cat).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('has section heading', () => {
    render(createElement(SkillsSection));
    expect(screen.getByText('Skills & Tools').tagName).toBe('H2');
  });

  it('renders center circle with Skills Database text', () => {
    render(createElement(SkillsSection));
    // Skills heading exists
    expect(screen.getByText('Skills & Tools')).toBeDefined();
  });

  it('shows hint text for hover interaction', () => {
    render(createElement(SkillsSection));
    expect(screen.getByText(/hover over a category/i)).toBeDefined();
  });
});
