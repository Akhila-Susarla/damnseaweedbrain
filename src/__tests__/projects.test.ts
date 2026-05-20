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

// Mock ProjectCard so we can inspect the glow prop passed by ProjectsSection
vi.mock('@/components/ui/ProjectCard', () => ({
  default: ({ project, glowColor }: { project: { title: string }; glowColor?: string }) =>
    createElement(
      'div',
      { className: 'project-card', 'data-glow': glowColor },
      project.title
    ),
}));

import ProjectsSection, { getProjectGlowColor } from '@/components/sections/ProjectsSection';
import { projects } from '@/data/projects';

describe('ProjectsSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all projects', () => {
    const { container } = render(createElement(ProjectsSection));

    const cards = container.querySelectorAll('.project-card');
    expect(cards.length).toBe(projects.length);
  });

  it('each project shows title', () => {
    render(createElement(ProjectsSection));

    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeDefined();
    });
  });

  it('has h2 heading with Projects text', () => {
    render(createElement(ProjectsSection));

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toContain('Projects');
  });

  it('alternates project glow colors in a single-column layout', () => {
    const glows = projects.map((_, index) => getProjectGlowColor(index, false));

    for (let i = 1; i < glows.length; i += 1) {
      expect(glows[i]).not.toBe(glows[i - 1]);
    }
  });

  it('uses a checkerboard glow pattern in a two-column layout', () => {
    const glows = projects.map((_, index) => getProjectGlowColor(index, true));

    for (let i = 1; i < glows.length; i += 1) {
      if (i % 2 === 1) {
        expect(glows[i]).not.toBe(glows[i - 1]);
      }
      if (i + 2 < glows.length) {
        expect(glows[i]).not.toBe(glows[i + 2]);
      }
    }
  });
});
