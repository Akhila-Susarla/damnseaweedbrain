---
phase: 02-content-scenes-navigation
plan: 01
subsystem: ui
tags: [lenis, gsap, scrolltrigger, motion, smooth-scroll, navigation, reduced-motion, happy-dom]

# Dependency graph
requires:
  - phase: 01-foundation-theme-system
    provides: Zustand store with currentSection/reducedMotion, theme tokens, cn() utility, Section/Shell components
provides:
  - Lenis smooth scroll provider wrapping app
  - GSAP ScrollTrigger registered and available
  - NavPanel with 6 section labels and scroll tracking
  - useReducedMotion hook syncing system preference to Zustand
  - Component test infrastructure (happy-dom, @testing-library/react)
affects: [02-02, 02-03, 02-04, 02-05, 02-06, 02-07]

# Tech tracking
tech-stack:
  added: [lenis, gsap, "@gsap/react", motion, "@testing-library/react", "@testing-library/jest-dom", happy-dom]
  patterns: [ReactLenis root provider, useGSAP for scroll animations, ScrollTrigger section tracking, useLenis scrollTo]

key-files:
  created:
    - src/components/layout/SmoothScroll.tsx
    - src/hooks/useReducedMotion.ts
    - src/components/nav/NavPanel.tsx
    - src/__tests__/reducedmotion.test.ts
    - src/__tests__/nav.test.ts
  modified:
    - package.json
    - vitest.config.mts
    - src/app/layout.tsx

key-decisions:
  - "happy-dom instead of jsdom for vitest: jsdom v28 has ESM require() incompatibility with Node 18"
  - "ReactLenis root auto-sync with GSAP: using built-in sync, manual fallback documented in comments"
  - "NavPanel uses two nav landmarks: desktop side rail and mobile bottom bar"

patterns-established:
  - "SmoothScroll provider: wrap app children in ReactLenis with root prop"
  - "useGSAP + ScrollTrigger: section tracking pattern with onEnter/onEnterBack"
  - "useLenis scrollTo: navigation click handler pattern"
  - "Component tests: happy-dom environment with @testing-library/react"

requirements-completed: [NAV-01, NAV-02, NAV-03, NAV-04, ANIM-01, ANIM-03, ANIM-05]

# Metrics
duration: 7min
completed: 2026-03-06
---

# Phase 02 Plan 01: Scroll & Navigation Infrastructure Summary

**Lenis smooth scroll with GSAP ScrollTrigger sync, BSD-styled NavPanel with 6-section tracking, and useReducedMotion hook**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-06T12:06:54Z
- **Completed:** 2026-03-06T12:13:58Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Lenis smooth scroll provider wrapping the app with GSAP ScrollTrigger registered
- NavPanel with 6 labeled navigation buttons on desktop side rail and mobile bottom bar
- Scroll tracking via ScrollTrigger updating Zustand currentSection with progress indicator
- useReducedMotion hook syncing prefers-reduced-motion to Zustand store
- Component test infrastructure with happy-dom and @testing-library/react (9 new tests, 59 total passing)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install libraries, configure test environment, create SmoothScroll provider and useReducedMotion hook** - `1c29556` (feat)
2. **Task 2: Build NavPanel with scroll tracking, render in layout.tsx** - `df3ba6f` (feat)

## Files Created/Modified
- `src/components/layout/SmoothScroll.tsx` - Lenis + GSAP integration provider with ReactLenis root
- `src/hooks/useReducedMotion.ts` - Syncs prefers-reduced-motion media query to Zustand store
- `src/components/nav/NavPanel.tsx` - BSD-styled navigation panel with scroll tracking and progress line
- `src/__tests__/reducedmotion.test.ts` - 4 tests for reduced motion hook behavior and cleanup
- `src/__tests__/nav.test.ts` - 5 tests for NavPanel rendering, aria-labels, and active state
- `package.json` - Added lenis, gsap, @gsap/react, motion, testing-library, happy-dom
- `vitest.config.mts` - Changed environment from node to happy-dom
- `src/app/layout.tsx` - Wrapped children in SmoothScroll, added NavPanel at layout level

## Decisions Made
- Used happy-dom instead of jsdom: jsdom v28 has an ESM require() incompatibility with Node 18 (ERR_REQUIRE_ESM on @exodus/bytes). happy-dom works without issues.
- ReactLenis root auto-sync approach: recent Lenis versions auto-sync with GSAP ScrollTrigger. Manual sync code documented as fallback comments in SmoothScroll.tsx.
- NavPanel renders two nav landmarks (desktop side rail + mobile bottom bar) rather than a single responsive element, for cleaner layout separation.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Switched from jsdom to happy-dom for vitest environment**
- **Found during:** Task 1 (test environment configuration)
- **Issue:** jsdom v28 fails with `ERR_REQUIRE_ESM` when loading html-encoding-sniffer under Node 18
- **Fix:** Installed happy-dom and set vitest environment to happy-dom instead of jsdom
- **Files modified:** vitest.config.mts, package.json
- **Verification:** All 59 tests pass including existing data/store tests
- **Committed in:** 1c29556 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary environment fix for Node 18 compatibility. No scope creep.

## Issues Encountered
None beyond the jsdom/happy-dom switch documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Smooth scroll infrastructure ready for all subsequent section plans
- NavPanel renders and tracks sections; section components (hero, about, etc.) will create the matching DOM targets
- GSAP ScrollTrigger and Motion are installed and ready for scroll-driven and lifecycle animations
- Component test infrastructure ready for section-level tests in plans 02-07

---
*Phase: 02-content-scenes-navigation*
*Completed: 2026-03-06*

## Self-Check: PASSED
- All 5 created files exist on disk
- Both task commits (1c29556, df3ba6f) verified in git log
- All 59 tests pass
- Next.js build succeeds
