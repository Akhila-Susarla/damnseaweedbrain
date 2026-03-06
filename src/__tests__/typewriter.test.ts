import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createElement } from 'react';
import { usePortfolioStore } from '@/lib/store';

// Mock gsap
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
  },
}));

// Mock @gsap/react
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}));

// Import after mocks
import TypewriterText from '@/components/ui/TypewriterText';

describe('TypewriterText', () => {
  beforeEach(() => {
    usePortfolioStore.setState({ reducedMotion: false });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders full text when reduced motion is active', () => {
    usePortfolioStore.setState({ reducedMotion: true });
    render(createElement(TypewriterText, { text: 'Hello World' }));

    const el = screen.getByLabelText('Hello World');
    expect(el.textContent).toBe('Hello World');
  });

  it('has aria-label with full text for screen readers', () => {
    render(createElement(TypewriterText, { text: 'damnseaweedbrain' }));

    const el = screen.getByLabelText('damnseaweedbrain');
    expect(el).toBeTruthy();
    expect(el.getAttribute('aria-label')).toBe('damnseaweedbrain');
  });

  it('renders empty initially when animation is active (GSAP mocked)', () => {
    usePortfolioStore.setState({ reducedMotion: false });
    render(createElement(TypewriterText, { text: 'animated text' }));

    const el = screen.getByLabelText('animated text');
    // When reducedMotion is false, initial content is empty string (GSAP would animate it)
    expect(el.textContent).toBe('');
  });

  it('renders with custom element tag via as prop', () => {
    usePortfolioStore.setState({ reducedMotion: true });
    render(createElement(TypewriterText, { text: 'Heading', as: 'h1' }));

    const el = screen.getByRole('heading', { level: 1 });
    expect(el.textContent).toBe('Heading');
  });
});
