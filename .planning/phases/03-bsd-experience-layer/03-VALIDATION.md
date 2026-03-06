---
phase: 3
slug: bsd-experience-layer
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-06
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest ^4.0.18 + @testing-library/react ^16.3 |
| **Config file** | package.json scripts (no separate vitest.config) |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm test && npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test`
- **After every plan wave:** Run `npm test && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | VN-01 | unit | `npx vitest run src/__tests__/dialogue-engine.test.ts -x` | No -- Wave 0 | pending |
| 03-01-02 | 01 | 1 | VN-02 | unit | `npx vitest run src/__tests__/character-portrait.test.ts -x` | No -- Wave 0 | pending |
| 03-01-03 | 01 | 1 | VN-03 | unit | `npx vitest run src/__tests__/dialogue-box.test.ts -x` | No -- Wave 0 | pending |
| 03-01-04 | 01 | 1 | VN-04 | integration | `npx vitest run src/__tests__/dialogue-skip.test.ts -x` | No -- Wave 0 | pending |
| 03-01-05 | 01 | 1 | VN-05 | integration | `npx vitest run src/__tests__/section-dialogue.test.ts -x` | No -- Wave 0 | pending |
| 03-01-06 | 01 | 1 | VN-06 | unit | `npx vitest run src/__tests__/dialogue-data.test.ts -x` | No -- Wave 0 | pending |
| 03-01-07 | 01 | 1 | HERO-04 | integration | `npx vitest run src/__tests__/hero-intro.test.ts -x` | No -- Wave 0 | pending |
| 03-02-01 | 02 | 2 | ANIM-02 | manual-only | Manual: scroll between sections, verify ink wash effect | N/A | pending |
| 03-03-01 | 03 | 2 | 3D-01 | integration | `npx vitest run src/__tests__/three-fallback.test.ts -x` | No -- Wave 0 | pending |
| 03-03-02 | 03 | 2 | 3D-02 | smoke | `npm run build` | Existing | pending |
| 03-03-03 | 03 | 2 | 3D-03 | unit | `npx vitest run src/__tests__/tilt-hook.test.ts -x` | No -- Wave 0 | pending |
| 03-03-04 | 03 | 2 | 3D-04 | manual-only | Manual: verify particles visible in hero | N/A | pending |
| 03-03-05 | 03 | 2 | 3D-05 | unit | `npx vitest run src/__tests__/webgl-support.test.ts -x` | No -- Wave 0 | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/dialogue-engine.test.ts` — stubs for VN-01
- [ ] `src/__tests__/dialogue-data.test.ts` — stubs for VN-06 (JSON schema validation)
- [ ] `src/__tests__/dialogue-skip.test.ts` — stubs for VN-04
- [ ] `src/__tests__/dialogue-box.test.ts` — stubs for VN-03
- [ ] `src/__tests__/character-portrait.test.ts` — stubs for VN-02
- [ ] `src/__tests__/hero-intro.test.ts` — stubs for HERO-04
- [ ] `src/__tests__/section-dialogue.test.ts` — stubs for VN-05
- [ ] `src/__tests__/tilt-hook.test.ts` — stubs for 3D-03
- [ ] `src/__tests__/webgl-support.test.ts` — stubs for 3D-05
- [ ] `src/__tests__/three-fallback.test.ts` — stubs for 3D-01
- [ ] Handwriting font (Caveat) added via next/font/google

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Ink wash dissolve between sections | ANIM-02 | Visual effect quality requires human judgment; scroll-driven animation timing is perceptual | 1. Scroll between any two sections 2. Verify ink wash dissolve plays smoothly 3. Verify scroll position maps to animation progress |
| Hero 3D particles render | 3D-04 | Visual presence of particles requires GPU context and human verification | 1. Load hero section 2. Verify floating particles (paper fragments, cherry blossoms, bandage strips) are visible 3. Verify particles respond to viewport |

*All other phase behaviors have automated verification.*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
