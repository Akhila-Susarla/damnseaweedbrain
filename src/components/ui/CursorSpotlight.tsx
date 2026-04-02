'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/lib/store';

export default function CursorSpotlight() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useEffect(() => {
    if (reducedMotion || !cursorRef.current || !glowRef.current) return;

    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' });
      gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
    };

    const onMouseEnterInteractive = () => {
      gsap.to(cursor, { scale: 2, duration: 0.3, ease: 'power2.out' });
      gsap.to(glow, { scale: 1.4, opacity: 1, duration: 0.3 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(glow, { scale: 1, opacity: 0.7, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);

    const bindInteractives = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
    bindInteractives();

    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      {/* Bright dot cursor — 20px (2.5x original 8px) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden tablet:block"
        style={{
          width: '20px',
          height: '20px',
          marginLeft: '-10px',
          marginTop: '-10px',
          borderRadius: '50%',
          backgroundColor: '#ff8533',
          boxShadow: '0 0 10px 3px rgba(255,133,51,0.6), 0 0 25px 8px rgba(255,133,51,0.3)',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />
      {/* Large glow follower */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden tablet:block"
        style={{
          width: '350px',
          height: '350px',
          marginLeft: '-175px',
          marginTop: '-175px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,133,173,0.12) 0%, rgba(255,133,51,0.06) 40%, transparent 70%)',
          opacity: 0.7,
        }}
        aria-hidden="true"
      />
    </>
  );
}
