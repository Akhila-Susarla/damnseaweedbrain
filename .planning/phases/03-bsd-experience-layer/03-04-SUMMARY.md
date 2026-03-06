---
phase: 03-bsd-experience-layer
plan: 04
subsystem: ui
tags: [react-three-fiber, three.js, r3f, particles, ink-wash, scroll-transition, gsap, scrolltrigger]

requires:
  - phase: 03-bsd-experience-layer
    provides: FallbackProvider, use3DQuality, qualityLevel store, R3F packages
provides:
  - Hero 3D particle system (paper fragments, cherry blossoms, bandage strips)
  - Scene3D R3F Canvas wrapper with PerformanceMonitor auto-degradation
  - HeroEnvironment atmospheric backdrop (fog, lights, depth plane)
  - InkWashTransition scroll-driven dissolve between sections
  - FallbackProvider wired into Shell for global 3D quality context
affects: [03-bsd-experience-layer, hero-section, section-transitions, polish]

tech-stack:
  added: []
  patterns: [r3f-canvas-dynamic-import, particles-useframe, scroll-driven-clip-path-animation, createElement-polymorphic-pattern]

key-files:
  created:
    - src/components/three/HeroParticles.tsx
    - src/components/three/HeroEnvironment.tsx
    - src/components/three/Scene3D.tsx
    - src/components/transitions/InkWashTransition.tsx
    - src/__tests__/three-fallback.test.ts
  modified:
    - src/components/sections/HeroSection.tsx
    - src/components/layout/Shell.tsx
    - src/app/page.tsx
    - src/components/ui/TiltCard.tsx
    - src/components/ui/TypewriterText.tsx
    - eslint.config.mjs

key-decisions:
  - "createElement approach for TypewriterText polymorphic as prop to avoid TS ElementType children inference error"
  - "Simplified TiltCard to div-only (removed polymorphic as prop) since it is only used as div"
  - "ESLint test file override: allow @typescript-eslint/no-explicit-any in test files"
  - "Fixed-position InkWashTransition overlay (z-50) with clip-path animation instead of sprite sheets"

patterns-established:
  - "R3F Canvas via next/dynamic SSR:false with pointerEvents:none overlay"
  - "PerformanceMonitor auto-degradation: high->low->off via qualityLevel store"
  - "Scroll-driven clip-path tendril animation with GSAP ScrollTrigger scrub"

requirements-completed: [3D-04, ANIM-02]

duration: 21min
completed: 2026-03-06
---

# Phase 3 Plan 04: Hero 3D Particles & Ink Wash Transitions Summary

**R3F particle system with 3 particle types overlaying hero parallax, plus scroll-driven ink wash dissolve transitions between all sections**

## Performance

- **Duration:** 21 min
- **Started:** 2026-03-06T17:28:14Z
- **Completed:** 2026-03-06T17:49:31Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments
- Hero section has floating 3D particles (paper fragments, cherry blossoms, bandage strips) via R3F Points with useFrame animation loop
- Scene3D Canvas with PerformanceMonitor auto-degrades quality (high -> low -> off) based on frame rate
- Ink wash dissolve transitions with 4 tendril layers play between all 5 section boundaries on scroll
- All 139 tests pass, build succeeds with zero SSR errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Hero 3D scene with particles and atmospheric environment** - `e5786b1` (feat)
2. **Task 2: Ink wash scroll transitions between sections** - `e9b767e` (feat)

## Files Created/Modified
- `src/components/three/HeroParticles.tsx` - R3F Points particle system with 3 types, quality-adaptive counts, useFrame animation
- `src/components/three/HeroEnvironment.tsx` - Atmospheric fog, directional/ambient lights, depth backdrop plane
- `src/components/three/Scene3D.tsx` - R3F Canvas wrapper with PerformanceMonitor and quality gating
- `src/components/transitions/InkWashTransition.tsx` - Scroll-driven 4-layer clip-path ink wash overlay
- `src/__tests__/three-fallback.test.ts` - 2 tests: Scene3D null when WebGL unsupported and quality off
- `src/components/sections/HeroSection.tsx` - Added dynamic Scene3D import at z-[3] between parallax and content
- `src/components/layout/Shell.tsx` - Wrapped children with FallbackProvider for 3D quality context
- `src/app/page.tsx` - Added InkWashTransition between all 5 section pairs
- `src/components/ui/TiltCard.tsx` - Simplified to div-only, fixed TS type error
- `src/components/ui/TypewriterText.tsx` - Switched to createElement for polymorphic rendering
- `eslint.config.mjs` - Added test file override for no-explicit-any

## Decisions Made
- Used createElement() instead of JSX for TypewriterText's polymorphic `as` prop -- avoids TS `children: never` inference bug with React.ElementType in JSX
- Simplified TiltCard to div-only since it's not used with any other element type -- eliminates polymorphic type complexity
- Added ESLint override allowing `@typescript-eslint/no-explicit-any` in test files -- test mocks legitimately need `any` for mock factories
- InkWashTransition uses CSS clip-path animation with GSAP ScrollTrigger scrub rather than canvas/sprite sheet -- lighter weight, fully scroll-reversible

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed polymorphic ElementType TS build errors in TiltCard and TypewriterText**
- **Found during:** Task 1 (build verification)
- **Issue:** React 19 + TypeScript strict mode causes `children: never` type error when using `React.ElementType` in JSX tags
- **Fix:** TiltCard simplified to div-only; TypewriterText uses createElement() with `keyof JSX.IntrinsicElements`
- **Files modified:** src/components/ui/TiltCard.tsx, src/components/ui/TypewriterText.tsx
- **Committed in:** e5786b1 (Task 1 commit)

**2. [Rule 3 - Blocking] Fixed pre-existing lint errors in test files blocking build**
- **Found during:** Task 1 (build verification)
- **Issue:** @typescript-eslint/no-explicit-any errors in hero-intro.test.ts and section-dialogue.test.ts from Plan 03-03 mock factories
- **Fix:** Added ESLint config override allowing `any` in test files
- **Files modified:** eslint.config.mjs
- **Committed in:** e5786b1 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes necessary for build to pass. No scope creep.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 3D particle system ready for visual fine-tuning in Plan 05
- Ink wash transitions ready for visual verification in Plan 05
- PerformanceMonitor auto-degradation active for all quality levels

---
*Phase: 03-bsd-experience-layer*
*Completed: 2026-03-06*
