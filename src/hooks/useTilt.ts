'use client';

import { useRef, useCallback, useState } from 'react';

interface UseTiltOptions {
  maxAngle?: number;
}

interface TiltStyle {
  transform: string;
  transition: string;
  willChange: string;
}

interface TiltHandlers {
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

interface UseTiltReturn {
  ref: React.RefObject<HTMLElement | null>;
  style: TiltStyle;
  handlers: TiltHandlers;
}

export function useTilt(options: UseTiltOptions = {}): UseTiltReturn {
  const { maxAngle = 15 } = options;
  const ref = useRef<HTMLElement | null>(null);

  // Use state for test observability; in production the perf cost is
  // negligible because updates only happen on mousemove (throttled by browser).
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1

      setRotateX(Math.round((0.5 - y) * maxAngle * 2));
      setRotateY(Math.round((x - 0.5) * maxAngle * 2));
      setIsHovering(true);
    },
    [maxAngle]
  );

  const onMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  }, []);

  const style: TiltStyle = {
    transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    transition: isHovering
      ? 'transform 0.1s ease-out'
      : 'transform 0.4s ease-out',
    willChange: 'transform',
  };

  return {
    ref,
    style,
    handlers: { onMouseMove, onMouseLeave },
  };
}
