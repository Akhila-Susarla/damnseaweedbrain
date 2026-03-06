---
phase: 03-bsd-experience-layer
plan: 03
subsystem: ui
tags: [vn-dialogue, scroll-lock, lenis, gsap, scrolltrigger, motion-react]

requires:
  - phase: 03-bsd-experience-layer/03-01
    provides: DialogueEngine, useDialogue hook, CharacterPortrait, DialogueBox, dialogue JSON data
provides:
  - HeroIntro component with scroll-lock dialogue on first load
  - SectionDialogue component with ScrollTrigger-based transition dialogues
  - SectionDialogues wrapper rendering all 5 section transition dialogues
  - Full VN narration experience wired into page flow
affects: [03-bsd-experience-layer/03-04, 03-bsd-experience-layer/03-05]

tech-stack:
  added: []
  patterns: [lenis stop/start for scroll lock, ScrollTrigger once:true for one-shot triggers, globalThis for mock state in vitest]

key-files:
  created:
    - src/components/vn/HeroIntro.tsx
    - src/components/vn/SectionDialogue.tsx
    - src/components/vn/SectionDialogues.tsx
    - src/__tests__/hero-intro.test.ts
    - src/__tests__/dialogue-skip.test.ts
    - src/__tests__/section-dialogue.test.ts
  modified:
    - src/components/sections/HeroSection.tsx
    - src/app/page.tsx

key-decisions:
  - "HeroIntro uses 300ms delay before locking scroll to let page settle"
  - "SectionDialogues placed as sibling before content sections (not inside each section) for cleaner separation"
  - "globalThis pattern for ScrollTrigger mock callbacks to avoid vitest hoisting issues"

patterns-established:
  - "Scroll lock via lenisRef.current.stop()/start() with cleanup safety"
  - "ScrollTrigger once:true for session-only section triggers"
  - "AnimatePresence + hasPlayed state for one-shot dialogue components"

requirements-completed: [HERO-04, VN-04, VN-05]

duration: 7min
completed: 2026-03-06
---

# Phase 3 Plan 03: VN Dialogue Wiring Summary

**Hero intro dialogue with scroll lock + 5 ScrollTrigger section transition dialogues, all skippable via ESC**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-06T17:28:02Z
- **Completed:** 2026-03-06T17:35:14Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Hero intro locks scroll on load, plays Dazai narration, unlocks on completion or ESC skip
- Scroll indicator hidden during active dialogue for clean UX
- 5 section transition dialogues trigger once per session via ScrollTrigger onEnter
- Section dialogues never lock scroll (hero-only behavior per user decision)
- 16 new tests across 3 test files, all 139 project tests passing

## Task Commits

Each task was committed atomically:

1. **Task 1: HeroIntro component with scroll lock and skip behavior** - `50c494b` (feat)
2. **Task 2: SectionDialogue component with ScrollTrigger integration** - `30962d1` (feat)

## Files Created/Modified
- `src/components/vn/HeroIntro.tsx` - Hero intro dialogue with lenis scroll lock, ESC skip, session tracking
- `src/components/vn/SectionDialogue.tsx` - ScrollTrigger-based section transition dialogue (non-blocking)
- `src/components/vn/SectionDialogues.tsx` - Client wrapper rendering all 5 transition dialogues
- `src/components/sections/HeroSection.tsx` - Integrated HeroIntro, conditional scroll indicator visibility
- `src/app/page.tsx` - Added SectionDialogues to page layout
- `src/__tests__/hero-intro.test.ts` - HeroIntro rendering and scroll indicator tests
- `src/__tests__/dialogue-skip.test.ts` - Skip behavior and post-skip state tests
- `src/__tests__/section-dialogue.test.ts` - ScrollTrigger creation and trigger callback tests

## Decisions Made
- HeroIntro uses 300ms mount delay before locking scroll to let page rendering settle
- SectionDialogues wrapper placed as sibling before content sections rather than inside each section, cleaner separation of concerns
- Used globalThis pattern for ScrollTrigger mock callbacks in tests to work around vitest's factory hoisting

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-existing build type error in TypewriterText.tsx / TiltCard.tsx polymorphic `as` prop (not caused by this plan, out of scope)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- VN dialogue system fully wired into page flow
- Ready for plan 03-04 (ink wash transitions) and 03-05 (polish)
- Pre-existing TypeScript build errors in unrelated files should be addressed in a future plan

---
*Phase: 03-bsd-experience-layer*
*Completed: 2026-03-06*
