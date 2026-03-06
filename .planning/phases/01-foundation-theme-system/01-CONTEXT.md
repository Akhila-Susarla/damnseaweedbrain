# Phase 1: Foundation & Theme System - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up the Next.js 15 project with BSD noir theme system (design tokens, typography, visual motifs), typed resume data files, responsive layout shell, asset pipeline with performance guardrails, and WCAG AA contrast compliance. This is the foundation every visual component in later phases depends on.

</domain>

<decisions>
## Implementation Decisions

### Color palette & mood
- Deep midnight blue background (#0a0e1a range) — Yokohama night noir feel
- Warm parchment text (#e8e0d4 range) for primary body text
- Warm gold/amber (#c9a84c / #d4af37 range) as primary accent — buttons, headings, borders, interactive elements
- Muted teal as secondary accent — ability glow effects, hover states, status indicators
- Subtle gradient shifts between sections — deeper midnight for serious sections (Intel), slightly lighter for lighter sections (Abilities). Cinematic scroll progression, not abrupt changes

### Typography system
- Elegant serif for headings (Playfair Display / Cormorant family) — literary, sophisticated, matches Dazai's literary persona
- Clean sans-serif for body text (Inter / Plus Jakarta Sans) — readable, modern, comfortable for long content
- Monospace for classified UI accents (JetBrains Mono / Fira Code / IBM Plex Mono) — case file numbers, timestamps, status tags, redacted text elements
- Japanese kanji as flavor text — ability names show kanji subtitles (e.g., No Longer Human), section headers get small Japanese labels. Adds BSD authenticity
- All fonts served as WOFF2, subsetted for performance

### BSD visual motifs
- Bandage textures as subtle accents — dividers, card borders, section separators. Recognizable to BSD fans, decorative to others. Not overwhelming
- Aged paper + stamps for document elements — parchment card backgrounds with aged edges, red CLASSIFIED stamps, coffee stain overlays for case files and intel dossiers
- Ink splatter / brush stroke effects — Japanese calligraphy-style for transitions, highlights, background accents. Ties into literary theme
- Ability activation glow — radial glow/particle CSS effect for cards and interactive elements. Supernatural ability aesthetic
- CSS/SVG-first approach for all motifs — bandage patterns as CSS repeating gradients, stamps as SVG, paper textures as CSS noise. Lightweight, scalable, zero copyright issues. AI-generate complex textures only as fallback

### Resume data structure
- S/A/B/C tier rating system for skills — anime RPG-style. S = mastery, A = advanced, B = proficient, C = familiar
- Claude infers tier ratings from resume context (years used, project prominence, role requirements). User reviews and adjusts
- Case file statuses: Solved (completed with results), Active (ongoing), Classified (confidential/NDA)
- Static TypeScript data files (.ts) — typed constants (skills.ts, projects.ts, experience.ts). Full type safety, IDE autocomplete, no runtime parsing. Resume parsed once during setup

### Claude's Discretion
- Exact hex values for the color palette (within the decided ranges and mood)
- Specific font choices within the decided families
- Tailwind v4 custom theme configuration structure
- Zustand store shape for global state
- Asset pipeline tooling (sharp, next/image config, etc.)
- Responsive breakpoint values beyond the stated 375px minimum and 1440px+ desktop

</decisions>

<specifics>
## Specific Ideas

- "Yokohama night scenes" mood for the midnight blue — think noir detective walking rain-slicked streets
- BSD games use gold accents heavily — the Armed Detective Agency has a warm, prestigious gold identity
- Dazai is named after real author Osamu Dazai who wrote "No Longer Human" — the literary serif headings honor this connection
- Bandage textures are Dazai's most iconic visual trait but shouldn't dominate — he's more than his bandages
- The site should feel like opening a case file at the Armed Detective Agency, not like browsing a wiki

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- No existing codebase — this is a greenfield project
- Resume file at `resources/AkhilaSusarlaResume DS GHC.docx` — source for all typed data

### Established Patterns
- None yet — Phase 1 establishes all patterns for subsequent phases

### Integration Points
- Theme tokens will be consumed by every component in Phase 2+
- Typed resume data files will be imported by all content sections
- Layout shell provides the responsive container for all scenes
- Zustand store provides global state for dialogue, section, and animation tracking in Phase 3

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-theme-system*
*Context gathered: 2026-03-06*
