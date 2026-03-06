'use client';

import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ReactLenis with `root` prop hijacks native scroll on <html>.
// Recent versions of Lenis auto-sync with GSAP ScrollTrigger when both are present.
//
// Manual sync fallback (if auto-detection doesn't work):
// const lenis = new Lenis();
// lenis.on('scroll', ScrollTrigger.update);
// gsap.ticker.add((time) => { lenis.raf(time * 1000); });
// gsap.ticker.lagSmoothing(0);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
