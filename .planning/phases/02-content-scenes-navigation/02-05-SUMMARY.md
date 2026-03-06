---
phase: 02-content-scenes-navigation
plan: 05
subsystem: ui
tags: [case-files, projects, motion, AnimatePresence, flip-animation, stamp-badge, gsap, scrolltrigger]

# Dependency graph
requires:
  - phase: 02-content-scenes-navigation
    provides: Lenis smooth scroll, GSAP ScrollTrigger, NavPanel, useReducedMotion, test infrastructure (happy-dom)
provides:
  - CaseFilesSection with 3 project folders in responsive grid
  - CaseFolder component with flip-open animation and expanded details
  - StampBadge reusable component with status-based color coding
affects: [02-07]

# Tech tracking
tech-stack:
  added: []
  patterns: [Motion AnimatePresence for expand/collapse, spring transition for folder flip, GSAP staggered scroll reveal for cards]

key-files:
  created:
    - src/components/sections/CaseFilesSection.tsx
    - src/components/ui/CaseFolder.tsx
    - src/components/ui/StampBadge.tsx
    - src/__tests__/casefiles.test.ts
  modified: []

key-decisions:
  - "Filter out empty-URL links in CaseFolder to avoid broken anchor tags"
  - "StampBadge uses Tailwind utility classes (not CSS texture class) for flexibility across contexts"

patterns-established:
  - "CaseFolder: motion.div with rotateX spring transition for folder flip, AnimatePresence for details reveal"
  - "StampBadge: reusable status badge with color map (classified-red, teal, gold) and rotation"
  - "Motion mock pattern: vi.mock motion/react returning plain createElement divs for testing"

requirements-completed: [CASE-01, CASE-02, CASE-03, CASE-04, CASE-05, CASE-06]

# Metrics
duration: 5min
completed: 2026-03-06
---

# Phase 02 Plan 05: Case Files Section Summary

**Interactive case file folders with flip animation, rubber stamp status badges, and expandable project details for 3 portfolio projects**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-06T12:17:03Z
- **Completed:** 2026-03-06T12:22:09Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- CaseFilesSection rendering 3 project folders (Influence Maximization, NER Radar, UniWay) in responsive 1/2/3-column grid
- CaseFolder with spring-animated flip-open revealing description, tech tags, highlights, and links
- StampBadge reusable component with color-coded status (Classified=red, Solved=teal, Active=gold) and slight rotation
- Full keyboard accessibility (button with aria-expanded, focus-visible ring, Enter/Space toggle)
- Reduced motion support disabling all animations
- 5 component tests covering rendering, stamps, aria attributes, and heading

## Task Commits

Each task was committed atomically:

1. **Task 1: Create StampBadge and CaseFolder components** - `4162a7e` (feat)
2. **Task 2: Build CaseFilesSection with scroll animations and tests** - `231dc4c` (feat)

## Files Created/Modified
- `src/components/ui/StampBadge.tsx` - Reusable status stamp with CaseStatus color mapping and aria-label
- `src/components/ui/CaseFolder.tsx` - Expandable case file folder with motion flip animation, stamp, and detail sections
- `src/components/sections/CaseFilesSection.tsx` - Section rendering 3 CaseFolder instances with GSAP staggered scroll reveal
- `src/__tests__/casefiles.test.ts` - 5 tests: renders 3 files, titles+stamps, correct statuses, aria-expanded, heading text

## Decisions Made
- Filtered out links with empty URLs in CaseFolder to prevent broken anchor tags (projects.ts has placeholder empty URLs)
- Used Tailwind utility classes for StampBadge rather than extending the existing .stamp-classified CSS class, allowing per-status color variants without CSS modifications
- Mocked motion/react with plain createElement divs in tests to avoid DOM complexity from animation library

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed ESLint jsx-no-comment-textnodes error in CaseFilesSection**
- **Found during:** Task 2 (build verification)
- **Issue:** `//` separator text in h2 heading was interpreted as JSX comment by ESLint
- **Fix:** Wrapped `//` in JSX expression `{'// '}`
- **Files modified:** src/components/sections/CaseFilesSection.tsx
- **Verification:** Build succeeds without lint errors
- **Committed in:** 231dc4c (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor lint fix. No scope creep.

## Issues Encountered
None beyond the lint fix documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- CaseFilesSection ready to be rendered in page layout
- StampBadge component reusable for IntelSection dossier stamps (plan 02-06)
- Motion mock pattern established for testing animated components

---
*Phase: 02-content-scenes-navigation*
*Completed: 2026-03-06*

## Self-Check: PASSED
- All 4 created files exist on disk
- Both task commits (4162a7e, 231dc4c) verified in git log
- All 84 tests pass
- Next.js build succeeds
