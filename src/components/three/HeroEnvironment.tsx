'use client';

import * as THREE from 'three';

export default function HeroEnvironment() {
  return (
    <>
      {/* Atmospheric fog matching midnight background */}
      <fogExp2 attach="fog" args={['#0a0e1a', 0.15]} />

      {/* Faint warm directional light from upper-left */}
      <directionalLight
        position={[-3, 4, 2]}
        intensity={0.3}
        color="#d4af37"
      />

      {/* Very dim ambient for particle visibility */}
      <ambientLight intensity={0.1} color="#c4b8a8" />

      {/* Depth backdrop plane */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial
          color="#0a0e1a"
          transparent
          opacity={0.4}
          side={THREE.FrontSide}
        />
      </mesh>
    </>
  );
}
