import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import { usePortfolioStore } from '@/lib/store';

// Mock motion/react
vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    div: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => createElement('div', props, children),
  },
  useReducedMotion: () => false,
}));

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
  },
}));

// Mock gsap/ScrollTrigger
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    batch: vi.fn(),
  },
}));

// Import after mocks
import AbilitiesSection from '@/components/sections/AbilitiesSection';
import { skills } from '@/data/skills';

describe('AbilitiesSection', () => {
  afterEach(() => {
    cleanup();
    usePortfolioStore.setState({ reducedMotion: false });
  });

  it('renders all skills by name', () => {
    render(createElement(AbilitiesSection));

    skills.forEach((skill) => {
      const elements = screen.getAllByText(skill.name);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders 4 category headings', () => {
    render(createElement(AbilitiesSection));

    const expectedCategories = [
      'Languages',
      'Data Science/ML',
      'Tools & Frameworks',
      'Cloud',
    ];

    expectedCategories.forEach((category) => {
      const heading = screen.getByText((_content, element) => {
        return element?.tagName === 'H3' && !!element?.textContent?.includes(category);
      });
      expect(heading).toBeDefined();
    });
  });

  it('renders kanji subtitles for categories', () => {
    render(createElement(AbilitiesSection));

    const expectedKanji = ['言語', '科学', '道具', '雲'];
    expectedKanji.forEach((kanji) => {
      const elements = screen.getAllByText(kanji);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders correct tier badges on cards', () => {
    render(createElement(AbilitiesSection));

    // Check that S-tier skills have an S badge
    const sSkills = skills.filter((s) => s.tier === 'S');
    sSkills.forEach((skill) => {
      const card = screen.getByLabelText(`${skill.name} - S tier ability`);
      expect(card).toBeDefined();
    });

    // Check that A-tier skills have an A badge
    const aSkills = skills.filter((s) => s.tier === 'A');
    aSkills.forEach((skill) => {
      const card = screen.getByLabelText(`${skill.name} - A tier ability`);
      expect(card).toBeDefined();
    });
  });

  it('has section heading with ABILITIES text', () => {
    render(createElement(AbilitiesSection));

    const heading = screen.getByText('ABILITIES');
    expect(heading.tagName).toBe('H2');
  });

  it('renders the correct number of ability cards (buttons)', () => {
    render(createElement(AbilitiesSection));

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(skills.length);
  });
});
