import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const globalsCss = fs.readFileSync(
  path.resolve(__dirname, "../app/globals.css"),
  "utf-8"
);

describe("Theme Tokens (globals.css)", () => {
  it("imports tailwindcss", () => {
    expect(globalsCss).toContain('@import "tailwindcss"');
  });

  it("contains @theme block", () => {
    expect(globalsCss).toContain("@theme");
  });

  describe("color tokens", () => {
    const requiredColors = [
      "midnight",
      "parchment",
      "gold",
      "teal",
      "classified-red",
    ];

    requiredColors.forEach((color) => {
      it(`defines --color-${color}`, () => {
        expect(globalsCss).toContain(`--color-${color}`);
      });
    });
  });

  describe("font tokens", () => {
    const requiredFonts = [
      { token: "--font-heading", variable: "--font-playfair-display" },
      { token: "--font-body", variable: "--font-inter" },
      { token: "--font-mono", variable: "--font-jetbrains-mono" },
    ];

    requiredFonts.forEach(({ token, variable }) => {
      it(`defines ${token} referencing ${variable}`, () => {
        expect(globalsCss).toContain(token);
        expect(globalsCss).toContain(variable);
      });
    });
  });

  describe("breakpoint tokens", () => {
    const breakpoints = [
      { name: "mobile", value: "375px" },
      { name: "tablet", value: "768px" },
      { name: "desktop", value: "1024px" },
      { name: "wide", value: "1440px" },
    ];

    breakpoints.forEach(({ name, value }) => {
      it(`defines --breakpoint-${name} as ${value}`, () => {
        expect(globalsCss).toContain(`--breakpoint-${name}: ${value}`);
      });
    });
  });
});
