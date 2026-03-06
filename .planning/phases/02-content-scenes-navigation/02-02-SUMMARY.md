---
phase: 02-content-scenes-navigation
plan: 02
subsystem: ui
tags: [gsap, scrolltrigger, parallax, typewriter, hero, animation, reduced-motion]

# Dependency graph
requires:
  - phase: 02-content-scenes-navigation
    provides: Lenis smooth scroll, GSAP ScrollTrigger, NavPanel, useReducedMotion, Section component, Zustand store
provides:
  - HeroSection with 3-layer parallax scroll animation
  - TypewriterText reusable component for character-by-character reveal
  - Scroll-down indicator with Lenis scrollTo integration
  - bounce-gentle CSS keyframe animation
affects: [02-03, 02-04, 02-05, 02-06, 02-07]

# Tech tracking
tech-stack:
  added: []
  patterns: [GSAP ScrollTrigger scrub parallax, TypewriterText with reducedMotion guard, CSS clip-path silhouette placeholder, polymorphic component via 'as' prop]

key-files:
  created:
    - src/components/ui/TypewriterText.tsx
    - src/components/sections/HeroSection.tsx
    - src/__tests__/typewriter.test.ts
    - src/__tests__/hero.test.ts
  modified:
    - src/app/globals.css

key-decisions:
  - "CSS clip-path silhouette for Dazai character placeholder instead of placeholder image"
  - "Polymorphic 'as' prop on TypewriterText for flexible element rendering (h1, span, etc.)"
  - "bounce-gentle custom keyframe for scroll indicator (2s ease-in-out, 8px translateY)"

patterns-established:
  - "TypewriterText: reusable text reveal with GSAP timeline, reducedMotion bypass, aria-label accessibility"
  - "Parallax layer pattern: .parallax-bg/-mid/-fg with different scrub y-offsets"
  - "Section component with !py-0 override for full-viewport hero sections"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-05, ANIM-04]

# Metrics
duration: 5min
completed: 2026-03-06
---

# Phase 02 Plan 02: Hero Section Summary

**Full-viewport hero with 3-layer GSAP parallax, TypewriterText title reveal, Dazai silhouette placeholder, and scroll-down indicator**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-06T12:16:43Z
- **Completed:** 2026-03-06T12:22:09Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- TypewriterText reusable component with GSAP character-by-character animation, reduced motion support, and polymorphic rendering
- HeroSection with 3 parallax layers (noir atmosphere, Dazai silhouette, floating bandages/kanji) driven by GSAP ScrollTrigger scrub
- Scroll-down indicator with bounce animation and Lenis scrollTo #about integration
- 9 new tests (4 typewriter + 5 hero), 84 total passing

## Task Commits

Each task was committed atomically:

1. **Task 1: Create TypewriterText component** - `018d162` (feat)
2. **Task 2: Build HeroSection with parallax, scroll indicator, and tests** - `d87c28f` (feat)

## Files Created/Modified
- `src/components/ui/TypewriterText.tsx` - Reusable typewriter text animation with GSAP timeline, reducedMotion bypass, aria-label
- `src/components/sections/HeroSection.tsx` - Hero section with 3-layer parallax, character placeholder, typewriter h1, scroll indicator
- `src/__tests__/typewriter.test.ts` - 4 tests: reduced motion, aria-label, empty initial state, custom tag
- `src/__tests__/hero.test.ts` - 5 tests: parallax layers, character placeholder, scroll indicator, h1 heading, subtitle
- `src/app/globals.css` - Added bounce-gentle keyframe animation and custom animation token

## Decisions Made
- Used CSS clip-path polygon for Dazai character silhouette placeholder rather than a placeholder image -- keeps the component self-contained with no external assets needed, easily swappable later
- Added polymorphic `as` prop to TypewriterText so it can render as h1 for hero title or span elsewhere
- Custom bounce-gentle animation (2s ease-in-out, 8px Y translation) for scroll indicator -- gentler than Tailwind's default bounce

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- HeroSection ready to integrate into page.tsx (currently only tests verify rendering)
- TypewriterText component available for reuse in other sections
- Parallax layer pattern established for potential use in other sections
- All 84 tests pass, build succeeds

---
*Phase: 02-content-scenes-navigation*
*Completed: 2026-03-06*

## Self-Check: PASSED
- All 5 files verified on disk
- Both task commits (018d162, d87c28f) verified in git log
- All 84 tests pass
- Next.js build succeeds
