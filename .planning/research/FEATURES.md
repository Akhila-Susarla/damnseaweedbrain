# Features Research: BSD-Themed Interactive Portfolio

## Table Stakes

These are non-negotiable. Without them, visitors leave regardless of how cool the theme is.

| # | Feature | Description | Complexity | BSD Presentation |
|---|---------|-------------|------------|------------------|
| 1 | Clear navigation | Users find any section in <3 clicks | Low | Menu styled as Agency navigation panel |
| 2 | Responsive design | Works on desktop, tablet, mobile | Medium | Simplified animations on mobile, full experience on desktop |
| 3 | Fast initial load | <3s first meaningful paint | Medium | Loading screen with Dazai quotes while assets load |
| 4 | About / Bio | Who you are, what you do | Low | Character origin story / backstory |
| 5 | Skills overview | Technical competencies visible | Low | Supernatural ability cards with power ratings |
| 6 | Project showcase | Portfolio of work with details | Medium | Armed Detective Agency case files |
| 7 | Work experience | Employment history | Low | Intel / mission dossier reports |
| 8 | Contact / Social links | Way to reach you | Low | BSD-styled social link icons |
| 9 | Accessibility basics | Keyboard nav, sufficient contrast, alt text | Medium | Dark theme must still pass WCAG AA contrast |
| 10 | SEO fundamentals | Meta tags, semantic HTML, OG images | Low | BSD-themed OG image for social sharing |

## Differentiators

### Tier 1 — Build These (Core BSD Experience)

| Feature | Description | Complexity | Dependencies |
|---------|-------------|------------|--------------|
| Visual novel dialogue system | Typewriter text, character portraits, dialogue boxes on key sections | High | Theme system, state management |
| RPG ability cards | Skills as supernatural abilities with power levels, animated reveals | Medium | Theme system, GSAP |
| Case file UI for projects | Projects as detective case files with stamps, folders, evidence photos | Medium | Theme system |
| Scene transitions | Animated transitions between sections (page turns, fade-to-black, slide) | Medium | GSAP, scroll system |
| Dazai character presence | Dazai appears throughout — quotes, reactions, bandage motifs | Medium | Asset pipeline |
| Dark noir aesthetic with wit | Moody dark UI with humorous Dazai-style copy and interactions | Low | Theme system |

### Tier 2 — If Time Allows

| Feature | Description | Complexity | Dependencies |
|---------|-------------|------------|--------------|
| Yokohama city map navigation | Interactive map where locations = portfolio sections | High | Custom illustration or asset |
| "No Longer Human" Easter egg | Strips theme to minimal resume (Dazai's ability nullifies abilities) | Medium | Alternate stylesheet |
| Animated landing sequence | Cinematic intro with parallax, character reveal, typewriter title | High | GSAP, preloaded assets |
| Mission dossier experience section | Work history as classified documents with redacted text reveals | Medium | Theme system |
| Interactive skill tree | Connected node graph showing skill relationships | High | Custom component |

### Tier 3 — Defer to v2+

| Feature | Description | Complexity |
|---------|-------------|------------|
| Ability activation effects | Click a skill card to see the ability "activate" with particles/glow | High |
| Dialogue choices that change content | VN choices that alter what projects/info is shown | High |
| Port Mafia vs Detective Agency dual theme | Toggle between two visual themes | High |
| Custom cursor effects | BSD-themed cursor with trail effects | Medium |
| Ambient particles | Floating particles (paper, cherry blossoms) in background | Medium |
| Loading screen mini-game | Small BSD interaction while site loads | High |

## Anti-Features (Do NOT Build)

| Feature | Why Not |
|---------|---------|
| Autoplay audio/music | Universally hated; users will close the tab |
| Unskippable intro animation | Returning visitors will hate it; always provide skip |
| VN that gates portfolio content | Theme enhances access, never blocks it |
| Complex RPG mechanics | This is a portfolio, not a game; keep mechanics decorative |
| Heavy 3D / WebGL scenes | Overkill for 2D anime aesthetic; kills performance |
| Fan fiction narrative | Portfolio should use BSD tone, not create original BSD stories |
| Login / account system | Portfolio is public; no auth needed |
| AI chatbot as Dazai | Gimmicky, unreliable, distracts from portfolio purpose |
| Excessive page count | Keep it focused; 4-5 sections max |
| "Anime fonts" (illegible stylized text) | Decorative fonts for headings only; body text must be readable |

## Feature Dependencies

```
Theme System (colors, typography, tokens)
  ├── Dark noir aesthetic
  ├── All BSD-styled components
  │
  ├── Visual Novel Dialogue System
  │     └── requires: Zustand state, GSAP animations
  │
  ├── RPG Ability Cards
  │     └── requires: GSAP for reveals, resume data mapped
  │
  ├── Case File UI
  │     └── requires: project data structured
  │
  └── Scene Transitions
        └── requires: GSAP + ScrollTrigger, Lenis

Asset Pipeline (sprites, backgrounds, UI elements)
  ├── Dazai character presence
  ├── Landing sequence
  └── All visual components
```

## MVP Recommendation

**v1:** All table stakes + Tier 1 differentiators. This gives a fully immersive BSD portfolio that's also functional.

**v2:** Tier 2 features (map navigation, Easter egg, animated intro, dossier section)

**v3:** Tier 3 polish (ability effects, dialogue choices, dual themes)

## BSD-Specific Elements Mapping

| BSD Universe Element | Portfolio Section | Implementation |
|---------------------|-------------------|----------------|
| Armed Detective Agency | Overall framing | Site is "ADA's file on Agent Dazai (Akhila)" |
| Case Files | Projects | Each project = a case the agency handled |
| Supernatural Abilities | Skills | Each skill = an ability with power rating |
| Character Dossier | About | Origin story format |
| Intel Reports | Experience | Mission briefing / classified document style |
| Yokohama | Navigation | Section locations mapped to city areas |
| "No Longer Human" | Easter egg | Strips all theme = plain resume |
| Bandages | Design motif | Subtle bandage textures, wrapped elements |
| Dazai quotes | Micro-copy | Loading states, tooltips, transitions |

---
*Researched: 2026-03-06*
