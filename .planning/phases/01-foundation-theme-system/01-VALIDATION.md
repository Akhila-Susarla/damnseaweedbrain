---
phase: 1
slug: foundation-theme-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-06
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (lightweight, Vite-native, fast) |
| **Config file** | vitest.config.ts — Wave 0 installs |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run && npx next build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run && npx next build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | FNDN-01 | smoke | `npx next build` | Wave 0 | ⬜ pending |
| 01-01-02 | 01 | 1 | FNDN-05 | unit | `npx vitest run src/__tests__/theme.test.ts` | Wave 0 | ⬜ pending |
| 01-01-03 | 01 | 1 | FNDN-02 | unit | `npx vitest run src/__tests__/theme.test.ts` | Wave 0 | ⬜ pending |
| 01-01-04 | 01 | 1 | FNDN-03 | unit | `npx vitest run src/__tests__/theme.test.ts` | Wave 0 | ⬜ pending |
| 01-01-05 | 01 | 1 | ASSET-03 | smoke | `npx next build` | Wave 0 | ⬜ pending |
| 01-01-06 | 01 | 1 | FNDN-06 | unit | `npx vitest run src/__tests__/store.test.ts` | Wave 0 | ⬜ pending |
| 01-02-01 | 02 | 1 | ASSET-01 | manual | Visual inspection | N/A | ⬜ pending |
| 01-02-02 | 02 | 1 | ASSET-02 | unit | `npx vitest run src/__tests__/textures.test.ts` | Wave 0 | ⬜ pending |
| 01-02-03 | 02 | 1 | SEO-03 | unit | `npx vitest run src/__tests__/contrast.test.ts` | Wave 0 | ⬜ pending |
| 01-02-04 | 02 | 1 | FNDN-04, ASSET-05 | smoke | `npx next build && du -sh .next/static` | Wave 0 | ⬜ pending |
| 01-02-05 | 02 | 1 | — | unit | `npx vitest run src/__tests__/data.test.ts` | Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — framework configuration
- [ ] `npm install --save-dev vitest @vitejs/plugin-react jsdom` — test framework install
- [ ] `src/__tests__/theme.test.ts` — validates CSS custom properties exist and theme tokens defined
- [ ] `src/__tests__/store.test.ts` — validates Zustand store shape and defaults
- [ ] `src/__tests__/contrast.test.ts` — validates color pair contrast ratios >= 4.5:1
- [ ] `src/__tests__/textures.test.ts` — validates texture CSS class definitions exist
- [ ] `src/__tests__/data.test.ts` — validates resume data files export correct types

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| BSD visual motifs render correctly | ASSET-01 | Visual quality requires human judgment | Open dev server, verify bandage patterns, paper textures, stamps visually render against midnight bg |
| Section gradient shifts visible | FNDN-02 | Subtle visual differences need human eye | Scroll through demo page, confirm sections have slightly different midnight blue depths |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
