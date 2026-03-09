# Roadmap: DamnSeaweedBrain

## Overview

This roadmap delivers a fully immersive BSD-themed portfolio in four phases. Phase 1 establishes the Next.js project, theme system, and asset pipeline -- the foundation every visual component depends on. Phase 2 builds all six content scenes with real resume data, navigation, and scroll animations -- producing a functional (if not yet thematic) portfolio. Phase 3 layers on the BSD experience: the visual novel dialogue system, 3D elements, and cinematic scene transitions that transform it from "themed portfolio" to "interactive experience." Phase 4 optimizes performance against budget, finalizes SEO/OG metadata, and ships to production.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Theme System** - Next.js project, design tokens, asset pipeline, responsive shell (completed 2026-03-06)
- [x] **Phase 2: Content Scenes & Navigation** - All 6 sections with resume data, nav panel, scroll animations, accessibility (completed 2026-03-06)
- [x] **Phase 3: BSD Experience Layer** - Visual novel dialogue, 3D elements, scene transitions, immersive interactions (completed 2026-03-07)
- [ ] **Phase 4: Polish & Launch** - Performance optimization, OG images, SEO finalization, deployment

## Phase Details

### Phase 1: Foundation & Theme System
**Goal**: A working Next.js project with the BSD noir theme system, typed resume data, asset directories, and performance guardrails -- so every subsequent component can render correctly from day one
**Depends on**: Nothing (first phase)
**Requirements**: FNDN-01, FNDN-02, FNDN-03, FNDN-04, FNDN-05, FNDN-06, ASSET-01, ASSET-02, ASSET-03, ASSET-05, SEO-03
**Success Criteria** (what must be TRUE):
  1. Running Next.js dev server renders a page with BSD dark noir color scheme, custom fonts, and bandage/paper texture elements visible
  2. Resume data from Akhila's resume is parsed into typed TypeScript data files and importable by any component
  3. Responsive layout shell adapts between desktop (1440px+) and mobile (375px) with visible breakpoint changes
  4. Performance budget tooling flags any asset over threshold; WebP pipeline converts and lazy-loads images
  5. WCAG AA contrast ratios pass on all theme color combinations (text on backgrounds)
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md -- Scaffold Next.js 15 project with BSD theme system, fonts, responsive shell, Zustand store, and Vitest infrastructure
- [ ] 01-02-PLAN.md -- Parse resume into typed data files, create CSS/SVG textures, configure asset pipeline, validate WCAG AA contrast

### Phase 2: Content Scenes & Navigation
**Goal**: All six portfolio sections (Landing, About, Abilities, Case Files, Intel, Contact) display real resume content with BSD styling, smooth scroll navigation, and scroll-triggered animations -- a complete, navigable portfolio
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, HERO-03, HERO-05, ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, ABIL-01, ABIL-02, ABIL-03, ABIL-04, ABIL-05, CASE-01, CASE-02, CASE-03, CASE-04, CASE-05, CASE-06, INTL-01, INTL-02, INTL-03, INTL-04, INTL-05, INTL-06, INTL-07, SOCL-01, SOCL-02, SOCL-03, SOCL-04, ANIM-01, ANIM-03, ANIM-04, ANIM-05, SEO-01, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. Visitor can navigate to any of the 6 sections via the always-visible BSD-styled nav panel, and smooth-scrolls to that section with a progress indicator showing current position
  2. Landing page shows Dazai character presence with typewriter title reveal, multi-layer parallax, and scroll-down indicator
  3. About section displays education (UTD, SRM with GPAs), leadership roles, and achievements framed as a BSD character backstory with scroll-triggered reveal animations
  4. Abilities section shows all resume skills as RPG ability cards with power level meters, organized by category (Languages, DS/ML, Tools, Cloud), with animated card reveals and hover/click detail interactions
  5. Case Files section presents all three projects (Influence Maximization paper, NER Radar, UniWay) as detective case files with folder UI, expandable details, status indicators, and links
  6. Intel section displays all four work experiences (American Airlines, Autodesk x2, SRM) as classified mission dossiers with redacted text reveal animations and timeline progression
  7. Social links (LinkedIn, GitHub, Email) are styled as an Agency communication panel
  8. All interactive elements are keyboard-navigable, images have alt text, and reduced-motion mode disables animations when system preference is set
**Plans**: 7 plans

Plans:
- [ ] 02-01-PLAN.md -- Install animation libs (Lenis, GSAP, Motion), smooth scroll provider, reduced motion hook, and BSD-styled navigation panel
- [ ] 02-02-PLAN.md -- Hero section with 3-layer parallax, typewriter title, Dazai character placeholder, scroll indicator
- [ ] 02-03-PLAN.md -- About section (character dossier with education data) and Social section (agency communication panel)
- [ ] 02-04-PLAN.md -- Abilities section with RPG skill cards in category grid, tier badges, scroll reveals, hover interactions
- [ ] 02-05-PLAN.md -- Case Files section with folder flip animation, stamp badges, expandable project details
- [ ] 02-06-PLAN.md -- Intel section with vertical timeline, mission dossiers, redacted text reveal animations
- [ ] 02-07-PLAN.md -- Page assembly, accessibility audit (keyboard nav, aria labels), SEO tests, visual verification

### Phase 3: BSD Experience Layer
**Goal**: The portfolio transforms from a themed static site into an interactive BSD experience -- visual novel dialogues introduce visitors and narrate transitions, 3D elements add depth, and cinematic scene transitions tie everything together
**Depends on**: Phase 2
**Requirements**: HERO-04, VN-01, VN-02, VN-03, VN-04, VN-05, VN-06, ANIM-02, 3D-01, 3D-02, 3D-03, 3D-04, 3D-05
**Success Criteria** (what must be TRUE):
  1. On first landing, Dazai introduces the visitor through a visual novel dialogue sequence with typewriter text, character portrait with expression variants, and styled speech bubbles -- all skippable without losing access to any content
  2. VN dialogues trigger at section transitions, narrating the journey through the portfolio; all dialogue data lives in JSON files
  3. Animated scene transitions (fade, slide, page-turn) play between sections during scroll
  4. Ability cards and case files have 3D tilt effects on hover/interaction; hero section has 3D depth/parallax where feasible
  5. If 3D assets are unavailable or performance degrades, the site gracefully falls back to 2D without breaking the experience
**Plans**: 5 plans

Plans:
- [ ] 03-01-PLAN.md -- VN core system: dialogue types, useDialogue hook, character portrait, speech bubble, dialogue engine, JSON data files, Caveat font
- [ ] 03-02-PLAN.md -- 3D foundation: install R3F, useTilt hook, WebGL detection, fallback provider, apply tilt to ability cards and case folders
- [ ] 03-03-PLAN.md -- VN integration: hero intro with scroll lock, section transition dialogues via ScrollTrigger, skip/ESC controls
- [ ] 03-04-PLAN.md -- 3D hero scene with floating particles, atmospheric environment, ink wash scroll transitions between sections
- [ ] 03-05-PLAN.md -- Final assembly, integration verification, and visual checkpoint of complete BSD experience

### Phase 4: Polish & Launch
**Goal**: The site meets performance budgets, has proper SEO/social sharing metadata, and is deployed to production on the damnseaweedbrain.com domain
**Depends on**: Phase 3
**Requirements**: ASSET-04, SEO-02
**Success Criteria** (what must be TRUE):
  1. Initial page load is under 1.5MB with all assets optimized (WebP, font subsetting, lazy loading verified)
  2. Sharing the site URL on LinkedIn/Twitter shows a BSD-themed OG image with correct title and description
  3. Site is live on damnseaweedbrain.com with pre-rendered HTML serving correct meta tags to crawlers
**Plans**: 2 plans

Plans:
- [ ] 04-01-PLAN.md -- SEO metadata, OG image generation, JSON-LD structured data, sitemap, and robots.txt
- [ ] 04-02-PLAN.md -- Production build verification, Lighthouse performance audit, and deployment to Vercel

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Theme System | 2/2 | Complete   | 2026-03-06 |
| 2. Content Scenes & Navigation | 7/7 | Complete   | 2026-03-06 |
| 3. BSD Experience Layer | 5/5 | Complete   | 2026-03-07 |
| 4. Polish & Launch | 0/2 | Not started | - |
