---
phase: 01-foundation-theme-system
plan: 01
subsystem: ui
tags: [next.js, tailwind-v4, zustand, vitest, typescript, react-19, theme-tokens]

# Dependency graph
requires: []
provides:
  - "Next.js 15 project scaffold with App Router and TypeScript"
  - "BSD noir theme system via Tailwind v4 @theme tokens (colors, fonts, breakpoints)"
  - "Three Google Fonts via next/font (Playfair Display, Inter, JetBrains Mono)"
  - "Responsive Shell and Section layout components"
  - "Zustand v5 global store with portfolio state shape"
  - "Vitest test infrastructure with Wave 0 tests (19 tests)"
  - "cn() utility combining clsx + tailwind-merge"
affects: [01-02, phase-2, phase-3]

# Tech tracking
tech-stack:
  added: [next@15.5.12, react@19.1.0, tailwindcss@4, zustand@5, vitest@4, clsx, tailwind-merge, jsdom]
  patterns: [tailwind-v4-css-first-theme, next-font-css-variables, zustand-v5-store-pattern]

key-files:
  created:
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx
    - src/components/layout/Shell.tsx
    - src/components/layout/Section.tsx
    - src/lib/utils.ts
    - src/lib/store.ts
    - vitest.config.ts
    - src/__tests__/theme.test.ts
    - src/__tests__/store.test.ts
  modified:
    - package.json

key-decisions:
  - "Node 20+ required for @tailwindcss/oxide native bindings; added .nvmrc"
  - "Tailwind v4 CSS-first @theme pattern (no tailwind.config.js)"
  - "Zustand v5 create() pattern with exported PortfolioState interface"

patterns-established:
  - "Theme tokens: @theme directive in globals.css defines all design tokens"
  - "Font loading: next/font Google Fonts with CSS variable integration on html element"
  - "Layout: Shell wraps pages with max-w-[1440px], Section provides vertical rhythm"
  - "Utility: cn() function for conditional class merging"
  - "State: usePortfolioStore hook for global state access"
  - "Testing: Vitest with jsdom, path aliases via vitest.config.ts"

requirements-completed: [FNDN-01, FNDN-02, FNDN-03, FNDN-05, FNDN-06, ASSET-03]

# Metrics
duration: 19min
completed: 2026-03-06
---

# Phase 1 Plan 1: Foundation & Theme System Summary

**Next.js 15 scaffold with BSD noir theme tokens (Tailwind v4 @theme), three Google Fonts, responsive layout shell, Zustand v5 store, and 19 passing Vitest tests**

## Performance

- **Duration:** 19 min
- **Started:** 2026-03-06T09:21:05Z
- **Completed:** 2026-03-06T09:40:36Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments
- Next.js 15.5.12 project with React 19, TypeScript, Tailwind v4, ESLint fully scaffolded and building
- BSD noir theme system with 10 color tokens, 3 font tokens, 4 breakpoint tokens, and section depth gradients defined via Tailwind v4 @theme CSS directive
- Three Google Fonts (Playfair Display serif, Inter sans, JetBrains Mono) loaded via next/font with CSS variable integration
- Responsive Shell (max-w-1440px with breakpoint padding) and Section (vertical rhythm with optional depth variants) layout components
- Zustand v5 store with currentSection, dialogueActive, reducedMotion, animationsReady state and actions
- Vitest configured with 19 passing tests covering all theme tokens and store behavior

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 project with BSD theme system, fonts, and responsive shell** - `058419d` (feat)
2. **Task 2: Create Zustand store and Vitest test infrastructure with Wave 0 tests** - `3a7cb71` (feat)

## Files Created/Modified
- `package.json` - Project manifest with all dependencies
- `tsconfig.json` - TypeScript configuration with path aliases
- `postcss.config.mjs` - Tailwind v4 PostCSS plugin
- `next.config.ts` - Next.js configuration
- `eslint.config.mjs` - ESLint flat config
- `.nvmrc` - Node 20 version requirement
- `src/app/globals.css` - BSD theme tokens via Tailwind v4 @theme (colors, fonts, breakpoints, section depths)
- `src/app/layout.tsx` - Root layout with three Google Fonts, metadata, body classes
- `src/app/page.tsx` - Demo page with theme token smoke test (gold heading, parchment body, teal mono)
- `src/components/layout/Shell.tsx` - Responsive container with breakpoint-aware padding
- `src/components/layout/Section.tsx` - Section wrapper with vertical rhythm and depth variants
- `src/lib/utils.ts` - cn() utility combining clsx + tailwind-merge
- `src/lib/store.ts` - Zustand v5 store with portfolio state shape and actions
- `vitest.config.ts` - Vitest configuration with jsdom and path aliases
- `src/__tests__/theme.test.ts` - 14 tests verifying all theme tokens in globals.css
- `src/__tests__/store.test.ts` - 5 tests verifying store defaults and setters

## Decisions Made
- **Node 20 required:** @tailwindcss/oxide native bindings need Node >= 20; added .nvmrc file to enforce this
- **Tailwind v4 CSS-first:** Using @theme directive in globals.css instead of tailwind.config.js (Tailwind v4 pattern)
- **Zustand v5 pattern:** Using create() with exported PortfolioState interface for type-safe store access and testing

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Node version upgrade required for @tailwindcss/oxide**
- **Found during:** Task 1 (Build verification)
- **Issue:** @tailwindcss/oxide requires Node >= 20, system had Node 18.19.1
- **Fix:** Installed nvm, added Node 20.20.1, added .nvmrc to project
- **Files modified:** .nvmrc (created)
- **Verification:** `npx next build` succeeds, all tests pass
- **Committed in:** 3a7cb71 (Task 2 commit)

**2. [Rule 3 - Blocking] npm install corruption on OneDrive-synced path**
- **Found during:** Task 2 (Vitest dependency installation)
- **Issue:** OneDrive filesystem sync caused tar extraction errors during npm install, corrupting node_modules (missing webidl-conversions, css-tree, etc.)
- **Fix:** Performed clean npm install on native Linux path (/home/parzival/damnseaweedbrain), verified build and tests pass there, synced source files back to project directory
- **Files modified:** package-lock.json
- **Verification:** All 19 tests pass, build succeeds on native path
- **Committed in:** 3a7cb71 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes necessary to unblock build and test execution. No scope creep. OneDrive path issue is an environment concern -- recommend running npm commands from native Linux path.

## Issues Encountered
- OneDrive filesystem sync interferes with npm's tar extraction on WSL2; node_modules should be installed on a native Linux path for reliability
- The `create-next-app` command rejects directory names with spaces and capitals; scaffolded in /tmp and copied back

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Theme system and layout components ready for all Phase 2 content scenes
- Zustand store ready for dialogue, section, and animation tracking
- Test infrastructure ready for component and integration tests
- **Important:** Run `npm install` from a native Linux path (not the OneDrive-synced Windows path) to avoid tar corruption. Consider moving the project to a non-synced location or using a symlink.

---
*Phase: 01-foundation-theme-system*
*Completed: 2026-03-06*
