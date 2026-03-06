# Requirements: DamnSeaweedBrain

**Defined:** 2026-03-06
**Core Value:** Visitors experience a memorable, game-like portfolio that showcases Akhila's data science skills through the BSD universe

## v1 Requirements

### Foundation

- [x] **FNDN-01**: Site built with Next.js 15 + React 19 + TypeScript
- [x] **FNDN-02**: BSD dark noir theme system with design tokens (colors, typography, motifs)
- [x] **FNDN-03**: Responsive layout — desktop-first with mobile breakpoints (375px minimum)
- [x] **FNDN-04**: Performance budget enforced — 1.5MB initial load, WebP images, lazy loading
- [x] **FNDN-05**: Tailwind CSS v4 for styling with custom theme configuration
- [x] **FNDN-06**: Zustand store for global state (dialogue, section, animation tracking)

### Navigation

- [x] **NAV-01**: BSD-styled navigation panel visible at all times
- [x] **NAV-02**: Smooth scroll between sections via Lenis
- [x] **NAV-03**: Section progress indicator showing current position
- [x] **NAV-04**: All sections directly accessible — no content gated behind interactions

### Landing / Hero

- [x] **HERO-01**: Dazai character presence with introduction sequence
- [x] **HERO-02**: Typewriter title reveal ("damnseaweedbrain" / character name)
- [x] **HERO-03**: Multi-layer parallax scene with depth
- [ ] **HERO-04**: Visual novel dialogue intro — Dazai introduces the visitor
- [x] **HERO-05**: Scroll-down indicator / call to explore

### About / Origin Story

- [x] **ABOUT-01**: Education displayed (UTD MS CS, SRM BS CS AI/ML with GPAs)
- [x] **ABOUT-02**: Background framed as BSD character backstory narrative
- [x] **ABOUT-03**: Leadership roles and achievements integrated into story
- [x] **ABOUT-04**: Scroll-triggered reveal animations

### Abilities (Skills)

- [x] **ABIL-01**: All resume skills displayed as RPG supernatural ability cards
- [x] **ABIL-02**: Power level ratings/meters for each skill
- [x] **ABIL-03**: Ability categories: Languages, Data Science/ML, Tools & Frameworks, Cloud
- [x] **ABIL-04**: Animated card reveals on scroll (GSAP)
- [x] **ABIL-05**: Hover/click interactions on cards showing detail

### Case Files (Projects)

- [x] **CASE-01**: Published research paper displayed as case file (Influence Maximization)
- [x] **CASE-02**: Real-time NER Radar project as case file
- [x] **CASE-03**: UniWay (UXperience hackathon) project as case file
- [x] **CASE-04**: Detective case file UI — folders, stamps, evidence photos
- [x] **CASE-05**: Expandable case file details with links to publications/demos
- [x] **CASE-06**: Case status indicators (solved, active, classified)

### Intel (Experience)

- [x] **INTL-01**: American Airlines internship as mission dossier
- [x] **INTL-02**: Autodesk Data Scientist role as mission dossier
- [x] **INTL-03**: Autodesk ML Engineer Intern role as mission dossier
- [x] **INTL-04**: SRM Research Intern role as mission dossier
- [x] **INTL-05**: Mission dossier format — classified document style with stamps
- [x] **INTL-06**: Redacted text reveal animations on scroll
- [x] **INTL-07**: Timeline progression between roles

### Contact / Social

- [x] **SOCL-01**: LinkedIn profile link (BSD-styled)
- [x] **SOCL-02**: GitHub profile link (BSD-styled)
- [x] **SOCL-03**: Email contact link (BSD-styled)
- [x] **SOCL-04**: BSD-themed social link styling (Agency communication panel)

### Visual Novel System

- [ ] **VN-01**: Custom dialogue engine with typewriter text effect
- [ ] **VN-02**: Dazai character portrait with expression variants
- [ ] **VN-03**: Dialogue boxes styled as BSD speech bubbles
- [ ] **VN-04**: All dialogues skippable — never gate portfolio content
- [ ] **VN-05**: VN dialogues trigger at landing and section transitions
- [ ] **VN-06**: Dialogue data stored as JSON (easy to update content)

### Animation & Transitions

- [x] **ANIM-01**: GSAP ScrollTrigger for scroll-driven animations throughout
- [ ] **ANIM-02**: Scene transitions between sections (fade, slide, page-turn effects)
- [x] **ANIM-03**: Motion (framer-motion) for component lifecycle animations
- [x] **ANIM-04**: Parallax depth effects on key sections
- [x] **ANIM-05**: Reduced motion mode respecting `prefers-reduced-motion`

### 3D Elements

- [ ] **3D-01**: Research and source any available BSD 3D models/assets
- [ ] **3D-02**: Three.js / React Three Fiber integration for 3D elements
- [ ] **3D-03**: 3D card tilt effects on ability cards and case files
- [ ] **3D-04**: 3D depth/parallax on hero and scene backgrounds where possible
- [ ] **3D-05**: Fallback to 2D if 3D assets unavailable or performance degrades

### Assets & Visuals

- [x] **ASSET-01**: BSD-inspired custom visuals (original art, not copyrighted game rips)
- [x] **ASSET-02**: Bandage textures, paper/parchment backgrounds, classified stamps as SVG/CSS
- [x] **ASSET-03**: Custom fonts (serif headings, clean body, monospace accents) in WOFF2
- [ ] **ASSET-04**: BSD-themed OG image for social media sharing
- [x] **ASSET-05**: Optimized asset pipeline — WebP, lazy loading, responsive images

### SEO & Accessibility

- [x] **SEO-01**: Semantic HTML with proper heading hierarchy
- [ ] **SEO-02**: Meta tags and Open Graph data for social sharing
- [x] **SEO-03**: WCAG AA contrast ratios on all text
- [x] **SEO-04**: Keyboard navigation for all interactive elements
- [x] **SEO-05**: Alt text and aria labels for visual elements

## v2 Requirements

### Enhanced BSD Experience

- **MAP-01**: Yokohama city map as alternate navigation
- **EASTER-01**: "No Longer Human" Easter egg — strips theme to plain resume
- **FX-01**: Ability activation effects (particles, glow on skill cards)
- **FX-02**: Ambient background particles (paper fragments, cherry blossoms)
- **CURSOR-01**: BSD-themed custom cursor with trail effects

### Content Expansion

- **BLOG-01**: Blog section for technical writing
- **CERT-01**: Certifications and awards section

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form | Social links sufficient; no backend needed |
| CMS / Admin panel | Static content from resume; no dynamic updates needed |
| Backend / Database | Purely frontend static site |
| Autoplay audio/music | Universally disliked; degrades UX |
| Login / Authentication | Public portfolio; no auth needed |
| AI chatbot as Dazai | Gimmicky and unreliable for portfolio |
| Fan fiction narrative | BSD tone and framing only, not original BSD stories |
| Mobile app | Web-first; responsive design covers mobile |
| Ripped anime game assets | Copyright infringement; build original BSD-inspired visuals |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FNDN-01 | Phase 1 | Complete |
| FNDN-02 | Phase 1 | Complete |
| FNDN-03 | Phase 1 | Complete |
| FNDN-04 | Phase 1 | Complete |
| FNDN-05 | Phase 1 | Complete |
| FNDN-06 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Complete |
| NAV-02 | Phase 2 | Complete |
| NAV-03 | Phase 2 | Complete |
| NAV-04 | Phase 2 | Complete |
| HERO-01 | Phase 2 | Complete |
| HERO-02 | Phase 2 | Complete |
| HERO-03 | Phase 2 | Complete |
| HERO-04 | Phase 3 | Pending |
| HERO-05 | Phase 2 | Complete |
| ABOUT-01 | Phase 2 | Complete |
| ABOUT-02 | Phase 2 | Complete |
| ABOUT-03 | Phase 2 | Complete |
| ABOUT-04 | Phase 2 | Complete |
| ABIL-01 | Phase 2 | Complete |
| ABIL-02 | Phase 2 | Complete |
| ABIL-03 | Phase 2 | Complete |
| ABIL-04 | Phase 2 | Complete |
| ABIL-05 | Phase 2 | Complete |
| CASE-01 | Phase 2 | Complete |
| CASE-02 | Phase 2 | Complete |
| CASE-03 | Phase 2 | Complete |
| CASE-04 | Phase 2 | Complete |
| CASE-05 | Phase 2 | Complete |
| CASE-06 | Phase 2 | Complete |
| INTL-01 | Phase 2 | Complete |
| INTL-02 | Phase 2 | Complete |
| INTL-03 | Phase 2 | Complete |
| INTL-04 | Phase 2 | Complete |
| INTL-05 | Phase 2 | Complete |
| INTL-06 | Phase 2 | Complete |
| INTL-07 | Phase 2 | Complete |
| SOCL-01 | Phase 2 | Complete |
| SOCL-02 | Phase 2 | Complete |
| SOCL-03 | Phase 2 | Complete |
| SOCL-04 | Phase 2 | Complete |
| VN-01 | Phase 3 | Pending |
| VN-02 | Phase 3 | Pending |
| VN-03 | Phase 3 | Pending |
| VN-04 | Phase 3 | Pending |
| VN-05 | Phase 3 | Pending |
| VN-06 | Phase 3 | Pending |
| ANIM-01 | Phase 2 | Complete |
| ANIM-02 | Phase 3 | Pending |
| ANIM-03 | Phase 2 | Complete |
| ANIM-04 | Phase 2 | Complete |
| ANIM-05 | Phase 2 | Complete |
| 3D-01 | Phase 3 | Pending |
| 3D-02 | Phase 3 | Pending |
| 3D-03 | Phase 3 | Pending |
| 3D-04 | Phase 3 | Pending |
| 3D-05 | Phase 3 | Pending |
| ASSET-01 | Phase 1 | Complete |
| ASSET-02 | Phase 1 | Complete |
| ASSET-03 | Phase 1 | Complete |
| ASSET-04 | Phase 4 | Pending |
| ASSET-05 | Phase 1 | Complete |
| SEO-01 | Phase 2 | Complete |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 1 | Complete |
| SEO-04 | Phase 2 | Complete |
| SEO-05 | Phase 2 | Complete |

**Coverage:**
- v1 requirements: 67 total
- Mapped to phases: 67
- Unmapped: 0

**Phase Distribution:**
- Phase 1 (Foundation & Theme System): 11 requirements
- Phase 2 (Content Scenes & Navigation): 41 requirements
- Phase 3 (BSD Experience Layer): 13 requirements
- Phase 4 (Polish & Launch): 2 requirements

---
*Requirements defined: 2026-03-06*
*Last updated: 2026-03-06 after roadmap creation*
