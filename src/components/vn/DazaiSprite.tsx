'use client';

import { useRef, useEffect, useCallback } from 'react';
import { usePortfolioStore } from '@/lib/store';
import type { DazaiExpression } from '@/data/types';

interface DazaiSpriteProps {
  expression: DazaiExpression;
  className?: string;
}

/**
 * Map expressions to sprite variant + animation label.
 * 100003 = ADA Dazai (standard outfit)
 * 100114 = No Longer Human (darker variant)
 */
const expressionMap: Record<DazaiExpression, { spriteId: string; label: string }> = {
  neutral: { spriteId: '100003', label: 'Idle' },
  smirk: { spriteId: '100114', label: 'Idle' },
  laugh: { spriteId: '100003', label: 'Attack' },
  serious: { spriteId: '100114', label: 'Idle' },
  annoyed: { spriteId: '100003', label: 'damage' },
  mysterious: { spriteId: '100114', label: 'Idle' },
};

/**
 * Default canvas buffer size — set on initial render to prevent layout shift
 * when the LWF sprite loads and sets canvas.width/height asynchronously.
 * The CSS w-full/h-full controls display size; these only set the drawing buffer.
 */
const DEFAULT_CANVAS_WIDTH = 300;
const DEFAULT_CANVAS_HEIGHT = 300;

let lwfScriptLoaded = false;
let lwfScriptLoading = false;
const lwfLoadCallbacks: (() => void)[] = [];

function loadLWFScript(): Promise<void> {
  if (lwfScriptLoaded) return Promise.resolve();
  return new Promise((resolve) => {
    if (lwfScriptLoading) {
      lwfLoadCallbacks.push(resolve);
      return;
    }
    lwfScriptLoading = true;
    const script = document.createElement('script');
    script.src = '/lwf.js';
    script.onload = () => {
      lwfScriptLoaded = true;
      lwfScriptLoading = false;
      resolve();
      lwfLoadCallbacks.forEach((cb) => cb());
      lwfLoadCallbacks.length = 0;
    };
    document.head.appendChild(script);
  });
}

export default function DazaiSprite({ expression, className = '' }: DazaiSpriteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lwfRef = useRef<any>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const currentSpriteRef = useRef<string>('');
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  const config = expressionMap[expression];

  const cleanup = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    lwfRef.current = null;
    currentSpriteRef.current = '';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // If same sprite already loaded, just change animation label
    if (currentSpriteRef.current === config.spriteId && lwfRef.current) {
      try {
        lwfRef.current.rootMovie.gotoAndPlay(config.label);
      } catch {
        // label might not exist, stay on current
      }
      return;
    }

    cleanup();

    if (reducedMotion) return;

    let cancelled = false;

    loadLWFScript().then(() => {
      if (cancelled || !canvas) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const LWFLib = (window as any).LWF;
      if (!LWFLib) return;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      LWFLib.useCanvasRenderer();
      const cache = LWFLib.ResourceCache.get();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cache.loadLWF({
        lwf: config.spriteId + '.lwf',
        prefix: '/characters/dazai/' + config.spriteId + '/',
        stage: canvas,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onload: (lwf: any) => {
          if (cancelled) return;

          // Use a large internal canvas so the sprite renders at high detail.
          // CSS w-full/h-full on the canvas element will scale it to fit the
          // container, which acts like object-fit:fill — acceptable here
          // because we fill the canvas proportionally with the sprite.
          const scale = 3;
          const spriteW = lwf.width * scale;
          const spriteH = lwf.height * scale;
          // Canvas aspect ratio matches the sprite's own aspect ratio
          canvas.width = spriteW;
          canvas.height = spriteH;
          lwf.setFrameRate(30);

          // Position sprite in canvas — nudge right & down to compensate
          // for empty space baked into the LWF animation frames
          lwf.rootMovie.x = (spriteW - lwf.width) / 2 + lwf.width * 0.1;
          lwf.rootMovie.y = (spriteH - lwf.height) / 2 + lwf.height * 0.12;

          // Play idle animation
          try {
            lwf.rootMovie.gotoAndPlay(config.label);
          } catch {
            lwf.rootMovie.gotoAndPlay('Idle');
          }

          lwfRef.current = lwf;
          currentSpriteRef.current = config.spriteId;
          lastTimeRef.current = performance.now();

          const animate = (now: number) => {
            if (cancelled) return;
            const delta = now - lastTimeRef.current;
            lastTimeRef.current = now;
            lwf.exec(delta / 1000);
            lwf.render();
            rafRef.current = requestAnimationFrame(animate);
          };
          rafRef.current = requestAnimationFrame(animate);
        },
      });
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [config.spriteId, config.label, reducedMotion, cleanup]);

  // Reduced motion: show static fallback
  if (reducedMotion) {
    return (
      <div className={`relative ${className}`} aria-hidden="true">
  {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/characters/dazai/anime.png"
          alt=""
          className="w-full h-full object-contain object-bottom"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <canvas
        ref={canvasRef}
        width={DEFAULT_CANVAS_WIDTH}
        height={DEFAULT_CANVAS_HEIGHT}
        className="w-full h-full"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
}
