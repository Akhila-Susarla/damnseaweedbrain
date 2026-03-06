---
phase: 01-foundation-theme-system
plan: 02
subsystem: ui, data
tags: [typescript, css, textures, resume-data, wcag, next-image, vitest]

requires:
  - phase: 01-foundation-theme-system/01-01
    provides: "Theme tokens, Shell/Section layout, Zustand store, Vitest infrastructure"
provides:
  - "Typed resume data (skills, projects, experience, education, social) importable from src/data/"
  - "CSS texture classes for BSD noir visual motifs (paper noise, bandage stripes, classified stamp, ink splatter, aged edges, ability glow)"
  - "WCAG AA contrast compliance validation tests"
  - "Next.js image optimization config (WebP/AVIF)"
affects: [02-content-scenes, 03-bsd-experience, 04-polish]

tech-stack:
  added: [mammoth, tsx]
  patterns: ["CSS-only textures (no external images)", "Typed data layer pattern with const exports", "WCAG AA contrast testing with luminance calculation"]

key-files:
  created:
    - src/data/types.ts
    - src/data/skills.ts
    - src/data/projects.ts
    - src/data/experience.ts
    - src/data/education.ts
    - src/data/social.ts
    - src/styles/textures.css
    - src/__tests__/contrast.test.ts
    - src/__tests__/textures.test.ts
    - src/__tests__/data.test.ts
    - scripts/parse-resume.ts
  modified:
    - src/app/globals.css
    - src/app/page.tsx
    - next.config.ts

key-decisions:
  - "CSS gradient noise instead of SVG feTurbulence for cross-browser paper texture visibility"
  - "S/A/B/C skill tiers inferred from resume context (user to review)"
  - "Warm-toned aged edge shadows for contrast against midnight background"

patterns-established:
  - "Data layer: typed const arrays exported from src/data/*.ts"
  - "Texture classes: CSS-only with ::before/::after pseudo-elements, pointer-events:none"
  - "Contrast testing: hex-to-luminance utility reusable for future color additions"

requirements-completed: [ASSET-01, ASSET-02, ASSET-05, FNDN-04, SEO-03]

duration: 35min
completed: 2026-03-06
---

# Phase 1 Plan 2: Resume Data & BSD Textures Summary

**Typed resume data layer with S/A/B/C skill tiers, CSS-only BSD noir textures (paper noise, bandage stripes, aged edges, classified stamps), WCAG AA contrast validation, and Next.js image pipeline config**

## Performance

- **Duration:** ~35 min (across sessions, including checkpoint pause for visual verification)
- **Started:** 2026-03-06T09:45:00Z
- **Completed:** 2026-03-06T10:58:00Z
- **Tasks:** 3
- **Files modified:** 14

## Accomplishments
- Parsed actual resume (.docx) into 6 typed TypeScript data files covering skills (20+), projects (3), experience (4), education (2), and social links (3)
- Created 6 CSS-only BSD noir texture classes rendering paper noise, bandage stripes, classified stamps, ink splatters, aged edges, and ability glow
- All 7 WCAG AA color pair tests pass at 4.5:1+ contrast ratio
- Fixed three invisible textures after visual verification (paper noise, bandage stripes, aged edges)

## Task Commits

Each task was committed atomically:

1. **Task 1: Parse resume and create typed data files** - `5367e60` (feat)
2. **Task 2: Create CSS/SVG textures, configure asset pipeline, and add validation tests** - `abb6f5a` (feat)
3. **Task 3: Visual verification fixes** - `ca4900a` (fix)

## Files Created/Modified
- `scripts/parse-resume.ts` - One-time resume extraction script using mammoth
- `src/data/types.ts` - TypeScript interfaces (Skill, CaseFile, IntelDossier, Education, SocialLink)
- `src/data/skills.ts` - 20+ skills with S/A/B/C tiers across 4 categories
- `src/data/projects.ts` - 3 case files with Solved/Active/Classified statuses
- `src/data/experience.ts` - 4 intel dossiers with periods and highlights
- `src/data/education.ts` - 2 education entries with GPAs
- `src/data/social.ts` - LinkedIn, GitHub, Email links
- `src/styles/textures.css` - 6 BSD noir texture classes (CSS-only, no external images)
- `src/app/globals.css` - Added textures.css import
- `src/app/page.tsx` - Texture showcase demo page with skill data integration
- `next.config.ts` - WebP/AVIF image optimization, responsive device sizes
- `src/__tests__/contrast.test.ts` - WCAG AA contrast ratio validation
- `src/__tests__/textures.test.ts` - Texture class definition and no-external-URL checks
- `src/__tests__/data.test.ts` - Resume data structure and completeness tests

## Decisions Made
- Used CSS gradient-based noise pattern instead of SVG feTurbulence for paper texture (feTurbulence does not render when used as CSS background-image in most browsers)
- Bandage stripes at 25% opacity with 3px width for visibility on dark backgrounds (original 5% opacity / 1px was invisible)
- Aged edge shadows use warm tones (rgba 160/140/100) instead of dark tones matching the midnight background, creating visible contrast
- Skill tier ratings inferred from resume emphasis/frequency -- user should review and adjust

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Paper noise texture invisible due to SVG feTurbulence rendering limitation**
- **Found during:** Task 3 (visual verification)
- **Issue:** SVG feTurbulence filters do not render when used as CSS background-image in browsers; combined with 0.04 opacity, texture was completely invisible
- **Fix:** Replaced with layered CSS repeating-linear-gradient pattern at 0.15 opacity, creating visible fine-grain noise
- **Files modified:** src/styles/textures.css
- **Verification:** User visual verification
- **Committed in:** ca4900a

**2. [Rule 1 - Bug] Bandage stripes invisible at 5% opacity**
- **Found during:** Task 3 (visual verification)
- **Issue:** rgba opacity 0.05 with 1px stripe width on dark background produced no visible pattern
- **Fix:** Increased opacity to 0.25 and widened stripes from 1px to 3px (6px gap + 3px stripe)
- **Files modified:** src/styles/textures.css
- **Committed in:** ca4900a

**3. [Rule 1 - Bug] Aged edges invisible due to same-color shadow**
- **Found during:** Task 3 (visual verification)
- **Issue:** Inset box-shadow used rgba(10, 14, 26) which is nearly identical to midnight background (#0a0e1a), producing zero contrast
- **Fix:** Changed to warm tones (rgba 160/140/100 at varying opacities) for visible aged paper effect
- **Files modified:** src/styles/textures.css
- **Committed in:** ca4900a

---

**Total deviations:** 3 auto-fixed (3 bugs -- invisible textures)
**Impact on plan:** All fixes address visibility bugs in original CSS values. No scope creep.

## Issues Encountered
- node_modules was missing when resuming (possibly WSL filesystem issue); resolved by running `npm install`

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All typed resume data ready for content components in Phase 2
- All texture CSS classes available globally for any component
- WCAG AA compliance validated -- safe to build UI with these color pairs
- Image pipeline configured for WebP/AVIF optimization
- 50 tests passing across theme, store, contrast, textures, and data

## Self-Check: PASSED

- All 14 claimed files exist on disk
- All 3 task commits verified (5367e60, abb6f5a, ca4900a)

---
*Phase: 01-foundation-theme-system*
*Completed: 2026-03-06*
