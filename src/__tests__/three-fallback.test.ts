import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook } from '@testing-library/react';

// Mock R3F Canvas and drei -- they require WebGL context unavailable in test env
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => null,
  useFrame: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  PerformanceMonitor: ({ children }: { children: React.ReactNode }) => children,
  Float: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('three', () => ({
  default: {},
  AdditiveBlending: 1,
  FrontSide: 0,
}));

vi.mock('@/components/three/HeroParticles', () => ({
  default: () => null,
}));

vi.mock('@/components/three/HeroEnvironment', () => ({
  default: () => null,
}));

// Control shouldRender3D via this mutable ref
let shouldRender3DValue = true;
let qualityLevelValue: 'high' | 'low' | 'off' = 'high';

vi.mock('@/components/three/FallbackProvider', () => ({
  use3DQuality: () => ({
    qualityLevel: qualityLevelValue,
    webglSupported: shouldRender3DValue,
    shouldRender3D: shouldRender3DValue,
  }),
  default: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock zustand store to avoid hook-outside-React errors
vi.mock('@/lib/store', () => ({
  usePortfolioStore: () => vi.fn(),
}));

describe('Scene3D fallback behavior', () => {
  beforeEach(() => {
    shouldRender3DValue = true;
    qualityLevelValue = 'high';
  });

  it('returns null when shouldRender3D is false (WebGL unsupported)', async () => {
    shouldRender3DValue = false;

    const { default: Scene3D } = await import(
      '@/components/three/Scene3D'
    );

    // Render via renderHook wrapper to satisfy React hook rules
    const { result } = renderHook(() => Scene3D());
    expect(result.current).toBeNull();
  });

  it('returns null when qualityLevel is off', async () => {
    shouldRender3DValue = false;
    qualityLevelValue = 'off';

    const { default: Scene3D } = await import(
      '@/components/three/Scene3D'
    );

    const { result } = renderHook(() => Scene3D());
    expect(result.current).toBeNull();
  });
});
