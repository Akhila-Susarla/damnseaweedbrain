'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FallbackProvider from '@/components/three/FallbackProvider';
import WarpedGrid from '@/components/ui/WarpedGrid';

gsap.registerPlugin(ScrollTrigger);

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const gridWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridWrapRef.current) return;

    // Dim the grid as user scrolls past hero
    gsap.fromTo(gridWrapRef.current,
      { opacity: 1 },
      {
        opacity: 0.35,
        scrollTrigger: {
          trigger: '#what-i-do',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });

  return (
    <div className="relative min-h-screen bg-base">
      {/* Warped checkered grid background — canvas */}
      <div ref={gridWrapRef} className="pointer-events-none fixed inset-0 z-0">
        <WarpedGrid />
      </div>

      <main className="relative z-[1] mx-auto max-w-[1440px] px-4 pt-16 tablet:pl-20 tablet:pr-8 desktop:pl-24 desktop:pr-16">
        <FallbackProvider>
          {children}
        </FallbackProvider>
      </main>
    </div>
  );
}
