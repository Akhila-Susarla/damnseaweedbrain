'use client';

import { useRef, useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Full-viewport warped checkered background.
 * Draws a grid of cream lines on transparent (black page shows through as squares).
 * Uses canvas for the warp distortion + slow animation.
 */
export default function WarpedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const isMobileViewport = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const CELL = isMobileViewport ? 72 : 55; // larger cells on mobile reduce visual noise
    const LINE_COLOR = isMobileViewport ? 'rgba(245, 235, 224, 0.24)' : 'rgba(245, 235, 224, 0.32)'; // cream lines — clearly visible
    const LINE_WIDTH = 1;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / CELL) + 4;
      const rows = Math.ceil(h / CELL) + 4;
      const offsetX = -CELL * 2;
      const offsetY = -CELL * 2;

      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = LINE_WIDTH;

      // Warp function — displaces grid points with sine waves
      const warp = (x: number, y: number): [number, number] => {
        const t = reducedMotion ? 0 : time;
        const scale = isMobileViewport ? 0.7 : 1;
        const dx =
          (Math.sin((y / 120) + t * 0.3) * 14 +
          Math.sin((y / 200) + t * 0.15) * 8 +
          Math.cos((x / 300) + t * 0.2) * 6) * scale;
        const dy =
          (Math.cos((x / 120) + t * 0.25) * 14 +
          Math.cos((x / 200) + t * 0.1) * 8 +
          Math.sin((y / 300) + t * 0.18) * 6) * scale;
        return [x + dx, y + dy];
      };

      // Draw horizontal warped lines
      for (let row = 0; row <= rows; row++) {
        ctx.beginPath();
        const baseY = offsetY + row * CELL;
        for (let col = 0; col <= cols; col++) {
          const baseX = offsetX + col * CELL;
          const [wx, wy] = warp(baseX, baseY);
          if (col === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        ctx.stroke();
      }

      // Draw vertical warped lines
      for (let col = 0; col <= cols; col++) {
        ctx.beginPath();
        const baseX = offsetX + col * CELL;
        for (let row = 0; row <= rows; row++) {
          const baseY = offsetY + row * CELL;
          const [wx, wy] = warp(baseX, baseY);
          if (row === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        ctx.stroke();
      }

      if (!reducedMotion) {
        time += isMobileViewport ? 0.004 : 0.008; // slower flow speed on mobile
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion, isMobileViewport]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 1 }} // opacity controlled per-section via scroll
      aria-hidden="true"
    />
  );
}
