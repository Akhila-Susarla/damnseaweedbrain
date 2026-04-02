import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import { usePortfolioStore } from '@/lib/store';

// Mock @gsap/react
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}));

// Mock gsap
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
    set: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
  },
}));

// Mock gsap/ScrollTrigger
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    batch: vi.fn(),
  },
}));

import SkillsSection from '@/components/sections/SkillsSection';
import { skills } from '@/data/skills';

describe('SkillsSection', () => {
  afterEach(() => {
    cleanup();
    usePortfolioStore.setState({ reducedMotion: false });
  });

  it('renders all skills by name', () => {
    render(createElement(SkillsSection));

    skills.forEach((skill) => {
      const elements = screen.getAllByText(skill.name);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders 5 category headings', () => {
    render(createElement(SkillsSection));

    const expectedCategories = [
      'Languages',
      'AI & GenAI',
      'Data Science / ML',
      'Tools & Frameworks',
      'Cloud & DevOps',
    ];

    expectedCategories.forEach((category) => {
      const heading = screen.getByText(category);
      expect(heading).toBeDefined();
    });
  });

  it('has section heading with Skills & Tools text', () => {
    render(createElement(SkillsSection));

    const heading = screen.getByText('Skills & Tools');
    expect(heading.tagName).toBe('H2');
  });
});
