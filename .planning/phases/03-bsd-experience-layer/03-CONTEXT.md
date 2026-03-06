# Phase 3: BSD Experience Layer - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Transform the portfolio from a themed static site into an interactive BSD experience. This phase adds: visual novel dialogue system with Dazai narration, 3D elements via Three.js/React Three Fiber, ink wash scene transitions between sections, and 3D card tilt effects. All new features must gracefully degrade and respect reduced motion preferences.

</domain>

<decisions>
## Implementation Decisions

### Dazai's Dialogue Personality
- Tone starts mysterious/noir, then breaks into playful wit as visitor scrolls deeper — personality unfolds like the anime
- 1-2 lines per section transition — quick quips, barely interrupt scrolling
- Full expression set (6+): neutral, smirk, laugh, serious, annoyed, mysterious — swapped based on dialogue mood
- Click anywhere to advance each line, ESC to skip entire sequence instantly
- Dialogues trigger once per session (not stored in localStorage, fresh on page refresh)
- Portrait and dialogue integrated within section content area (not floating overlay)
- Content-aware dialogue — Dazai references actual skills, projects, experiences in each section
- Speech bubbles styled as handwritten notes — slightly tilted, pen-stroke border, handwriting-style font
- Dialogue data stored as JSON files (VN-06)

### Scene Transitions
- Japanese ink wash (sumi-e) dissolve effect between sections
- Partial overlay intensity — ink tendrils creep from edges, partially obscure transition zone, then fade
- Scroll-driven (GSAP ScrollTrigger scrub) — ink progress maps to scroll position, scrolling back recedes the ink
- Nav panel clicks use a quick fade instead of ink wash to avoid long waits when jumping sections

### 3D Depth and Effects
- Full Three.js / React Three Fiber integration
- Hero section: floating 3D particles (paper fragments, cherry blossoms, bandage strips), 3D environment backdrop (Yokohama/detective agency), and 3D Dazai model/scene composition
- Mouse-follow tilt on ability cards and case file folders — rotateX/Y based on cursor position within card bounds
- Fallback strategy: reduced 3D mode first (drop particle count, simplify geometry, disable shadows), then fall back to 2D (existing CSS parallax from Phase 2) only if still degraded
- All 3D must respect useReducedMotion hook

### VN Intro Experience
- 3-5 lines, approximately 10 seconds — quick and punchy
- Hero section visible behind dialogue (not black screen) — dialogue integrated in hero area
- Scroll locked during intro until done or ESC-skipped
- No visual cues for upcoming section dialogues — they appear as surprises when scrolling into new sections
- Section transition dialogues do NOT lock scroll (only the initial hero intro locks)

### Claude's Discretion
- Specific dialogue text content (tone and style decided above, actual lines are creative freedom)
- 3D model sourcing strategy (find/create BSD-inspired models within original art constraint)
- Ink wash shader/canvas implementation approach
- Particle system configuration (counts, speeds, sizes)
- Expression variant art style (CSS-generated, SVG, or sourced illustrations)

</decisions>

<specifics>
## Specific Ideas

- Dazai's personality arc mirrors the anime: cool/mysterious introduction that gradually reveals his witty, dramatic, fourth-wall-breaking side
- Handwritten note speech bubbles should feel like Dazai actually scribbled them — not clean handwriting, slightly messy/artistic
- Ink wash transitions reference Japanese sumi-e calligraphy — the ink should feel organic, not geometric
- Content-aware dialogue examples: "Ah, Python — my second favorite serpent" for abilities, "These cases... some were almost as puzzling as Chuuya's fashion sense" for case files
- The 3D hero should feel like stepping into the BSD universe — atmospheric, moody, with depth

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `TypewriterText` component (src/components/ui/TypewriterText.tsx): Reusable for dialogue text rendering with GSAP animation, polymorphic `as` prop
- `useReducedMotion` hook (src/hooks/useReducedMotion.ts): Must be respected by all new animations and 3D elements
- `usePortfolioStore` (src/lib/store.ts): Already has `dialogueActive` boolean state ready for VN system
- `SmoothScroll` provider (src/components/layout/SmoothScroll.tsx): Lenis + GSAP integration for scroll locking during intro
- `AbilityCard` and `CaseFolder`: Already use framer-motion — 3D tilt layers on top of existing animations

### Established Patterns
- GSAP ScrollTrigger for all scroll-driven animations (used across all 6 sections)
- framer-motion for component lifecycle animations (cards, folders)
- CSS clip-path silhouette for Dazai character (swappable with portrait/model)
- BSD noir aesthetic: midnight backgrounds, gold accents, parchment textures, monospace fonts
- Tailwind v4 CSS-first @theme pattern for design tokens

### Integration Points
- `dialogueActive` store state can pause/block scroll via Lenis
- NavPanel scroll-to behavior needs awareness of transition overlays
- Section `id` attributes used by ScrollTrigger — transitions attach between section boundaries
- Shell component (src/components/layout/Shell.tsx) wraps page content — 3D canvas layers here

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-bsd-experience-layer*
*Context gathered: 2026-03-06*
