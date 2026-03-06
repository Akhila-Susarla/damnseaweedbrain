---
phase: 03-bsd-experience-layer
plan: 01
subsystem: ui
tags: [visual-novel, dialogue-engine, svg, gsap, typewriter, caveat-font, motion]

requires:
  - phase: 02-content-scenes
    provides: TypewriterText component, useReducedMotion hook, dialogueActive store state
provides:
  - useDialogue state machine hook (advance/skip/reset)
  - CharacterPortrait SVG component with 6 expression variants
  - DialogueBox handwritten-note speech bubble with typewriter effect
  - DialogueEngine orchestrator composing portrait + box
  - 6 JSON dialogue data files (hero-intro + 5 section transitions)
  - Caveat handwriting font via next/font/google
affects: [03-02, 03-03, hero-integration, section-transitions]

tech-stack:
  added: [Caveat (Google Font)]
  patterns: [JSON-driven dialogue state machine, SVG expression layers, GSAP typewriter with click-to-complete]

key-files:
  created:
    - src/hooks/useDialogue.ts
    - src/components/vn/CharacterPortrait.tsx
    - src/components/vn/DialogueBox.tsx
    - src/components/vn/DialogueEngine.tsx
    - src/data/dialogue/hero-intro.json
    - src/data/dialogue/about-transition.json
    - src/data/dialogue/abilities-transition.json
    - src/data/dialogue/casefiles-transition.json
    - src/data/dialogue/intel-transition.json
    - src/data/dialogue/social-transition.json
    - src/__tests__/dialogue-engine.test.ts
    - src/__tests__/dialogue-data.test.ts
  modified:
    - src/data/types.ts
    - src/app/layout.tsx
    - src/app/globals.css

key-decisions:
  - "SVG expression layers with motion/react AnimatePresence for smooth expression transitions"
  - "GSAP timeline typewriter in DialogueBox (not reusing TypewriterText) for click-to-complete support"
  - "Caveat font registered in both layout.tsx and globals.css @theme for font-caveat Tailwind utility"

patterns-established:
  - "JSON dialogue files: {id, section, type, lines[{id, character, expression, text}]}"
  - "useDialogue hook: state machine with advance/skip/reset returning currentLine or null when complete"
  - "VN component composition: DialogueEngine > CharacterPortrait + DialogueBox"

requirements-completed: [VN-01, VN-02, VN-03, VN-06]

duration: 6min
completed: 2026-03-06
---

# Phase 3 Plan 1: VN Dialogue Core Summary

**JSON-driven dialogue engine with Dazai SVG portrait (6 expressions), handwritten-note speech bubbles, and GSAP typewriter with click-to-complete**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-06T17:11:59Z
- **Completed:** 2026-03-06T17:17:57Z
- **Tasks:** 2 (TDD task + component task)
- **Files modified:** 15

## Accomplishments
- useDialogue hook state machine with advance/skip/reset and 19 passing tests
- CharacterPortrait SVG with 6 swappable expression variants (neutral, smirk, laugh, serious, annoyed, mysterious) and Dazai bandage detail
- DialogueBox with handwritten-note styling (tilted, pen-stroke border, Caveat font) and GSAP typewriter with click-to-complete
- DialogueEngine orchestrator with ESC-skip, click-advance, and AnimatePresence transitions
- 6 content-aware dialogue JSON files with Dazai personality (mysterious opening, witty quips)
- Caveat font integrated via next/font/google with Tailwind font-caveat utility

## Task Commits

Each task was committed atomically:

1. **Task 1 (RED): Failing tests** - `265d395` (test)
2. **Task 1 (GREEN): Types, JSON data, useDialogue hook, Caveat font** - `5ce1cfd` (feat)
3. **Task 2: CharacterPortrait, DialogueBox, DialogueEngine** - `e2c3e31` (feat)

## Files Created/Modified
- `src/data/types.ts` - Added DialogueLine, DialogueSequence, DazaiExpression types
- `src/hooks/useDialogue.ts` - Dialogue state machine hook
- `src/components/vn/CharacterPortrait.tsx` - SVG Dazai portrait with expression variants
- `src/components/vn/DialogueBox.tsx` - Handwritten-note speech bubble with typewriter
- `src/components/vn/DialogueEngine.tsx` - Orchestrator composing portrait + box
- `src/data/dialogue/hero-intro.json` - 4-line intro sequence (mysterious -> smirk)
- `src/data/dialogue/about-transition.json` - 1-line origin story quip
- `src/data/dialogue/abilities-transition.json` - 2-line skills reference
- `src/data/dialogue/casefiles-transition.json` - 2-line case file humor
- `src/data/dialogue/intel-transition.json` - 1-line classified missions
- `src/data/dialogue/social-transition.json` - 2-line fourth-wall break
- `src/app/layout.tsx` - Added Caveat font import and variable
- `src/app/globals.css` - Registered --font-caveat in @theme
- `src/__tests__/dialogue-engine.test.ts` - 6 useDialogue hook behavior tests
- `src/__tests__/dialogue-data.test.ts` - 13 JSON schema validation tests

## Decisions Made
- Built DialogueBox-specific GSAP typewriter rather than reusing TypewriterText -- needed click-to-complete (timeline.progress(1)) and onComplete callback that the existing component doesn't support
- SVG expression layers with overlaid eyes/mouth/eyebrows per expression -- consistent with existing CSS silhouette approach, tiny bundle, vector-scalable
- Caveat font registered in both layout.tsx (next/font/google variable) and globals.css (@theme --font-caveat) so font-caveat Tailwind class works

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added font-caveat to Tailwind @theme**
- **Found during:** Task 2 (DialogueBox component)
- **Issue:** Plan specified adding Caveat to layout.tsx but did not mention registering in globals.css @theme -- without it, font-caveat Tailwind class would not resolve
- **Fix:** Added `--font-caveat: var(--font-caveat)` to @theme block in globals.css
- **Files modified:** src/app/globals.css
- **Verification:** Build succeeds, font-caveat class resolves
- **Committed in:** e2c3e31 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential for Caveat font to work with Tailwind. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- VN component library complete and ready for Plan 03-02/03-03 integration into hero and section transitions
- All 119 tests pass, build clean
- DialogueEngine accepts any DialogueSequence -- simply import a JSON file and pass it

## Self-Check: PASSED

All 12 created files verified present. All 3 task commits (265d395, 5ce1cfd, e2c3e31) verified in git log.

---
*Phase: 03-bsd-experience-layer*
*Completed: 2026-03-06*
