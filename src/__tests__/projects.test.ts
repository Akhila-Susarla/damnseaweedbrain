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

import ProjectsSection from '@/components/sections/ProjectsSection';
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
});
