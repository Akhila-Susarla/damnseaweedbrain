---
phase: 03-bsd-experience-layer
plan: 02
subsystem: ui
tags: [react-three-fiber, three.js, 3d-tilt, webgl, r3f, drei, mouse-follow, fallback]

requires:
  - phase: 01-foundation
    provides: Zustand store, Tailwind theme, component structure
  - phase: 02-content-scenes
    provides: AbilityCard and CaseFolder components to enhance with tilt

provides:
  - R3F v9 + drei v10 + three v0.170 packages installed
  - useTilt hook for mouse-follow 3D perspective rotation
  - useWebGLSupport hook for WebGL feature detection
  - FallbackProvider context for 3D quality gating
  - TiltCard reusable wrapper component
  - qualityLevel state in Zustand store

affects: [03-bsd-experience-layer, hero-3d-scene, 3d-fallback]

tech-stack:
  added: ["@react-three/fiber@^9.5", "@react-three/drei@^10.7", "three@^0.170", "@types/three"]
  patterns: [useTilt-ref-based-tilt, webgl-detection-cache, 3d-quality-context-gating]

key-files:
  created:
    - src/hooks/useTilt.ts
    - src/hooks/useWebGLSupport.ts
    - src/components/three/FallbackProvider.tsx
    - src/components/ui/TiltCard.tsx
    - src/__tests__/tilt-hook.test.ts
    - src/__tests__/webgl-support.test.ts
  modified:
    - src/lib/store.ts
    - src/components/ui/AbilityCard.tsx
    - src/components/ui/CaseFolder.tsx
    - package.json

key-decisions:
  - "useState for tilt rotation (not useRef+CSS vars) for test observability; negligible perf cost on mousemove"
  - "useSyncExternalStore for WebGL detection -- SSR-safe with cached singleton result"
  - "useTilt applied directly to existing elements (not TiltCard wrapper) for AbilityCard/CaseFolder to avoid nesting"

patterns-established:
  - "useTilt hook: attach ref + handlers to element for 3D perspective tilt"
  - "FallbackProvider: context-based shouldRender3D gating (WebGL + quality + reduced motion)"
  - "qualityLevel store state: 'high' | 'low' | 'off' with auto-degradation"

requirements-completed: [3D-01, 3D-02, 3D-03, 3D-05]

duration: 5min
completed: 2026-03-06
---

# Phase 3 Plan 02: 3D Tilt & Fallback Infrastructure Summary

**R3F v9 installed with mouse-follow 3D tilt on AbilityCard/CaseFolder, WebGL detection, and FallbackProvider quality gating**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-06T17:20:20Z
- **Completed:** 2026-03-06T17:25:37Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Installed React Three Fiber v9, drei v10, and three v0.170 with TypeScript types
- Created useTilt hook producing perspective(800px) rotateX/Y transforms from mouse position with smooth transitions
- Created useWebGLSupport hook with cached singleton detection and SSR-safe useSyncExternalStore
- Built FallbackProvider context gating 3D rendering based on WebGL support, qualityLevel, and reduced motion
- Applied 3D tilt to AbilityCard (12deg) and CaseFolder (10deg) with reduced-motion bypass
- All 125 tests passing, build succeeds with zero SSR errors

## Task Commits

Each task was committed atomically:

1. **Task 1 RED: Failing tests** - `a5f0f31` (test)
2. **Task 1 GREEN: R3F install + hooks + FallbackProvider + store** - `bba17bf` (feat)
3. **Task 2: TiltCard wrapper + tilt on AbilityCard/CaseFolder** - `e3ec653` (feat)

## Files Created/Modified
- `src/hooks/useTilt.ts` - Mouse-follow 3D tilt calculation hook with ref + handlers pattern
- `src/hooks/useWebGLSupport.ts` - Cached WebGL detection via useSyncExternalStore
- `src/components/three/FallbackProvider.tsx` - Context provider exposing shouldRender3D quality gate
- `src/components/ui/TiltCard.tsx` - Reusable tilt wrapper with configurable maxAngle and disabled mode
- `src/components/ui/AbilityCard.tsx` - Added useTilt with 12deg max, merged mouse handlers
- `src/components/ui/CaseFolder.tsx` - Added useTilt with 10deg max on outer div
- `src/lib/store.ts` - Extended with qualityLevel ('high'|'low'|'off') + setter
- `src/__tests__/tilt-hook.test.ts` - 4 tests: initial state, center, corner, mouse leave
- `src/__tests__/webgl-support.test.ts` - 2 tests: boolean return, null context detection
- `package.json` - Added R3F, drei, three, @types/three dependencies

## Decisions Made
- Used useState (not useRef+CSS custom properties) for tilt rotation values -- enables test observability with renderHook; the perf difference is negligible since updates only happen on mousemove events
- Used useSyncExternalStore for WebGL detection -- provides SSR-safe getServerSnapshot (returns false) with a cached singleton so canvas probe runs only once
- Applied useTilt directly to existing AbilityCard button and CaseFolder div instead of wrapping with TiltCard -- avoids extra DOM nesting and preserves existing motion/react animations

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed lint warnings for unused imports**
- **Found during:** Task 2 (build verification)
- **Issue:** Unused `useCallback` import in CaseFolder, unused `useRef` import in useWebGLSupport
- **Fix:** Removed unused imports, added eslint-disable for required subscribe parameter
- **Files modified:** src/components/ui/CaseFolder.tsx, src/hooks/useWebGLSupport.ts
- **Committed in:** e3ec653 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor cleanup, no scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- R3F packages installed and available for hero 3D scene (Plan 04)
- FallbackProvider ready to wrap Canvas elements with automatic quality degradation
- Tilt infrastructure proven on two component types, pattern reusable for future components

---
*Phase: 03-bsd-experience-layer*
*Completed: 2026-03-06*
