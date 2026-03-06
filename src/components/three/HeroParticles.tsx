'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { use3DQuality } from '@/components/three/FallbackProvider';

interface ParticleData {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  velocities: Float32Array; // [driftY, swayFreq, swayAmp] per particle (stride 3)
  count: number;
}

function createParticles(quality: 'high' | 'low'): ParticleData {
  const counts =
    quality === 'high'
      ? { paper: 25, blossom: 20, bandage: 15 }
      : { paper: 10, blossom: 10, bandage: 5 };

  const total = counts.paper + counts.blossom + counts.bandage;
  const positions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 4); // RGBA
  const sizes = new Float32Array(total);
  const velocities = new Float32Array(total * 3);

  // Color palette
  const palette = [
    { r: 0.769, g: 0.722, b: 0.659, a: 0.3 }, // paper #c4b8a8
    { r: 0.831, g: 0.627, b: 0.627, a: 0.2 }, // blossom #d4a0a0
    { r: 0.91, g: 0.863, b: 0.784, a: 0.25 }, // bandage #e8dcc8
  ];

  let idx = 0;

  const fill = (
    count: number,
    colorIdx: number,
    sizeRange: [number, number]
  ) => {
    const col = palette[colorIdx];
    for (let i = 0; i < count; i++) {
      // Position: spread across volume
      positions[idx * 3] = (Math.random() - 0.5) * 8; // X: -4 to 4
      positions[idx * 3 + 1] = Math.random() * 8 - 3; // Y: -3 to 5
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 4; // Z: -2 to 2

      // Color (RGBA)
      colors[idx * 4] = col.r;
      colors[idx * 4 + 1] = col.g;
      colors[idx * 4 + 2] = col.b;
      colors[idx * 4 + 3] = col.a;

      // Size
      sizes[idx] = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

      // Velocity: drift speed, sway frequency, sway amplitude
      velocities[idx * 3] = 0.002 + Math.random() * 0.003; // Y drift
      velocities[idx * 3 + 1] = 0.3 + Math.random() * 0.7; // sway freq
      velocities[idx * 3 + 2] = 0.1 + Math.random() * 0.3; // sway amp

      idx++;
    }
  };

  fill(counts.paper, 0, [0.04, 0.08]);
  fill(counts.blossom, 1, [0.03, 0.06]);
  fill(counts.bandage, 2, [0.02, 0.05]);

  return { positions, colors, sizes, velocities, count: total };
}

export default function HeroParticles() {
  const { qualityLevel } = use3DQuality();
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const data = useMemo(
    () => createParticles(qualityLevel === 'high' ? 'high' : 'low'),
    [qualityLevel]
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < data.count; i++) {
      const i3 = i * 3;
      const driftY = data.velocities[i3];
      const swayFreq = data.velocities[i3 + 1];
      const swayAmp = data.velocities[i3 + 2];

      // Drift downward
      pos[i3 + 1] -= driftY;
      // Horizontal sway
      pos[i3] += Math.sin(t * swayFreq + i) * swayAmp * delta;

      // Recycle when below threshold
      if (pos[i3 + 1] < -3) {
        pos[i3 + 1] = 5 + Math.random() * 2;
        pos[i3] = (Math.random() - 0.5) * 8;
        pos[i3 + 2] = (Math.random() - 0.5) * 4;
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.positions, 3]}
            count={data.count}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[data.colors, 4]}
            count={data.count}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[data.sizes, 1]}
            count={data.count}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          size={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </Float>
  );
}
