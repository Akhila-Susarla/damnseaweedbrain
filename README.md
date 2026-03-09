<div align="center">

# DamnSeaweedBrain

**A Bungou Stray Dogs-themed Data Science Portfolio**

*"The best way to find yourself is to lose yourself in the service of others." — Osamu Dazai*

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r170-black?logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?logo=greensock)](https://gsap.com/)
[![Tests](https://img.shields.io/badge/Vitest-29_tests-6E9F18?logo=vitest)](https://vitest.dev/)

[Live Demo](https://damnseaweedbrain.com) · [Report Bug](https://github.com/LakshmanTurlapati/damnseaweedbrain/issues) · [Request Feature](https://github.com/LakshmanTurlapati/damnseaweedbrain/issues)

</div>

---

## Table of Contents

- [About the Project](#about-the-project)
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Architecture](#architecture)
- [Testing](#testing)
- [Deployment](#deployment)
- [Acknowledgments & License](#acknowledgments--license)

## About the Project

DamnSeaweedBrain reimagines the data science portfolio as a Bungou Stray Dogs detective agency. Every section maps to an in-universe concept:

- **Skills → Abilities** — Rated in RPG tiers (S/A/B/C) with kanji labels, like supernatural abilities in the series
- **Projects → Case Files** — Presented as detective agency case folders with status stamps (Solved / Active / Classified)
- **Experience → Intel Dossiers** — Work history formatted as classified intelligence reports with redaction bars

**Dazai Osamu** serves as the visual novel guide character, appearing between sections with contextual dialogue delivered through a full VN engine — complete with character expressions, typewriter text, and click-to-advance interaction.

The design philosophy is **narrative immersion**: every scroll, transition, and interaction reinforces the BSD world. Ink wash transitions bleed between sections. 3D particles (paper scraps, cherry blossoms, floating bandages) drift through the hero. The entire experience is a playable story, not just a page.

## Demo

Visit **[damnseaweedbrain.com](https://damnseaweedbrain.com)** to experience the full portfolio.

The site opens with Dazai introducing the Armed Detective Agency. Scrolling reveals each section through ink wash transitions, with Dazai appearing to narrate the transition. Sections flow from Hero → About → Abilities → Case Files → Intel → Social, each with its own themed UI and animation set.

## Features

### Visual Novel System
- Dazai character with **6 expressions** (neutral, smirk, laugh, serious, annoyed, mysterious)
- Section transition dialogues triggered by scroll position
- LWF sprite rendering with `CharacterPortrait` + `DazaiSprite`
- Click-to-advance with skip functionality
- JSON-driven dialogue scripts (easily editable)

### 3D & Particles
- Three.js particle system with paper, blossom, and bandage particles
- WebGL capability detection with graceful fallback
- Quality scaling (`high` / `low` / `off`) based on device performance
- `@react-three/fiber` + `@react-three/drei` integration

### Animation & Transitions
- Ink wash transitions between sections (SVG mask + GSAP)
- 3-layer parallax hero with depth-driven motion
- Smooth scrolling via Lenis + GSAP ScrollTrigger
- Typewriter text effect for dialogue and headings
- Motion (Framer Motion) for component-level animations

### Themed UI
- RPG skill tiers (S/A/B/C) with kanji names on ability cards
- Case file flip cards with status stamps
- Intel dossiers with redaction bars and classified styling
- `StampBadge` components for status indicators
- `TiltCard` with 3D perspective-on-hover

### SEO & Accessibility
- Dynamic OG images generated with Satori (`opengraph-image.tsx`)
- Auto-generated `sitemap.xml` and `robots.txt`
- JSON-LD structured data (Person + WebSite schemas)
- `prefers-reduced-motion` detection — disables animations automatically
- ARIA labels and semantic HTML throughout

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15.5](https://nextjs.org/) (App Router, Turbopack) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| 3D Graphics | [Three.js r170](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) |
| Animation | [GSAP 3.14](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) + [Motion](https://motion.dev/) |
| State | [Zustand 5](https://zustand-demo.pmnd.rs/) |
| Testing | [Vitest 4](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + [happy-dom](https://github.com/nicedayfor/happy-dom) |
| Linting | [ESLint 9](https://eslint.org/) |
| Utilities | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) |

## Project Structure

<details>
<summary>Click to expand the <code>src/</code> directory tree</summary>

```
src/
├── __tests__/                    # 29 test files covering all features
│   ├── abilities.test.ts         #   Section rendering tests
│   ├── about.test.ts
│   ├── accessibility.test.ts     #   ARIA & reduced-motion tests
│   ├── casefiles.test.ts
│   ├── contrast.test.ts          #   Color contrast validation
│   ├── data.test.ts              #   Data integrity checks
│   ├── dialogue-data.test.ts     #   Dialogue JSON validation
│   ├── dialogue-engine.test.ts   #   VN engine logic tests
│   ├── dialogue-skip.test.ts     #   Skip functionality tests
│   ├── hero-intro.test.ts
│   ├── hero.test.ts
│   ├── intel.test.ts
│   ├── jsonld.test.ts            #   Structured data validation
│   ├── metadata.test.ts          #   SEO metadata tests
│   ├── nav.test.ts
│   ├── og-image.test.ts          #   OG image generation tests
│   ├── reducedmotion.test.ts
│   ├── robots.test.ts
│   ├── section-dialogue.test.ts
│   ├── sections.test.ts
│   ├── seo.test.ts
│   ├── sitemap.test.ts
│   ├── store.test.ts             #   Zustand store tests
│   ├── textures.test.ts
│   ├── theme.test.ts             #   Theme token tests
│   ├── three-fallback.test.ts    #   WebGL fallback tests
│   ├── tilt-hook.test.ts
│   ├── typewriter.test.ts
│   └── webgl-support.test.ts
│
├── app/                          # Next.js App Router
│   ├── globals.css               #   Theme tokens, @theme config
│   ├── layout.tsx                #   Root layout, font setup
│   ├── opengraph-image.tsx       #   Dynamic OG image (Satori)
│   ├── page.tsx                  #   Section composition + JSON-LD
│   ├── robots.ts                 #   robots.txt generation
│   └── sitemap.ts                #   sitemap.xml generation
│
├── components/
│   ├── layout/
│   │   ├── Section.tsx           #   Reusable section wrapper
│   │   ├── Shell.tsx             #   Page shell with 3D scene
│   │   └── SmoothScroll.tsx      #   Lenis smooth scroll provider
│   ├── nav/
│   │   └── NavPanel.tsx          #   Side navigation panel
│   ├── sections/
│   │   ├── AbilitiesSection.tsx  #   RPG skill tier grid
│   │   ├── AboutSection.tsx      #   Bio + education
│   │   ├── CaseFilesSection.tsx  #   Project case files
│   │   ├── HeroSection.tsx       #   Parallax hero with 3D
│   │   ├── IntelSection.tsx      #   Experience dossiers
│   │   └── SocialSection.tsx     #   Contact + social links
│   ├── three/
│   │   ├── FallbackProvider.tsx  #   WebGL detection + fallback
│   │   ├── HeroEnvironment.tsx   #   3D scene environment
│   │   ├── HeroParticles.tsx     #   Particle system
│   │   └── Scene3D.tsx           #   Canvas + scene setup
│   ├── transitions/
│   │   └── InkWashTransition.tsx #   Ink wash section divider
│   ├── ui/
│   │   ├── AbilityCard.tsx       #   Skill card with tier badge
│   │   ├── CaseFolder.tsx        #   Flip card for projects
│   │   ├── IntelDossier.tsx      #   Experience dossier card
│   │   ├── StampBadge.tsx        #   Status stamp component
│   │   ├── TiltCard.tsx          #   3D perspective hover card
│   │   └── TypewriterText.tsx    #   Typewriter text effect
│   └── vn/
│       ├── CharacterPortrait.tsx #   Expression-based portrait
│       ├── DazaiSprite.tsx       #   Dazai character sprite
│       ├── DialogueBox.tsx       #   Text box with nameplate
│       ├── DialogueEngine.tsx    #   VN state machine
│       ├── DialogueOverlay.tsx   #   Full-screen VN overlay
│       └── HeroIntro.tsx         #   Opening dialogue sequence
│
├── data/
│   ├── dialogue/                 #   JSON dialogue scripts
│   │   ├── hero-intro.json
│   │   ├── about-transition.json
│   │   ├── abilities-transition.json
│   │   ├── casefiles-transition.json
│   │   ├── intel-transition.json
│   │   └── social-transition.json
│   ├── education.ts              #   Education entries
│   ├── experience.ts             #   Work experience data
│   ├── projects.ts               #   Project case files
│   ├── skills.ts                 #   Skills with tiers
│   ├── social.ts                 #   Social/contact links
│   └── types.ts                  #   TypeScript interfaces
│
├── hooks/
│   ├── useDialogue.ts            #   Dialogue state hook
│   ├── useReducedMotion.ts       #   Motion preference hook
│   ├── useTilt.ts                #   3D tilt effect hook
│   └── useWebGLSupport.ts        #   WebGL detection hook
│
├── lib/
│   ├── store.ts                  #   Zustand global store
│   └── utils.ts                  #   Utility functions
│
└── styles/
    └── textures.css              #   Background texture styles
```

</details>

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/LakshmanTurlapati/damnseaweedbrain.git
cd damnseaweedbrain

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

> **Note:** No `.env` file is required. The project has no external API dependencies.

### Available Scripts

| Script | Command | Description |
|---|---|---|
| Dev | `npm run dev` | Start dev server with Turbopack |
| Build | `npm run build` | Create production build |
| Start | `npm run start` | Serve production build |
| Lint | `npm run lint` | Run ESLint |
| Test | `npm run test` | Run all 29 tests with Vitest |

## Customization Guide

<details>
<summary><strong>Portfolio Content</strong></summary>

All portfolio data lives in `src/data/` with TypeScript interfaces in `src/data/types.ts`:

| File | Section | Interface |
|---|---|---|
| `skills.ts` | Abilities | `Skill` (name, tier, category, kanjiName) |
| `projects.ts` | Case Files | `CaseFile` (title, status, description, technologies, highlights) |
| `experience.ts` | Intel | `IntelDossier` (organization, role, period, highlights, technologies) |
| `education.ts` | About | `Education` (institution, degree, gpa, period, highlights) |
| `social.ts` | Social | `SocialLink` (platform, url, label) |

Edit any file and the site updates automatically with full type safety.

</details>

<details>
<summary><strong>Dialogue</strong></summary>

Dialogue scripts are JSON files in `src/data/dialogue/`:

```json
{
  "id": "about-transition",
  "section": "about",
  "type": "transition",
  "lines": [
    {
      "id": "about-1",
      "character": "dazai",
      "expression": "smirk",
      "text": "Your dialogue text here..."
    }
  ]
}
```

Available expressions: `neutral`, `smirk`, `laugh`, `serious`, `annoyed`, `mysterious`

To add new dialogue, create a JSON file following the `DialogueSequence` interface and wire it into the corresponding section component.

</details>

<details>
<summary><strong>Colors & Fonts</strong></summary>

Theme tokens are defined in `src/app/globals.css` using Tailwind CSS v4's `@theme` block. Key tokens include colors like `--color-midnight`, `--color-parchment`, and `--color-blood-red`.

Fonts are configured in `src/app/layout.tsx`:

| Variable | Font | Usage |
|---|---|---|
| `--font-playfair-display` | Playfair Display | Headings |
| `--font-inter` | Inter | Body text |
| `--font-jetbrains-mono` | JetBrains Mono | Code / monospace |
| `--font-caveat` | Caveat | Handwritten accents |

</details>

<details>
<summary><strong>Adding a New Section</strong></summary>

1. Create a new section component in `src/components/sections/`
2. Add a dialogue JSON file in `src/data/dialogue/` (e.g., `newsection-transition.json`)
3. Import and add the section to `src/app/page.tsx` inside `<Shell>`, with an `<InkWashTransition>` above it
4. Add a navigation entry in `src/components/nav/NavPanel.tsx`

</details>

## Architecture

### Component Hierarchy

```
RootLayout (layout.tsx)
└── SmoothScroll (Lenis provider)
    ├── NavPanel (side navigation)
    └── Home (page.tsx)
        └── Shell (3D scene backdrop)
            ├── HeroSection
            ├── InkWashTransition → AboutSection
            ├── InkWashTransition → AbilitiesSection
            ├── InkWashTransition → CaseFilesSection
            ├── InkWashTransition → IntelSection
            ├── InkWashTransition → SocialSection
            └── DialogueOverlay (fixed VN layer)
```

### State Management

A single Zustand store (`src/lib/store.ts`) manages global state:

| Field | Type | Purpose |
|---|---|---|
| `currentSection` | `string` | Active section for nav highlighting |
| `dialogueActive` | `boolean` | Whether VN overlay is showing |
| `reducedMotion` | `boolean` | User prefers reduced motion |
| `animationsReady` | `boolean` | GSAP/scroll animations initialized |
| `qualityLevel` | `'high' \| 'low' \| 'off'` | 3D rendering quality tier |

### Animation System

Three animation layers work together:

1. **GSAP + ScrollTrigger** — Section reveals, parallax, ink wash transitions
2. **Lenis** — Smooth scroll normalization, momentum, and scroll hijacking during dialogues
3. **Motion (Framer Motion)** — Component enter/exit animations, hover effects, layout transitions

### Visual Novel Pipeline

```
DialogueOverlay (scroll trigger detection)
  → DialogueEngine (state machine: advance, skip, complete)
    → CharacterPortrait (expression-based Dazai sprite)
    → DialogueBox (typewriter text + nameplate)
```

## Testing

Tests use **Vitest 4** with **happy-dom** and **React Testing Library**.

```bash
npm run test
```

| Area | Tests | What's Covered |
|---|---|---|
| Sections | 6 | Hero, About, Abilities, Case Files, Intel, Social rendering |
| Visual Novel | 4 | Dialogue engine, data validation, skip, hero intro |
| Accessibility | 3 | ARIA labels, reduced motion, color contrast |
| SEO | 5 | Metadata, JSON-LD, OG image, sitemap, robots.txt |
| 3D / WebGL | 3 | Particle textures, WebGL fallback, support detection |
| State & Hooks | 2 | Zustand store, tilt hook |
| Data & Theme | 2 | Data integrity, theme tokens |
| UI | 4 | Typewriter, nav, sections composition, section dialogues |

**Total: 29 tests**

## Deployment

### Vercel (Recommended)

1. Push the repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Deploy — no environment variables needed

### Generic Node.js Hosting

```bash
npm run build
npm run start
```

The production server runs on port 3000 by default.

## Acknowledgments & License

This is a **fan tribute** to Kafka Asagiri and Sango Harukawa's *Bungou Stray Dogs*. All BSD character references and thematic elements are used for creative, non-commercial purposes.

Built with these excellent libraries:
- [Next.js](https://nextjs.org/) — React framework
- [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) — 3D graphics
- [GSAP](https://gsap.com/) — Animation platform
- [Lenis](https://lenis.darkroom.engineering/) — Smooth scroll
- [Zustand](https://zustand-demo.pmnd.rs/) — State management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS

Licensed under [MIT](LICENSE).

---

<div align="center">

Built by [LakshmanTurlapati](https://github.com/LakshmanTurlapati) for **Akhila Susarla**

</div>
