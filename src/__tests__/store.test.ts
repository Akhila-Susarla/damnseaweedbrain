import { describe, it, expect, beforeEach } from "vitest";
import { usePortfolioStore } from "@/lib/store";

describe("Portfolio Store", () => {
  beforeEach(() => {
    // Reset store to defaults before each test
    usePortfolioStore.setState({
      currentSection: "hero",
      dialogueActive: false,
      reducedMotion: false,
      animationsReady: false,
    });
  });

  it("initializes with correct default values", () => {
    const state = usePortfolioStore.getState();
    expect(state.currentSection).toBe("hero");
    expect(state.dialogueActive).toBe(false);
    expect(state.reducedMotion).toBe(false);
    expect(state.animationsReady).toBe(false);
  });

  it("setCurrentSection updates currentSection", () => {
    usePortfolioStore.getState().setCurrentSection("about");
    expect(usePortfolioStore.getState().currentSection).toBe("about");
  });

  it("setDialogueActive toggles dialogueActive", () => {
    usePortfolioStore.getState().setDialogueActive(true);
    expect(usePortfolioStore.getState().dialogueActive).toBe(true);

    usePortfolioStore.getState().setDialogueActive(false);
    expect(usePortfolioStore.getState().dialogueActive).toBe(false);
  });

  it("setReducedMotion updates reducedMotion", () => {
    usePortfolioStore.getState().setReducedMotion(true);
    expect(usePortfolioStore.getState().reducedMotion).toBe(true);
  });

  it("setAnimationsReady updates animationsReady", () => {
    usePortfolioStore.getState().setAnimationsReady(true);
    expect(usePortfolioStore.getState().animationsReady).toBe(true);
  });
});
