---
phase: 4
slug: polish-launch
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-08
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.x with happy-dom |
| **Config file** | `vitest.config.mts` |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 0 | ASSET-04 | unit | `npx vitest run src/__tests__/og-image.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 0 | SEO-02 | unit | `npx vitest run src/__tests__/metadata.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 0 | SEO-02 | unit | `npx vitest run src/__tests__/jsonld.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-04 | 01 | 0 | SEO-02 | unit | `npx vitest run src/__tests__/sitemap.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-05 | 01 | 0 | SEO-02 | unit | `npx vitest run src/__tests__/robots.test.ts` | ❌ W0 | ⬜ pending |
| 04-XX-XX | XX | X | PERF | manual | Manual: Lighthouse audit | N/A | ⬜ pending |
| 04-XX-XX | XX | X | DEPLOY | manual | Manual: browser verification | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__tests__/og-image.test.ts` — stubs for ASSET-04 (test metadata exports)
- [ ] `src/__tests__/metadata.test.ts` — stubs for SEO-02 metadata fields
- [ ] `src/__tests__/jsonld.test.ts` — stubs for SEO-02 JSON-LD schemas
- [ ] `src/__tests__/sitemap.test.ts` — stubs for SEO-02 sitemap entries
- [ ] `src/__tests__/robots.test.ts` — stubs for SEO-02 robots rules
- [ ] `assets/fonts/PlayfairDisplay-Bold.ttf` — TTF font for OG image (Satori requirement)
- [ ] `assets/fonts/Inter-Regular.ttf` — TTF font for OG image

*Existing infrastructure covers test framework (Vitest already configured).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Lighthouse Performance score ≥ 90 | PERF | Requires running server and Chrome DevTools | `npx next build && npx next start`, run Lighthouse in Chrome DevTools |
| Lighthouse SEO score ≥ 90 | SEO-02 | Requires running server and Chrome DevTools | Same as above, check SEO category |
| Site live at damnseaweedbrain.com | DEPLOY | Requires DNS propagation and Vercel deploy | Open browser to damnseaweedbrain.com after deploy |
| OG image renders on LinkedIn/Twitter | ASSET-04 | Requires social platform preview tools | Use LinkedIn Post Inspector / Twitter Card Validator |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
