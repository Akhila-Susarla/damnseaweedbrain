---
phase: 02-content-scenes-navigation
plan: 04
subsystem: ui
tags: [gsap, scrolltrigger, motion, skill-cards, abilities, animation, responsive-grid]

# Dependency graph
requires:
  - phase: 02-content-scenes-navigation
    provides: GSAP ScrollTrigger, useGSAP, motion/react, Section component, happy-dom test infra
provides:
  - AbilitiesSection with 32 skills grouped by 4 categories with scroll animations
  - AbilityCard with tier badge, kanji subtitle, and expandable description
affects: [02-07]

# Tech tracking
tech-stack:
  added: []
  patterns: [ScrollTrigger.batch for efficient multi-element reveal, AnimatePresence for card detail expand]

key-files:
  created:
    - src/components/ui/AbilityCard.tsx
    - src/components/sections/AbilitiesSection.tsx
    - src/__tests__/abilities.test.ts
  modified: []

key-decisions:
  - "ScrollTrigger.batch instead of individual triggers for 32 cards — better performance"
  - "Combined hover (desktop) and click (mobile) for card detail expansion"

patterns-established:
  - "AbilityCard: button element with aria-expanded, tier color map, AnimatePresence for detail"
  - "Category grouping: reduce skills by category, render in fixed order with kanji headers"
  - "ScrollTrigger.batch: batch stagger animation for multiple similar elements"

requirements-completed: [ABIL-01, ABIL-02, ABIL-03, ABIL-04, ABIL-05]

# Metrics
duration: 5min
completed: 2026-03-06
---

# Phase 02 Plan 04: Abilities Section Summary

**RPG ability cards for 32 skills across 4 categories with tier badges, GSAP batch scroll animations, and expandable descriptions**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-06T12:17:01Z
- **Completed:** 2026-03-06T12:22:07Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- AbilityCard component with S/A/B/C tier badges in gold/teal/parchment colors, kanji subtitles, and AnimatePresence-powered expandable descriptions
- AbilitiesSection rendering all 32 skills in 4 category groups (Languages, DS/ML, Tools & Frameworks, Cloud) with kanji category headers
- GSAP ScrollTrigger.batch for efficient staggered card reveal on scroll with reduced motion support
- Responsive grid (2/3/4 columns) with keyboard accessibility (aria-expanded, focus-visible ring)
- 6 new tests covering skill rendering, category grouping, tier badges, kanji subtitles (84 total passing)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create AbilityCard component with tier badge and detail interaction** - `bd6b719` (feat)
2. **Task 2: Build AbilitiesSection with category grid and scroll animations** - `232e6f3` (feat)

## Files Created/Modified
- `src/components/ui/AbilityCard.tsx` - Individual skill card with tier badge, kanji subtitle, and expandable description on hover/click
- `src/components/sections/AbilitiesSection.tsx` - Skills grid organized by 4 categories with GSAP batch scroll animations
- `src/__tests__/abilities.test.ts` - 6 tests for skill rendering, categories, kanji, tier badges

## Decisions Made
- Used ScrollTrigger.batch instead of individual ScrollTrigger instances for 32 cards -- significantly more performant for large numbers of similar elements
- Combined hover (desktop) and click/tap (mobile) interactions for card detail expansion rather than separate interaction handlers

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed JSX comment lint error in heading**
- **Found during:** Task 2 (build verification)
- **Issue:** `//` literal in JSX h2 text was interpreted as a comment by ESLint react/jsx-no-comment-textnodes
- **Fix:** Wrapped `//` in JSX expression braces: `{'// '}`
- **Files modified:** src/components/sections/AbilitiesSection.tsx
- **Verification:** Build passes without ESLint errors
- **Committed in:** 232e6f3 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor JSX syntax fix. No scope creep.

## Issues Encountered
None beyond the JSX lint fix documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- AbilitiesSection ready to be included in page layout
- AbilityCard pattern reusable for similar card components
- ScrollTrigger.batch pattern established for future multi-element animations

---
*Phase: 02-content-scenes-navigation*
*Completed: 2026-03-06*

## Self-Check: PASSED
- All 3 created files exist on disk
- Both task commits (bd6b719, 232e6f3) verified in git log
- All 84 tests pass
- Next.js build succeeds
