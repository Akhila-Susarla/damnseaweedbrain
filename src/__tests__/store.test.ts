import { describe, it, expect, beforeEach } from "vitest";
import { usePortfolioStore } from "@/lib/store";

describe("Portfolio Store", () => {
  beforeEach(() => {
    usePortfolioStore.setState({
      currentSection: "hero",
      reducedMotion: false,
      animationsReady: false,
    });
  });

  it("initializes with correct default values", () => {
    const state = usePortfolioStore.getState();
    expect(state.currentSection).toBe("hero");
    expect(state.reducedMotion).toBe(false);
    expect(state.animationsReady).toBe(false);
  });

  it("setCurrentSection updates currentSection", () => {
    usePortfolioStore.getState().setCurrentSection("about");
    expect(usePortfolioStore.getState().currentSection).toBe("about");
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
