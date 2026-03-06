'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { usePortfolioStore } from '@/lib/store';

interface ThreeDQuality {
  qualityLevel: 'high' | 'low' | 'off';
  webglSupported: boolean;
  shouldRender3D: boolean;
}

const ThreeDQualityContext = createContext<ThreeDQuality>({
  qualityLevel: 'high',
  webglSupported: true,
  shouldRender3D: true,
});

export function use3DQuality(): ThreeDQuality {
  return useContext(ThreeDQualityContext);
}

interface FallbackProviderProps {
  children: React.ReactNode;
}

export default function FallbackProvider({ children }: FallbackProviderProps) {
  const webglSupported = useWebGLSupport();
  const qualityLevel = usePortfolioStore((s) => s.qualityLevel);
  const setQualityLevel = usePortfolioStore((s) => s.setQualityLevel);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  // Auto-degrade if no WebGL
  useEffect(() => {
    if (!webglSupported) {
      setQualityLevel('off');
    }
  }, [webglSupported, setQualityLevel]);

  const value = useMemo<ThreeDQuality>(
    () => ({
      qualityLevel,
      webglSupported,
      shouldRender3D:
        webglSupported && qualityLevel !== 'off' && !reducedMotion,
    }),
    [qualityLevel, webglSupported, reducedMotion]
  );

  return (
    <ThreeDQualityContext.Provider value={value}>
      {children}
    </ThreeDQualityContext.Provider>
  );
}
