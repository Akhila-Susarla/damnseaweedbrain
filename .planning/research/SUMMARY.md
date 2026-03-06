# Project Research Summary

**Project:** BSD-Themed Interactive Portfolio
**Domain:** Creative/Themed Developer Portfolio
**Researched:** 2026-03-06
**Confidence:** HIGH

## Executive Summary

This project is a developer portfolio site built around the aesthetic and narrative conventions of Bungou Stray Dogs (BSD) -- a dark noir anime universe featuring supernatural abilities, detective agencies, and literary references. The recommended approach is a Next.js 15 static site using GSAP for cinematic scroll-driven animations and Motion (framer-motion) for UI-level component transitions, with a custom visual novel dialogue system (~200 LOC) that adds narrative flavor without gating content. The entire site is a single page with 6 "scenes" (Landing, About, Abilities, CaseFiles, Intel, Contact), each a full-viewport section with its own animation context, all communicating through a lightweight Zustand store.

The core architectural insight is the clean separation between three layers: the **data layer** (static TypeScript/JSON files mapping resume content to BSD-themed structures), the **scene layer** (6 sections each managing their own GSAP ScrollTrigger animations), and the **experience layer** (dialogue engine, ability cards, case file UI that overlay BSD flavor onto standard portfolio content). This separation means the portfolio works as a functional resume even if every themed element were stripped away -- which is exactly what the "No Longer Human" Easter egg does.

The primary risks are performance death from accumulated anime-styled assets (enforce a 1.5MB initial load budget from day one), over-theming that buries portfolio content behind interactions (every section must be directly navigable, VN dialogues always skippable), and copyright issues with anime assets (build custom visuals inspired by BSD aesthetic, never rip game/anime art). Mobile responsiveness must be designed alongside desktop from Phase 2, not bolted on later.

## Key Findings

### Recommended Stack

The stack is confidently settled. Next.js 15 with React 19 handles SSG static export. GSAP + ScrollTrigger owns all scroll-driven cinematic animation while Motion (framer-motion) handles component lifecycle and gestures -- they complement each other and should never animate the same element. Lenis provides smooth scrolling (replacing the abandoned Locomotive Scroll). Tailwind CSS v4 + CSS Modules for styling, with no component library -- the BSD theme requires such deep customization that any component library would fight the design. Zustand for lightweight global state.

**Core technologies:**
- **Next.js 15 + React 19 + TypeScript**: SSG static export, zero backend, pre-rendered HTML for SEO
- **GSAP + ScrollTrigger**: Cinematic scroll sequences, parallax, sprite animation, scene transitions
- **Motion (framer-motion)**: Component enter/exit, hover effects, card interactions, layout transitions
- **Lenis**: Smooth scrolling, lightweight Locomotive Scroll replacement
- **Zustand**: Global state for dialogue progress, active section, animation state
- **Tailwind CSS v4 + CSS Modules**: Zero-runtime styling with deep custom theming
- **Custom VN system (~200 LOC)**: No viable React VN library exists; build a `useDialogue` hook with JSON dialogue trees

**What to avoid:** Three.js/WebGL (overkill for 2D), PixiJS (overkill for sprites), component libraries (fight the theme), Redux (overkill for this state complexity).

### Expected Features

**Must have (table stakes):**
- Clear navigation (Agency-styled nav panel, always visible)
- Responsive design (simplified animations on mobile, full experience on desktop)
- Fast initial load (<3s FMP, loading screen with Dazai quotes)
- About/Bio, Skills, Projects, Experience, Contact sections
- Accessibility basics (keyboard nav, WCAG AA contrast, alt text)
- SEO fundamentals (meta tags, semantic HTML, OG images)

**Should have (Tier 1 differentiators -- core BSD experience):**
- Visual novel dialogue system (typewriter text, character portraits, dialogue boxes)
- RPG ability cards (skills as supernatural abilities with power levels)
- Case file UI for projects (detective folders, stamps, evidence photos)
- Scene transitions (animated transitions between sections)
- Dazai character presence (quotes, reactions, bandage motifs throughout)
- Dark noir aesthetic with witty Dazai-style copy

**Defer (v2+):**
- Yokohama city map navigation, "No Longer Human" Easter egg, animated landing sequence (Tier 2)
- Ability activation effects, dialogue choices that change content, dual themes (Tier 3)

### Architecture Approach

The architecture is a single-page application with 6 scene components, each owning its own scroll-driven animations via GSAP ScrollTrigger. A self-contained dialogue engine reads JSON dialogue trees and renders overlay components. All portfolio content lives in static TypeScript/JSON files under `/src/data/`, mapped from resume data to BSD-themed structures. The theme system provides design tokens (noir color palette, serif/sans/mono typography, bandage/paper/stamp motifs) via React Context.

**Major components:**
1. **Scene Layer** (6 sections) -- full-viewport sections each managing own GSAP animations, communicating via Zustand
2. **Dialogue Engine** -- custom useDialogue hook + DialogueBox/CharacterPortrait/TypewriterText components
3. **Animation Orchestration** -- GSAP for scroll/cinematic, Motion for UI/component lifecycle, never overlapping
4. **Theme System** -- design tokens (colors, typography, motifs) via React Context + Tailwind config
5. **Data Layer** -- static TS/JSON files mapping resume content to BSD structures
6. **Asset Pipeline** -- build-time optimization, per-section lazy loading, critical path preloading

### Critical Pitfalls

1. **Copyright infringement with anime assets** -- Build custom visuals inspired by BSD aesthetic; never use ripped game/anime art. The design language (case files, dossiers, noir palette) is free to use; the actual artwork is not.
2. **Over-theming that kills usability** -- Every section directly accessible, VN dialogues always skippable, navigation always visible. Test with the 5-second rule: can someone find skills in 5 seconds?
3. **Performance death by asset accumulation** -- Enforce 1.5MB initial load / 3MB total budget. WebP via next/image, lazy load below-fold, subset fonts, per-section GSAP initialization.
4. **Mobile responsiveness as afterthought** -- Design mobile layout alongside desktop from Phase 2. Simplify parallax to single layer, stack cards vertically, full-width dialogue on mobile.
5. **Animation jank on mid-range devices** -- Only animate `transform` and `opacity`. Reduce animation complexity on mobile. Test with 4x CPU throttling.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation and Theme System
**Rationale:** Theme system is a hard dependency for every visual component. Asset pipeline strategy must be resolved before visual work begins. Resume data must be parsed and typed before content sections can be built. Performance budget must be set before any assets are added.
**Delivers:** Working Next.js project with theme tokens, typed resume data, asset directories, Tailwind config, performance budget, basic responsive shell.
**Addresses:** Clear navigation (structure), Responsive design (shell), Fast initial load (budget), Accessibility basics (contrast validation), SEO fundamentals (semantic HTML setup).
**Avoids:** Copyright issues (#1 -- establish original-asset-only policy), Performance death (#3 -- set budget), Accessibility neglect (#6 -- validate theme colors).

### Phase 2: Core Scenes and Scroll Infrastructure
**Rationale:** Scenes are the structural backbone. All 6 sections must exist with real content before the BSD experience layer can be applied. Lenis + GSAP ScrollTrigger must be configured here as they underpin everything in Phase 3. Mobile responsiveness must be co-designed, not retrofitted.
**Delivers:** All 6 scene components populated with resume data, smooth scrolling, basic scroll animations, navigation panel, mobile-responsive layouts.
**Uses:** Next.js, Lenis, GSAP + ScrollTrigger, Zustand (section store), Tailwind.
**Implements:** Scene Layer, ScrollManager, Navigation, Data Layer consumption.
**Avoids:** Over-theming (#2 -- content accessible before theming), Mobile afterthought (#5 -- co-design mobile), Animation jank (#4 -- establish animation best practices).

### Phase 3: BSD Experience Layer
**Rationale:** With scenes and scroll infrastructure in place, the BSD thematic elements can be layered on top without risking content accessibility. The dialogue engine is the highest-complexity Tier 1 feature and needs dedicated focus. This phase transforms a functional portfolio into the immersive BSD experience.
**Delivers:** Visual novel dialogue system, RPG ability cards with animations, case file UI for projects, intel dossier format for experience, scene transitions, Dazai character presence.
**Uses:** Custom dialogue engine, GSAP (ability card reveals, scene transitions), Motion (card interactions, dialogue box enter/exit), Zustand (dialogue store).
**Implements:** Dialogue Engine, all Tier 1 differentiator features.
**Avoids:** Over-theming (#2 -- dialogues skippable, content still accessible), Scope creep (#8 -- strict Tier 1 only), Animation jank (#4 -- GPU-composited animations only).

### Phase 4: Polish, Performance, and Deploy
**Rationale:** With all features built, this phase focuses on optimization, asset finalization, advanced animations, and deployment. Performance testing against the budget set in Phase 1. SEO and OG images finalized.
**Delivers:** Optimized assets, advanced parallax effects, landing sequence polish, performance-tuned animations, SEO meta/OG images, Vercel deployment.
**Avoids:** Performance death (#3 -- test against budget), SEO black hole (#7 -- verify pre-rendered HTML), Scope creep (#8 -- polish what exists, do not add Tier 2 features).

### Phase Ordering Rationale

- **Theme before scenes** because every component needs design tokens to render correctly.
- **Scenes before BSD layer** because the portfolio must function as a standard site before themed interactions are added -- this directly prevents the over-theming pitfall.
- **BSD layer as a distinct phase** because it is the highest-risk, highest-reward work and must not contaminate the structural foundation.
- **Polish last** because performance optimization is meaningless until all assets and animations exist.
- **Mobile co-designed in Phase 2** (not Phase 4) because retrofitting responsive layouts onto complex scroll animations is far more expensive than building them together.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (BSD Experience Layer):** The custom dialogue engine, while small (~200 LOC), has subtle UX decisions (trigger points, skip behavior, mobile layout, scroll interaction). Needs design research on VN-in-web patterns. Ability card animation choreography needs prototyping.
- **Phase 1 (Asset Pipeline):** The asset sourcing strategy needs resolution -- what specific assets will be created/commissioned, and how will placeholder assets work during development?

Phases with standard patterns (skip research-phase):
- **Phase 2 (Core Scenes):** Next.js SSG pages, Lenis smooth scroll, GSAP ScrollTrigger integration are all well-documented with established patterns.
- **Phase 4 (Polish):** Performance optimization, SEO, and deployment on Vercel are standard Next.js workflows.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies are mature, well-documented, and commonly used together. No experimental choices. |
| Features | HIGH | Clear tiering based on portfolio best practices. BSD mapping is creative but grounded. |
| Architecture | HIGH | Single-page scene-based architecture is a proven pattern for scroll-driven portfolio sites. |
| Pitfalls | HIGH | All identified pitfalls are well-known in the anime-themed web dev and creative portfolio spaces. |

**Overall confidence:** HIGH

### Gaps to Address

- **Asset sourcing strategy**: Research identified the copyright constraint but did not resolve *how* assets will be created. Options: commission fan art, use AI-generated art in BSD style, or build purely with CSS/SVG effects. This needs a decision in Phase 1 planning.
- **Lottie usage scope**: Lottie was listed at MEDIUM confidence for ability effects. Whether Lottie is worth the dependency (vs. pure CSS/GSAP effects) should be validated during Phase 3 planning.
- **Dialogue trigger UX**: When and how VN dialogues trigger (scroll-based? click-based? first visit only?) needs UX design work during Phase 3 planning.
- **Resume data format**: The data layer assumes resume content will be parsed from a .docx into typed TypeScript. The parsing approach and data shape need definition in Phase 1 planning.

## Sources

### Primary (HIGH confidence)
- Next.js 15 documentation -- SSG static export, app router, image optimization
- GSAP documentation -- ScrollTrigger, React integration (@gsap/react)
- Motion (framer-motion) documentation -- React animation patterns
- Tailwind CSS v4 documentation -- configuration and theming

### Secondary (MEDIUM confidence)
- Lenis documentation -- smooth scroll integration patterns
- Zustand documentation -- store patterns for React
- Community examples of anime-themed portfolio sites -- design patterns and pitfalls
- BSD fan community -- aesthetic elements and design language conventions

### Tertiary (LOW confidence)
- Lottie React for animated effects -- needs validation against pure CSS/GSAP alternatives
- Custom VN implementation patterns -- sparse documentation, approach inferred from game dev community

---
*Research completed: 2026-03-06*
*Ready for roadmap: yes*
