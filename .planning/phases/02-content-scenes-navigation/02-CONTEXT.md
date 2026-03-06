# Phase 2: Content Scenes & Navigation - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

All six portfolio sections (Landing, About, Abilities, Case Files, Intel, Contact) display real resume content with BSD styling, smooth scroll navigation via Lenis, and scroll-triggered animations. A complete, navigable portfolio with accessibility compliance. Visual novel dialogue system and 3D elements are Phase 3.

</domain>

<decisions>
## Implementation Decisions

### Navigation panel
- Left side rail, always visible on desktop
- Vertical text labels only (JetBrains Mono) — no icons, typographic/noir aesthetic
- Active section label highlights in gold with a thin vertical progress line that fills as you scroll through that section
- Collapses to a compact bottom navigation bar on mobile (< 768px)
- Smooth scroll to sections via Lenis (NAV-02)
- All sections directly accessible — no gating (NAV-04)

### Hero / Landing scene
- Source full Dazai character renders from the web — real BSD character art, not CSS silhouettes
- Also research and source 3D BSD assets from open-source repos for potential use
- 3-layer parallax: background (Yokohama/noir atmosphere), midground (Dazai character), foreground (floating elements — bandages, kanji, particles)
- Typewriter title reveal — Claude's discretion on sequence (domain name first vs character quip)
- Scroll-down indicator / call to explore at bottom of hero

### About / Origin Story
- Character dossier format — structured like a BSD personnel file, not narrative prose
- Fields: Origin (education — UTD, SRM with GPAs), Known Abilities (achievements), Background (leadership roles)
- Uses aged paper texture from Phase 1 theme
- Scroll-triggered reveal animations (ABOUT-04)

### Ability cards
- Grid layout organized by category — 4 category sections (Languages, DS/ML, Tools & Frameworks, Cloud)
- Category headers with kanji subtitles (matching the kanjiName data in skills.ts)
- Tier badge only (S/A/B/C) — no meter/bar. Large styled letter per card, distinct color per tier (gold for S, teal for A, etc.)
- Animated card reveals on scroll via GSAP ScrollTrigger
- Hover/click interactions showing description detail (from Skill.description field)

### Case Files (Projects)
- Folder flip/open animation — clicking a case file folder "opens" it, cover flips up to reveal details inside
- Rubber stamp overlays for status — red "CLASSIFIED" or green "SOLVED" stamps rotated slightly on the cover
- Uses classified-red theme token for stamps
- Expandable details with links to publications/demos (from CaseFile.links)
- 3 case files from projects.ts data

### Intel (Experience)
- Vertical timeline layout (top to bottom), most recent role at top
- Connecting line/thread between role nodes
- Classified dossier aesthetic — mission dossier format with stamps
- Redacted text reveal: black bars that fade/lift away on scroll into view
- Classified roles (2 Autodesk entries) get heavier redaction treatment + "CLASSIFIED" stamp + red border accent
- Solved roles (American Airlines, SRM) look more open/accessible
- 4 dossiers from experience.ts data

### Social / Contact
- Agency communication panel styling (SOCL-04)
- LinkedIn, GitHub, Email links from social.ts data
- BSD-themed link styling

### Animation & Accessibility
- GSAP ScrollTrigger for scroll-driven animations throughout (ANIM-01)
- Framer Motion for component lifecycle animations (ANIM-03)
- Parallax depth effects on hero and key sections (ANIM-04)
- Reduced motion mode: respects `prefers-reduced-motion`, disables all animations (ANIM-05) — Zustand store already has reducedMotion flag
- Semantic HTML with proper heading hierarchy (SEO-01)
- All interactive elements keyboard-navigable (SEO-04)
- Alt text and aria labels for all visual elements (SEO-05)

### Claude's Discretion
- Typewriter reveal sequence (domain name first vs Dazai quip)
- Exact scroll-down indicator design
- Social/contact panel layout details
- Card hover interaction specifics (tooltip vs expand vs flip)
- Exact GSAP animation timing and easing curves
- How category headers are styled beyond kanji subtitles
- Mobile responsive adaptations for cards, case files, and dossiers

</decisions>

<specifics>
## Specific Ideas

- Source actual Dazai character renders from the web — full character art, not abstract/CSS-only
- Research open-source repos for 3D BSD assets that could be used in hero or elsewhere
- "The site should feel like opening a case file at the Armed Detective Agency" (carried from Phase 1)
- Rubber stamps should look like real physical stamps — slightly rotated, imperfect ink
- Redaction bars on Intel dossiers should feel like actual government redaction — solid black blocks over text
- Classified Autodesk roles should feel visually restricted compared to open/solved roles

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Section` component (`src/components/layout/Section.tsx`): depth variants 1-4 for gradient backgrounds per section
- `Shell` component (`src/components/layout/Shell.tsx`): max-w-1440px responsive container
- All data files ready: `skills.ts` (32 skills), `projects.ts` (3 case files), `experience.ts` (4 dossiers), `education.ts`, `social.ts`
- Full type system: `Skill`, `CaseFile`, `IntelDossier`, `Education`, `SocialLink` in `types.ts`
- `textures.css`: CSS paper/bandage textures from Phase 1
- Theme tokens in `globals.css`: midnight, parchment, gold, teal, classified-red + section depth vars

### Established Patterns
- Tailwind v4 CSS-first @theme pattern (no tailwind.config.js)
- Zustand store (`usePortfolioStore`): currentSection, dialogueActive, reducedMotion, animationsReady
- `cn()` utility for conditional class merging
- Custom breakpoints: mobile (375px), tablet (768px), desktop (1024px), wide (1440px)

### Integration Points
- Nav component will use `usePortfolioStore.setCurrentSection()` for scroll tracking
- Section components use `id` prop for scroll targeting — nav links scroll to `#section-id`
- `reducedMotion` store flag controls all animation behavior
- New section components import from `src/data/` for content

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-content-scenes-navigation*
*Context gathered: 2026-03-06*
