# Architecture Research: BSD-Themed Interactive Portfolio

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App (SSG)                     │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Scenes     │  │  Components  │  │   Systems     │  │
│  │             │  │              │  │               │  │
│  │ Landing     │  │ AbilityCard  │  │ DialogueEngine│  │
│  │ About       │  │ CaseFile     │  │ AnimationOrch │  │
│  │ Abilities   │  │ DossierEntry │  │ ScrollManager │  │
│  │ CaseFiles   │  │ DialogueBox  │  │ AssetLoader   │  │
│  │ Intel       │  │ NavPanel     │  │ ThemeProvider  │  │
│  │ Contact     │  │ CharPortrait │  │               │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                │                   │          │
│         └────────────────┼───────────────────┘          │
│                          │                              │
│                   ┌──────▼───────┐                      │
│                   │   Zustand    │                      │
│                   │   Store      │                      │
│                   │              │                      │
│                   │ - dialogue   │                      │
│                   │ - animation  │                      │
│                   │ - section    │                      │
│                   │ - theme      │                      │
│                   └──────────────┘                      │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Asset Pipeline                       │   │
│  │  /public/assets/                                  │   │
│  │    ├── sprites/     (character sheets, WebP)      │   │
│  │    ├── backgrounds/ (scene backgrounds, WebP)     │   │
│  │    ├── ui/          (frames, borders, stamps)     │   │
│  │    ├── lottie/      (animated effects, JSON)      │   │
│  │    └── fonts/       (custom typography)            │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Major Components

### 1. Scene Layer (Pages/Sections)

Each portfolio section is a "scene" — a full-viewport section with its own visual context.

| Scene | Content | Visual Treatment |
|-------|---------|-----------------|
| **Landing** | Hero, Dazai introduction, call-to-explore | Cinematic parallax, character reveal, typewriter title |
| **About** | Bio, education, background | Character backstory scroll, origin story format |
| **Abilities** | Technical skills | RPG ability cards grid, power level meters |
| **CaseFiles** | Projects portfolio | Detective case file folders, expandable details |
| **Intel** | Work experience | Mission dossier format, classified stamps |
| **Contact** | Social links | BSD-styled link panel |

**Boundary:** Each scene manages its own animations via GSAP ScrollTrigger. Scenes communicate via Zustand store (active section, scroll progress).

### 2. Dialogue Engine

Custom visual novel system (~200 LOC).

```
Data Flow:
  dialogue-data.json → useDialogue hook → DialogueBox component
                                        → CharacterPortrait component
                                        → TypewriterText component

State (Zustand):
  - currentDialogueId: string | null
  - dialogueProgress: number
  - isDialogueActive: boolean
```

**Structure:**
```typescript
// Dialogue data format
interface DialogueLine {
  id: string;
  character: 'dazai' | 'narrator';
  text: string;
  portrait?: string;  // expression variant
  next: string | null;
}

// Dialogue tree stored as JSON
// Triggered by scroll position or user interaction
```

**Boundary:** Dialogue engine is self-contained. It reads dialogue JSON, manages its own state slice, and renders overlay components. Scenes trigger dialogues via store actions.

### 3. Animation Orchestration

Two animation systems working together:

| System | Responsibility | Technology |
|--------|---------------|------------|
| **Cinematic** | Scroll sequences, parallax, scene transitions, sprite animation | GSAP + ScrollTrigger |
| **UI** | Component enter/exit, hover effects, card flips, layout transitions | Motion (framer-motion) |

**Boundary:** GSAP owns scroll-driven animations. Motion owns component lifecycle animations. They never animate the same element.

```
ScrollManager (Lenis)
  └── GSAP ScrollTrigger
        ├── Scene parallax layers
        ├── Section reveal sequences
        ├── Sprite animations
        └── Progress-based transitions

Motion (per-component)
  ├── AbilityCard hover/reveal
  ├── CaseFile open/close
  ├── DialogueBox enter/exit
  └── NavPanel transitions
```

### 4. Theme System

Design tokens that define the BSD aesthetic.

```
ThemeProvider (React Context)
  ├── Colors
  │     ├── bg-primary:    #0a0a0f  (deep noir black)
  │     ├── bg-secondary:  #1a1a2e  (dark navy)
  │     ├── accent-gold:   #d4a574  (Dazai's bandage/warmth)
  │     ├── accent-red:    #8b2252  (Port Mafia danger)
  │     ├── text-primary:  #e8e6e3  (aged paper white)
  │     └── text-muted:    #6b6b7b  (classified text)
  │
  ├── Typography
  │     ├── heading: Serif (literary reference)
  │     ├── body: Clean sans-serif (readability)
  │     └── accent: Monospace (dossier/intel feel)
  │
  └── Design Motifs
        ├── Bandage textures (borders, separators)
        ├── Paper/parchment backgrounds
        ├── Classified stamps and redaction bars
        └── Japanese typographic accents
```

### 5. Asset Pipeline

```
Source Assets (any format)
  │
  ▼
Build-time Processing
  ├── Images → WebP (next/image handles this)
  ├── Sprites → Optimized sprite sheets
  ├── SVGs → Inline or component imports
  ├── Lottie → JSON (already optimized)
  └── Fonts → WOFF2 subset
  │
  ▼
/public/assets/ (served via CDN)
  │
  ▼
Runtime Loading
  ├── Critical (above-fold): Preloaded, inlined
  ├── Scene assets: Loaded per-section (Intersection Observer)
  └── Effects: Lazy loaded on interaction
```

### 6. Data Layer

All content lives in static JSON/TypeScript files — no database, no CMS.

```
/src/data/
  ├── resume.ts        (parsed from .docx, typed interfaces)
  ├── dialogues.json   (VN dialogue trees)
  ├── abilities.ts     (skills → ability card mappings)
  ├── caseFiles.ts     (projects → case file mappings)
  └── intel.ts         (experience → dossier mappings)
```

**Data flow:** Resume content → mapped to BSD-themed structures → consumed by scene components.

## Directory Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx          # Root layout, font loading, providers
│   ├── page.tsx            # Single page (all scenes)
│   └── globals.css         # Tailwind + custom properties
│
├── components/
│   ├── scenes/             # Full-section scene components
│   │   ├── LandingScene.tsx
│   │   ├── AboutScene.tsx
│   │   ├── AbilitiesScene.tsx
│   │   ├── CaseFilesScene.tsx
│   │   ├── IntelScene.tsx
│   │   └── ContactScene.tsx
│   │
│   ├── dialogue/           # Visual novel system
│   │   ├── DialogueBox.tsx
│   │   ├── CharacterPortrait.tsx
│   │   └── TypewriterText.tsx
│   │
│   ├── cards/              # Interactive card components
│   │   ├── AbilityCard.tsx
│   │   ├── CaseFileCard.tsx
│   │   └── DossierEntry.tsx
│   │
│   ├── navigation/         # Nav components
│   │   ├── NavPanel.tsx
│   │   └── SectionIndicator.tsx
│   │
│   └── ui/                 # Shared UI primitives
│       ├── Badge.tsx
│       ├── Stamp.tsx
│       └── RedactionBar.tsx
│
├── systems/                # Core systems
│   ├── dialogue-engine.ts  # useDialogue hook
│   ├── animation.ts        # GSAP setup, ScrollTrigger config
│   └── scroll.ts           # Lenis smooth scroll setup
│
├── store/                  # Zustand stores
│   ├── dialogue-store.ts
│   ├── section-store.ts
│   └── animation-store.ts
│
├── data/                   # Static content
│   ├── resume.ts
│   ├── dialogues.json
│   ├── abilities.ts
│   ├── case-files.ts
│   └── intel.ts
│
├── theme/                  # Design tokens
│   ├── colors.ts
│   ├── typography.ts
│   └── motifs.ts
│
└── lib/                    # Utilities
    ├── asset-loader.ts
    └── utils.ts

public/
└── assets/
    ├── sprites/
    ├── backgrounds/
    ├── ui/
    ├── lottie/
    └── fonts/
```

## Suggested Build Order

```
Phase 1: Foundation
  ├── Next.js project setup + TypeScript
  ├── Theme system (colors, typography, tokens)
  ├── Asset pipeline (directories, optimization config)
  ├── Resume data parsing and typing
  └── Basic responsive layout shell

Phase 2: Core Scenes + Navigation
  ├── Scene components (all 6 sections)
  ├── Navigation panel
  ├── Smooth scrolling (Lenis)
  ├── Basic scroll animations (GSAP ScrollTrigger)
  └── Content populated from resume data

Phase 3: BSD Experience Layer
  ├── Visual novel dialogue engine
  ├── RPG ability cards with animations
  ├── Case file UI for projects
  ├── Intel dossier format for experience
  ├── Scene transitions
  └── Dazai character presence (portraits, quotes)

Phase 4: Polish & Assets
  ├── Landing sequence animation
  ├── Advanced parallax effects
  ├── Asset integration (sprites, backgrounds)
  ├── Performance optimization
  ├── Mobile responsiveness tuning
  └── SEO + OG images
```

## Critical Dependencies

1. **Theme system** must exist before any visual component
2. **Asset pipeline** must be resolved before visual work (what assets do we actually have?)
3. **Resume data parsing** must happen before content sections
4. **Lenis + GSAP** must be configured before scroll-driven animations
5. **Dialogue engine** is independent — can be built in parallel with scenes

---
*Researched: 2026-03-06*
