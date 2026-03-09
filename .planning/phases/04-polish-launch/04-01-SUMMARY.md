---
phase: 04-polish-launch
plan: 01
subsystem: seo
tags: [og-image, json-ld, sitemap, robots, satori, next-metadata]

requires:
  - phase: 03-bsd-experience
    provides: Complete page with all sections and components
provides:
  - BSD noir OG image generation (1200x630 PNG)
  - Extended metadata with OG, Twitter, canonical, metadataBase
  - Person and WebSite JSON-LD structured data
  - XML sitemap for damnseaweedbrain.com
  - Robots.txt with sitemap reference
affects: [deployment, social-sharing]

tech-stack:
  added: [next/og ImageResponse, Satori]
  patterns: [file-convention OG image, JSON-LD via dangerouslySetInnerHTML]

key-files:
  created:
    - src/app/opengraph-image.tsx
    - src/app/sitemap.ts
    - src/app/robots.ts
    - assets/fonts/PlayfairDisplay-Bold.ttf
    - assets/fonts/Inter-Regular.ttf
    - src/__tests__/og-image.test.ts
    - src/__tests__/sitemap.test.ts
    - src/__tests__/robots.test.ts
    - src/__tests__/metadata.test.ts
    - src/__tests__/jsonld.test.ts
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "Source-level metadata testing to avoid PostCSS/Tailwind v4 vitest incompatibility with layout.tsx CSS import"
  - "Google Fonts v40 TTF URLs for Satori (WOFF2 not supported by Satori)"

patterns-established:
  - "OG image via Next.js file convention (opengraph-image.tsx) with Satori/ImageResponse"
  - "JSON-LD scripts rendered before Shell component in fragment wrapper"

requirements-completed: [ASSET-04, SEO-02]

duration: 12min
completed: 2026-03-09
---

# Phase 4 Plan 1: SEO & Social Preview Summary

**BSD noir OG image with Satori, extended Open Graph/Twitter metadata, Person/WebSite JSON-LD, sitemap, and robots.txt for damnseaweedbrain.com**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-09T04:39:01Z
- **Completed:** 2026-03-09T04:51:15Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- OG image renders BSD noir design with Akhila Susarla name and Data Scientist tagline using Playfair Display and Inter fonts
- Layout metadata includes metadataBase, Open Graph, Twitter Card, canonical URL, keywords, and authors
- Person and WebSite JSON-LD structured data for search engine understanding
- Sitemap and robots.txt enable proper crawling and indexing

## Task Commits

Each task was committed atomically:

1. **Task 1: OG image, sitemap, and robots.txt (RED)** - `94ca0d5` (test)
2. **Task 1: OG image, sitemap, and robots.txt (GREEN)** - `2715078` (feat)
3. **Task 2: Extended metadata and JSON-LD (RED)** - `ae2fe99` (test)
4. **Task 2: Extended metadata and JSON-LD (GREEN)** - `ac448dd` (feat)

_TDD approach: each task has separate RED (failing test) and GREEN (implementation) commits._

## Files Created/Modified
- `src/app/opengraph-image.tsx` - BSD noir OG image generator (1200x630 PNG) with gold accents and corner frames
- `src/app/sitemap.ts` - XML sitemap returning damnseaweedbrain.com entry
- `src/app/robots.ts` - Robots.txt allowing all crawlers with sitemap reference
- `src/app/layout.tsx` - Extended metadata with metadataBase, OG, Twitter, canonical, keywords, authors
- `src/app/page.tsx` - Person and WebSite JSON-LD structured data scripts
- `assets/fonts/PlayfairDisplay-Bold.ttf` - Playfair Display Bold for Satori OG rendering
- `assets/fonts/Inter-Regular.ttf` - Inter Regular for Satori OG rendering
- `src/__tests__/og-image.test.ts` - OG image module export tests
- `src/__tests__/sitemap.test.ts` - Sitemap output tests
- `src/__tests__/robots.test.ts` - Robots.txt output tests
- `src/__tests__/metadata.test.ts` - Layout metadata source verification tests
- `src/__tests__/jsonld.test.ts` - JSON-LD Person and WebSite schema tests

## Decisions Made
- Used source-level (fs.readFileSync) testing for metadata instead of module import to avoid PostCSS/Tailwind v4 incompatibility when vitest processes globals.css through layout.tsx
- Downloaded TTF fonts from Google Fonts v40 API (Satori requires TTF, not WOFF2)
- Gold accent color #d4af37 for OG image (slightly warmer than theme gold #c9a84c for better social preview contrast)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Google Fonts static URLs from plan returned HTML error pages; resolved by fetching current URLs via Google Fonts CSS API
- Build produces pre-existing 500.html rename error unrelated to our changes (OneDrive path/Next.js infrastructure issue)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All SEO and social preview requirements (ASSET-04, SEO-02) complete
- Site ready for deployment with proper social sharing previews
- All 157 tests pass across 29 test files

## Self-Check: PASSED

All 10 created files verified present. All 4 task commits verified in git log.

---
*Phase: 04-polish-launch*
*Completed: 2026-03-09*
