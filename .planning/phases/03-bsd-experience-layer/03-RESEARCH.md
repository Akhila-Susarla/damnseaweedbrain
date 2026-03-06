# Phase 3: BSD Experience Layer - Research

**Researched:** 2026-03-06
**Domain:** Visual Novel dialogue system, 3D integration (Three.js/R3F), ink wash transitions, 3D card tilt effects
**Confidence:** MEDIUM-HIGH

## Summary

Phase 3 transforms the existing themed portfolio into an interactive BSD experience across three major subsystems: (1) a visual novel dialogue engine with Dazai narration, (2) ink wash scene transitions between sections, and (3) 3D depth via React Three Fiber. The existing codebase already has strong foundations -- `TypewriterText`, `useReducedMotion`, `dialogueActive` store state, Lenis scroll locking via `useLenis`, and GSAP ScrollTrigger throughout. The primary technical risks are R3F/Next.js 15 compatibility (resolved in R3F v9), ink wash transition performance on scroll scrub, and 3D asset sourcing within the original-art constraint.

The VN dialogue system is the most straightforward -- it is a custom component reading JSON data, using the existing TypewriterText pattern, with Lenis stop/start for intro scroll lock. The ink wash transition is best implemented as a CSS sprite sheet animation driven by GSAP ScrollTrigger scrub, avoiding heavy shader work. The 3D layer uses R3F v9 with drei helpers, dynamically imported to avoid SSR issues, with drei's PerformanceMonitor for automatic quality degradation.

**Primary recommendation:** Build the VN system first (pure React + GSAP, no new deps), then ink wash transitions (GSAP + CSS/canvas), then 3D layer (R3F) -- each subsystem is independently testable and the 3D layer has the most unknowns.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Dazai tone: starts mysterious/noir, then breaks into playful wit as visitor scrolls deeper
- 1-2 lines per section transition, quick quips
- Full expression set (6+): neutral, smirk, laugh, serious, annoyed, mysterious
- Click anywhere to advance, ESC to skip entire sequence instantly
- Dialogues trigger once per session (not stored in localStorage, fresh on page refresh)
- Portrait and dialogue integrated within section content area (not floating overlay)
- Content-aware dialogue referencing actual skills, projects, experiences
- Speech bubbles styled as handwritten notes -- slightly tilted, pen-stroke border, handwriting-style font
- Dialogue data stored as JSON files (VN-06)
- Japanese ink wash (sumi-e) dissolve effect between sections
- Scroll-driven (GSAP ScrollTrigger scrub) -- ink progress maps to scroll position
- Nav panel clicks use quick fade instead of ink wash
- Full Three.js / React Three Fiber integration
- Hero: floating 3D particles (paper fragments, cherry blossoms, bandage strips), 3D environment backdrop, 3D Dazai model/scene composition
- Mouse-follow tilt on ability cards and case file folders
- Fallback strategy: reduced 3D first, then 2D (CSS parallax from Phase 2)
- All 3D must respect useReducedMotion hook
- VN intro: 3-5 lines, ~10 seconds, hero visible behind dialogue
- Scroll locked during intro until done or ESC-skipped
- Section transition dialogues do NOT lock scroll (only hero intro locks)

### Claude's Discretion
- Specific dialogue text content (tone and style decided, actual lines are creative freedom)
- 3D model sourcing strategy (find/create BSD-inspired models within original art constraint)
- Ink wash shader/canvas implementation approach
- Particle system configuration (counts, speeds, sizes)
- Expression variant art style (CSS-generated, SVG, or sourced illustrations)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-04 | Visual novel dialogue intro -- Dazai introduces the visitor | VN engine architecture, Lenis scroll lock, TypewriterText reuse |
| VN-01 | Custom dialogue engine with typewriter text effect | DialogueEngine component, JSON-driven state machine, existing TypewriterText |
| VN-02 | Dazai character portrait with expression variants | CSS/SVG-generated portrait with swappable expression layers |
| VN-03 | Dialogue boxes styled as BSD speech bubbles | Handwritten-note styled bubbles with CSS transforms and custom font |
| VN-04 | All dialogues skippable -- never gate portfolio content | ESC handler + click-to-advance + session-only state |
| VN-05 | VN dialogues trigger at landing and section transitions | ScrollTrigger onEnter callbacks for section boundaries |
| VN-06 | Dialogue data stored as JSON (easy to update content) | JSON schema for dialogue sequences with expression/section metadata |
| ANIM-02 | Scene transitions between sections (ink wash dissolve) | GSAP ScrollTrigger scrub + CSS sprite sheet or canvas-driven ink frames |
| 3D-01 | Research and source BSD 3D models/assets | Sketchfab BSD models, procedural generation, SVG-to-3D extrusion as alternatives |
| 3D-02 | Three.js / React Three Fiber integration | R3F v9 + drei + dynamic import for Next.js SSR compatibility |
| 3D-03 | 3D card tilt effects on ability cards and case files | Mouse-position rotateX/rotateY with perspective, layered on existing framer-motion |
| 3D-04 | 3D depth/parallax on hero and scene backgrounds | R3F Canvas overlay on hero with particle system and environment |
| 3D-05 | Fallback to 2D if 3D assets unavailable or performance degrades | drei PerformanceMonitor + WebGL detection + graceful CSS fallback |
</phase_requirements>

## Standard Stack

### Core (New Dependencies)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @react-three/fiber | ^9.5 | React renderer for Three.js | R3F v9 required for React 19 compatibility; v8 breaks with React 19 |
| @react-three/drei | ^10.7 | R3F helper components (Float, PerformanceMonitor, etc.) | De facto companion to R3F; provides particles, performance monitoring, loaders |
| three | ^0.170 | 3D rendering engine | Peer dependency of R3F |

### Existing (Already Installed)
| Library | Version | Purpose | Phase 3 Use |
|---------|---------|---------|-------------|
| gsap + @gsap/react | ^3.14 | Animation engine | ScrollTrigger scrub for ink wash, dialogue timing |
| motion | ^12.35 | Component animations | Existing card animations, dialogue enter/exit |
| lenis | ^1.3 | Smooth scroll | Scroll lock during VN intro via stop()/start() |
| zustand | ^5.0 | State management | dialogueActive state, 3D quality level state |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS sprite ink wash | WebGL shader ink wash | Shader is more organic but much harder to implement and debug; sprite sheet is performant, scroll-scrubbable, and visually adequate |
| Custom tilt hook | react-tilt / vanilla-tilt | Libraries add weight; the tilt math is ~20 lines of code, not worth a dependency |
| R3F particles | tsparticles | tsparticles is heavier and not Three.js-native; R3F Points/PointMaterial integrates directly |

**Installation:**
```bash
npm install @react-three/fiber @react-three/drei three
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── vn/                    # Visual novel system
│   │   ├── DialogueEngine.tsx  # Core engine: reads JSON, manages state
│   │   ├── DialogueBox.tsx     # Speech bubble styled component
│   │   ├── CharacterPortrait.tsx # Dazai portrait with expression swapping
│   │   ├── HeroIntro.tsx       # Hero-specific intro sequence (scroll-locks)
│   │   └── SectionDialogue.tsx # Section transition dialogue (non-blocking)
│   ├── three/                 # 3D layer components
│   │   ├── Scene3D.tsx        # R3F Canvas wrapper (dynamically imported)
│   │   ├── HeroParticles.tsx  # Floating particles (paper, blossoms, bandages)
│   │   ├── HeroEnvironment.tsx # Yokohama backdrop / atmospheric elements
│   │   └── FallbackProvider.tsx # WebGL detection + performance gating
│   ├── transitions/           # Scene transition system
│   │   └── InkWashTransition.tsx # Scroll-driven ink overlay between sections
│   └── ui/
│       └── TiltCard.tsx       # Reusable 3D tilt wrapper for cards/folders
├── data/
│   └── dialogue/              # JSON dialogue files
│       ├── hero-intro.json
│       ├── about-transition.json
│       ├── abilities-transition.json
│       ├── casefiles-transition.json
│       ├── intel-transition.json
│       └── social-transition.json
├── hooks/
│   ├── useDialogue.ts         # Dialogue state machine hook
│   ├── useTilt.ts             # Mouse-position tilt calculation hook
│   └── useWebGLSupport.ts     # WebGL/performance detection hook
└── lib/
    └── store.ts               # Extended with VN + 3D quality state
```

### Pattern 1: Dynamic Import for R3F Canvas (Next.js SSR)
**What:** R3F Canvas must be client-only; Next.js will error on SSR because Three.js accesses `window`/`document`.
**When to use:** Every R3F Canvas component.
**Example:**
```typescript
// src/components/three/Scene3D.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function Scene3DInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}  // cap pixel ratio for performance
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        {/* 3D children here */}
      </Suspense>
    </Canvas>
  );
}

// In consuming component, use next/dynamic:
// const Scene3D = dynamic(() => import('./three/Scene3D'), { ssr: false });
```

### Pattern 2: Dialogue State Machine
**What:** JSON-driven dialogue engine with line-by-line advancement.
**When to use:** All VN dialogue sequences.
**Example:**
```typescript
// Dialogue JSON schema
interface DialogueLine {
  id: string;
  character: 'dazai';
  expression: 'neutral' | 'smirk' | 'laugh' | 'serious' | 'annoyed' | 'mysterious';
  text: string;
}

interface DialogueSequence {
  id: string;
  section: string;         // 'hero' | 'about' | 'abilities' | etc.
  type: 'intro' | 'transition';
  lines: DialogueLine[];
}

// Hook manages current line index, advance, skip
function useDialogue(sequence: DialogueSequence) {
  const [lineIndex, setLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const advance = () => {
    if (lineIndex < sequence.lines.length - 1) {
      setLineIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const skip = () => setIsComplete(true);

  return { currentLine: sequence.lines[lineIndex], advance, skip, isComplete };
}
```

### Pattern 3: Lenis Scroll Lock for Hero Intro
**What:** Stop Lenis during hero intro dialogue, resume on completion or ESC.
**When to use:** Only the hero intro sequence (section transitions do NOT lock).
**Example:**
```typescript
'use client';
import { useLenis } from 'lenis/react';
import { usePortfolioStore } from '@/lib/store';

function HeroIntro() {
  const lenis = useLenis();
  const setDialogueActive = usePortfolioStore(s => s.setDialogueActive);

  const lockScroll = () => {
    lenis?.stop();
    setDialogueActive(true);
  };

  const unlockScroll = () => {
    lenis?.start();
    setDialogueActive(false);
  };

  // Lock on mount, unlock on complete or ESC
  useEffect(() => {
    lockScroll();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') unlockScroll();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockScroll(); // safety cleanup
    };
  }, []);
}
```

### Pattern 4: Ink Wash Transition via GSAP ScrollTrigger Scrub
**What:** Sprite sheet or canvas-based ink dissolve that maps to scroll progress between sections.
**When to use:** Between every section boundary.
**Example:**
```typescript
// CSS sprite approach: ink-wash sprite sheet (e.g., 30 frames in a horizontal strip)
// GSAP scrubs background-position through the frames

useGSAP(() => {
  const sections = gsap.utils.toArray<HTMLElement>('.section-boundary');
  sections.forEach((section) => {
    gsap.fromTo('.ink-overlay',
      { backgroundPosition: '0% 0%' },
      {
        backgroundPosition: '100% 0%',  // scrub through sprite frames
        ease: 'steps(29)',               // 30 frames = 29 steps
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.5,
        },
      }
    );
  });
});
```

### Pattern 5: Mouse-Follow Tilt Hook
**What:** Calculate rotateX/Y from cursor position within element bounds.
**When to use:** AbilityCard and CaseFolder components.
**Example:**
```typescript
function useTilt(ref: RefObject<HTMLElement>, maxAngle = 15) {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0..1
    const y = (e.clientY - rect.top) / rect.height;    // 0..1
    setTransform({
      rotateX: (0.5 - y) * maxAngle * 2,  // tilt up/down
      rotateY: (x - 0.5) * maxAngle * 2,  // tilt left/right
    });
  }, [maxAngle]);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
  }, []);

  return { transform, handleMouseMove, handleMouseLeave };
}
```

### Anti-Patterns to Avoid
- **Mounting R3F Canvas without dynamic import:** Will crash Next.js SSR because Three.js requires browser APIs. Always use `dynamic(() => import(...), { ssr: false })`.
- **Blocking scroll for section transitions:** Only the hero intro locks scroll. Section dialogues appear inline and do NOT block.
- **Storing dialogue-seen state in localStorage:** Decision is fresh-per-session. Use React state or zustand (non-persisted).
- **Using heavy 3D models without LOD/fallback:** Always implement tiered degradation -- reduce particles first, then disable 3D entirely.
- **Animating 3D tilt with state updates on every mousemove:** Use refs and direct DOM manipulation or CSS custom properties for 60fps tilt, not React state re-renders.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 3D rendering pipeline | Custom WebGL context | @react-three/fiber Canvas | Handles render loop, reconciler, resize, pixel ratio |
| Performance monitoring | FPS counter + manual quality switches | drei PerformanceMonitor | Tracks avg FPS, fires onIncline/onDecline callbacks for auto-adaptation |
| 3D model loading | Custom GLTF parser | drei useGLTF | Handles loading, caching, Draco compression |
| Float/bob animations | Manual sin(time) in useFrame | drei Float | Configurable speed, rotationIntensity, floatIntensity |
| Scroll-driven animation binding | IntersectionObserver + manual progress | GSAP ScrollTrigger scrub | Already established in codebase, handles reverse, pin, snap |

**Key insight:** The VN dialogue system IS hand-rolled (it's custom to this project), but it's simple enough (~200 lines) that a library would be overkill. Everything 3D should leverage drei abstractions.

## Common Pitfalls

### Pitfall 1: R3F v8 with React 19
**What goes wrong:** `TypeError: Cannot read properties of undefined (reading 'ReactCurrentOwner')` -- Canvas crashes on mount.
**Why it happens:** R3F v8's reconciler is incompatible with React 19 internals. Next.js 15 ships React 19.
**How to avoid:** Use `@react-three/fiber@^9.5` which supports React 19.
**Warning signs:** Any "ReactCurrentOwner" or "ReactCurrentDispatcher" errors from fiber.

### Pitfall 2: GSAP ScrollTrigger + Lenis Desync
**What goes wrong:** ScrollTrigger positions lag behind actual scroll, causing janky ink wash transitions.
**Why it happens:** Lenis intercepts native scroll; ScrollTrigger needs to know about Lenis's smooth position.
**How to avoid:** Current codebase uses ReactLenis with `root` prop which auto-syncs with ScrollTrigger. Verify this still works after adding ink wash overlays. If desync occurs, add manual sync: `lenis.on('scroll', ScrollTrigger.update)`.
**Warning signs:** Transitions firing at wrong scroll positions or "jumping".

### Pitfall 3: 3D Canvas Blocking Pointer Events
**What goes wrong:** R3F Canvas covers the page and swallows all clicks, breaking navigation and dialogue interaction.
**Why it happens:** Canvas is a DOM element that sits on top of content by default.
**How to avoid:** Set `style={{ pointerEvents: 'none' }}` on Canvas, then selectively enable pointer events only on interactive 3D objects with `onPointerOver`.
**Warning signs:** Clicking through 3D area doesn't reach underlying buttons/links.

### Pitfall 4: Performance Budget Exceeded
**What goes wrong:** Adding Three.js + models + shaders blows past the 1.5MB initial load budget (FNDN-04).
**Why it happens:** Three.js is ~600KB+ unminified; models and textures add more.
**How to avoid:** (1) Dynamic import R3F so it's not in initial bundle. (2) Use tree-shaking -- import specific drei components, not the barrel. (3) Lazy-load 3D models after initial paint. (4) Compress models with Draco. (5) Use `Suspense` with meaningful fallbacks.
**Warning signs:** Lighthouse shows large JS bundles or long Total Blocking Time.

### Pitfall 5: Ink Wash Transition Covering Interactive Content
**What goes wrong:** Ink overlay sits on top of interactive elements during transition, blocking clicks.
**Why it happens:** The overlay div has a higher z-index during the transition zone.
**How to avoid:** Set `pointer-events: none` on the ink overlay. It's purely visual -- it should never capture events.
**Warning signs:** Links/buttons in transition zones become unclickable.

### Pitfall 6: TypewriterText Not Stoppable Mid-Animation
**What goes wrong:** Current TypewriterText plays through the full text; there's no way to skip mid-character to show full text instantly.
**Why it happens:** The existing component uses GSAP timeline without external kill/complete control.
**How to avoid:** Either extend TypewriterText with a `complete()` method (via ref), or build a dialogue-specific variant that supports instant-reveal on click.
**Warning signs:** User clicks to advance but text is still typing the previous line.

## Code Examples

### Dialogue JSON Schema
```json
{
  "id": "hero-intro",
  "section": "hero",
  "type": "intro",
  "lines": [
    {
      "id": "hero-01",
      "character": "dazai",
      "expression": "mysterious",
      "text": "Ah... another visitor to the Agency."
    },
    {
      "id": "hero-02",
      "character": "dazai",
      "expression": "smirk",
      "text": "I'm Dazai. Don't worry -- I'll be your guide through this case file."
    },
    {
      "id": "hero-03",
      "character": "dazai",
      "expression": "neutral",
      "text": "Shall we begin?"
    }
  ]
}
```

### Speech Bubble Styling (Handwritten Note)
```css
.dialogue-bubble {
  position: relative;
  background: rgba(196, 184, 168, 0.08);
  border: 1.5px solid rgba(196, 184, 168, 0.25);
  border-radius: 4px 12px 12px 4px;
  padding: 1rem 1.25rem;
  transform: rotate(-0.5deg);
  font-family: var(--font-handwriting, 'Caveat', cursive);

  /* Pen-stroke border effect */
  box-shadow:
    inset 0 0 0 1px rgba(196, 184, 168, 0.05),
    2px 2px 8px rgba(0, 0, 0, 0.3);
}
```

### R3F Canvas with Performance Fallback
```typescript
'use client';

import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { useState, Suspense } from 'react';

export default function HeroCanvas() {
  const [quality, setQuality] = useState<'high' | 'low' | 'off'>('high');

  if (quality === 'off') return null; // Fall back to Phase 2 CSS parallax

  return (
    <Canvas
      dpr={quality === 'high' ? [1, 1.5] : [1, 1]}
      gl={{ antialias: quality === 'high', alpha: true, powerPreference: 'default' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <PerformanceMonitor
        onDecline={() => {
          if (quality === 'high') setQuality('low');
          else setQuality('off');
        }}
        onIncline={() => {
          if (quality === 'low') setQuality('high');
        }}
      >
        <Suspense fallback={null}>
          {/* Particles, environment, etc. */}
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
```

### WebGL Support Detection
```typescript
export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| R3F v8 | R3F v9 | 2024 | Required for React 19 / Next.js 15 compatibility |
| @studio-freight/react-lenis | lenis/react | 2024 | New import path; old package deprecated |
| drei v9 | drei v10 | 2025 | Aligned with R3F v9; new Float, PerformanceMonitor APIs |
| WebGL-only rendering | WebGPU with WebGL fallback | Three.js r171 (Sep 2025) | Optional; WebGL is still fine for this project's scope |
| Custom scroll-driven animations | CSS scroll-driven animations | 2024 | Limited browser support; GSAP ScrollTrigger still more reliable for this use case |

**Deprecated/outdated:**
- `@studio-freight/react-lenis`: Use `lenis/react` import path (already correct in codebase)
- `@react-three/fiber@^8`: Do NOT use with React 19; must use v9+

## Open Questions

1. **3D Asset Sourcing Strategy**
   - What we know: Sketchfab has some BSD fan-made models; MakerWorld has printable STLs. Original art constraint (ASSET-01) means we can use BSD-inspired original work but not ripped game assets.
   - What's unclear: Whether any Sketchfab models are usable under CC license and convertible to glTF, or if we need fully procedural/CSS-generated 3D elements.
   - Recommendation: Start with procedural 3D (particles, geometric shapes, CSS/SVG-extruded elements). If suitable CC-licensed models are found on Sketchfab, integrate them as enhancement. The hero scene should look good with or without character models.

2. **Ink Wash Sprite Sheet Creation**
   - What we know: CSS sprite + GSAP steps() is the most performant scroll-scrub approach. A 30-frame horizontal sprite strip works well.
   - What's unclear: How to create the actual ink wash sprite frames (generate procedurally, use video frames, or hand-paint).
   - Recommendation: Generate frames using a canvas-based noise/perlin algorithm at build time, or use a royalty-free ink wash video converted to sprite frames. Alternatively, a CSS-only approach with clip-path animations could approximate the effect without sprites.

3. **Handwriting Font for Speech Bubbles**
   - What we know: Speech bubbles need handwriting-style font per user decision. Current fonts are Playfair Display, Inter, JetBrains Mono.
   - What's unclear: Which handwriting font fits the BSD noir aesthetic.
   - Recommendation: Use `Caveat` (Google Font, WOFF2) -- it's messy/artistic enough for the "Dazai scribbled notes" vibe while remaining legible. Add via next/font/google alongside existing fonts.

4. **Expression Variant Implementation**
   - What we know: 6+ expressions needed. Options: CSS-generated (layers/transforms), SVG with swappable parts, or sourced illustrations.
   - What's unclear: Which approach best balances quality, bundle size, and development time.
   - Recommendation: SVG with swappable facial feature groups -- a base silhouette (similar to existing clip-path Dazai) with overlaid SVG paths for eyes, mouth, eyebrows per expression. Keeps everything vector, tiny bundle, and thematically consistent with the existing CSS silhouette.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest ^4.0.18 + @testing-library/react ^16.3 |
| Config file | package.json scripts (no separate vitest.config) |
| Quick run command | `npm test` |
| Full suite command | `npm test` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-04 | Hero intro dialogue renders and is skippable | integration | `npx vitest run src/__tests__/hero-intro.test.ts -x` | No -- Wave 0 |
| VN-01 | Dialogue engine advances lines, shows typewriter text | unit | `npx vitest run src/__tests__/dialogue-engine.test.ts -x` | No -- Wave 0 |
| VN-02 | Portrait swaps expression based on current line | unit | `npx vitest run src/__tests__/character-portrait.test.ts -x` | No -- Wave 0 |
| VN-03 | Speech bubbles render with correct styling | unit | `npx vitest run src/__tests__/dialogue-box.test.ts -x` | No -- Wave 0 |
| VN-04 | ESC skips dialogue; content remains accessible | integration | `npx vitest run src/__tests__/dialogue-skip.test.ts -x` | No -- Wave 0 |
| VN-05 | Section transitions trigger dialogue on scroll enter | integration | `npx vitest run src/__tests__/section-dialogue.test.ts -x` | No -- Wave 0 |
| VN-06 | Dialogue JSON files parse correctly and contain expected structure | unit | `npx vitest run src/__tests__/dialogue-data.test.ts -x` | No -- Wave 0 |
| ANIM-02 | Ink wash overlay activates between sections on scroll | manual-only | Manual: scroll between sections, verify visual effect | N/A |
| 3D-01 | 3D assets load or fallback triggers | integration | `npx vitest run src/__tests__/three-fallback.test.ts -x` | No -- Wave 0 |
| 3D-02 | R3F Canvas renders without SSR errors | smoke | `npm run build` (build succeeds = no SSR crash) | Existing |
| 3D-03 | Tilt effect responds to mouse position | unit | `npx vitest run src/__tests__/tilt-hook.test.ts -x` | No -- Wave 0 |
| 3D-04 | Hero 3D scene renders particles | manual-only | Manual: verify particles visible in hero | N/A |
| 3D-05 | Fallback to 2D when WebGL unavailable | unit | `npx vitest run src/__tests__/webgl-support.test.ts -x` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npm test`
- **Per wave merge:** `npm test && npm run build`
- **Phase gate:** Full suite green + successful build before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/dialogue-engine.test.ts` -- covers VN-01
- [ ] `src/__tests__/dialogue-data.test.ts` -- covers VN-06 (JSON schema validation)
- [ ] `src/__tests__/dialogue-skip.test.ts` -- covers VN-04
- [ ] `src/__tests__/tilt-hook.test.ts` -- covers 3D-03
- [ ] `src/__tests__/webgl-support.test.ts` -- covers 3D-05
- [ ] `src/__tests__/three-fallback.test.ts` -- covers 3D-01
- [ ] Handwriting font (Caveat) added via next/font/google

## Sources

### Primary (HIGH confidence)
- [@react-three/fiber npm](https://www.npmjs.com/package/@react-three/fiber) -- version 9.5.0, React 19 support
- [@react-three/drei npm](https://www.npmjs.com/package/@react-three/drei) -- version 10.7.7
- [R3F Installation docs](https://r3f.docs.pmnd.rs/getting-started/installation) -- Canvas setup, SSR considerations
- [R3F Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) -- PerformanceMonitor, DPR adaptation
- [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) -- scrub, pin, steps

### Secondary (MEDIUM confidence)
- [Lenis GitHub discussions](https://github.com/darkroomengineering/lenis/discussions/292) -- stop()/start() API for scroll lock
- [Next.js R3F compatibility issue](https://github.com/vercel/next.js/issues/71836) -- R3F v9 RC resolves ReactCurrentOwner error
- [Ink Transition Scroll Effect](https://freefrontend.com/code/ink-transition-scroll-effect-2026-01-18/) -- sprite sheet + CSS steps() approach
- [3D Tilt Effect in React](https://ibelick.com/blog/create-tilt-effect-with-react) -- mouse-position rotateX/Y pattern
- [Maxime Heckel particles blog](https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/) -- R3F particle system patterns

### Tertiary (LOW confidence)
- [Sketchfab BSD models](https://sketchfab.com/tags/bungostraydogs) -- existence confirmed, licensing/quality needs validation
- [Codrops dissolve effect](https://tympanus.net/codrops/2025/02/17/implementing-a-dissolve-effect-with-shaders-and-particles-in-three-js/) -- shader dissolve approach as alternative to sprite sheet

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- R3F v9 with React 19 is confirmed working; versions verified on npm
- Architecture: MEDIUM-HIGH -- patterns well-established but ink wash implementation has multiple valid approaches
- Pitfalls: HIGH -- R3F/React 19 incompatibility and Lenis/ScrollTrigger sync are well-documented issues
- VN system: HIGH -- straightforward React component architecture with existing TypewriterText foundation
- 3D asset sourcing: LOW -- unclear whether suitable CC-licensed models exist; may need procedural approach

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (R3F ecosystem is stable; Three.js moves fast but v9 is established)
