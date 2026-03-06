'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { use3DQuality } from '@/components/three/FallbackProvider';
import { usePortfolioStore } from '@/lib/store';
import HeroParticles from '@/components/three/HeroParticles';
import HeroEnvironment from '@/components/three/HeroEnvironment';

export default function Scene3D() {
  const { qualityLevel, shouldRender3D } = use3DQuality();
  const setQualityLevel = usePortfolioStore((s) => s.setQualityLevel);

  if (!shouldRender3D) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={qualityLevel === 'high' ? [1, 1.5] : [1, 1]}
      gl={{
        antialias: qualityLevel === 'high',
        alpha: true,
        powerPreference: 'default',
      }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <PerformanceMonitor
          onDecline={() => {
            setQualityLevel(qualityLevel === 'high' ? 'low' : 'off');
          }}
          onIncline={() => {
            if (qualityLevel === 'low') setQualityLevel('high');
          }}
        >
          <HeroEnvironment />
          <HeroParticles />
        </PerformanceMonitor>
      </Suspense>
    </Canvas>
  );
}
