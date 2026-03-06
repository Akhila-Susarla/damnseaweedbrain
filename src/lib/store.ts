import { create } from "zustand";

export interface PortfolioState {
  currentSection: string;
  dialogueActive: boolean;
  reducedMotion: boolean;
  animationsReady: boolean;
  qualityLevel: 'high' | 'low' | 'off';
  setCurrentSection: (section: string) => void;
  setDialogueActive: (active: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setAnimationsReady: (ready: boolean) => void;
  setQualityLevel: (level: 'high' | 'low' | 'off') => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  currentSection: "hero",
  dialogueActive: false,
  reducedMotion: false,
  animationsReady: false,
  qualityLevel: 'high',
  setCurrentSection: (section) => set({ currentSection: section }),
  setDialogueActive: (active) => set({ dialogueActive: active }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setAnimationsReady: (ready) => set({ animationsReady: ready }),
  setQualityLevel: (level) => set({ qualityLevel: level }),
}));
