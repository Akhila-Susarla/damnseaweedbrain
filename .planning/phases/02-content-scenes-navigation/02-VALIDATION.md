---
phase: 2
slug: content-scenes-navigation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-06
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 |
| **Config file** | vitest.config.mts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | NAV-01 | unit | `npx vitest run src/__tests__/nav.test.ts -t "renders"` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | NAV-02 | unit | `npx vitest run src/__tests__/nav.test.ts -t "scroll"` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | NAV-04 | unit | `npx vitest run src/__tests__/sections.test.ts -t "accessible"` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | HERO-02 | unit | `npx vitest run src/__tests__/typewriter.test.ts` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | ABOUT-01 | unit | `npx vitest run src/__tests__/about.test.ts` | ❌ W0 | ⬜ pending |
| 02-02-03 | 02 | 1 | ABIL-01, ABIL-03 | unit | `npx vitest run src/__tests__/abilities.test.ts` | ❌ W0 | ⬜ pending |
| 02-03-01 | 03 | 2 | CASE-04, CASE-06 | unit | `npx vitest run src/__tests__/casefiles.test.ts` | ❌ W0 | ⬜ pending |
| 02-03-02 | 03 | 2 | INTL-05, INTL-07 | unit | `npx vitest run src/__tests__/intel.test.ts` | ❌ W0 | ⬜ pending |
| 02-03-03 | 03 | 2 | SOCL-01, SOCL-02, SOCL-03 | unit | `npx vitest run src/__tests__/data.test.ts -t "Social"` | ✅ | ⬜ pending |
| 02-04-01 | 04 | 2 | ANIM-05 | unit | `npx vitest run src/__tests__/reducedmotion.test.ts` | ❌ W0 | ⬜ pending |
| 02-04-02 | 04 | 2 | SEO-01 | unit | `npx vitest run src/__tests__/seo.test.ts` | ❌ W0 | ⬜ pending |
| 02-04-03 | 04 | 2 | SEO-04, SEO-05 | unit | `npx vitest run src/__tests__/accessibility.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.mts` — switch environment to `jsdom` for DOM testing
- [ ] Install `@testing-library/react` + `@testing-library/jest-dom`
- [ ] `src/__tests__/nav.test.ts` — stubs for NAV-01, NAV-02, NAV-04
- [ ] `src/__tests__/sections.test.ts` — stubs for all 6 sections rendering
- [ ] `src/__tests__/typewriter.test.ts` — stubs for HERO-02
- [ ] `src/__tests__/about.test.ts` — stubs for ABOUT-01, ABOUT-02, ABOUT-03
- [ ] `src/__tests__/abilities.test.ts` — stubs for ABIL-01, ABIL-03
- [ ] `src/__tests__/casefiles.test.ts` — stubs for CASE-04, CASE-06
- [ ] `src/__tests__/intel.test.ts` — stubs for INTL-05, INTL-07
- [ ] `src/__tests__/reducedmotion.test.ts` — stubs for ANIM-05
- [ ] `src/__tests__/seo.test.ts` — stubs for SEO-01
- [ ] `src/__tests__/accessibility.test.ts` — stubs for SEO-04, SEO-05

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Smooth scroll feel and momentum | NAV-02 | Subjective UX quality | Scroll between sections, verify smooth interpolation |
| Parallax depth perception | HERO-03, ANIM-04 | Visual depth effect | Scroll through hero, verify 3 layers move at different speeds |
| Typewriter animation timing | HERO-02 | Visual timing quality | Watch title reveal, verify natural typing cadence |
| Scroll-triggered reveal timing | ABOUT-04, ABIL-04 | Visual animation quality | Scroll to sections, verify stagger and easing feel right |
| Folder flip animation feel | CASE-04 | Spring physics feel | Click case files, verify flip feels natural |
| Redacted text reveal effect | INTL-06 | Visual reveal quality | Scroll through Intel, verify black bars lift naturally |
| Dazai character visual quality | HERO-01 | Image sourcing/quality | Verify character renders display well in parallax scene |
| Mobile navigation usability | NAV-01 | Touch interaction quality | Test bottom bar on mobile viewport |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
