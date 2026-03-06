# Stack Research: BSD-Themed Interactive Portfolio

## Recommended Stack

| Layer | Technology | Rationale | Confidence |
|-------|-----------|-----------|------------|
| **Framework** | Next.js 15 + React 19 + TypeScript | User requirement; SSG static export for pure frontend portfolio | High |
| **Heavy Animation** | GSAP + ScrollTrigger + @gsap/react | Industry standard for scroll-driven timelines, sprite animation, cinematic sequences | High |
| **UI Animation** | Motion (framer-motion) | Best React integration for component lifecycle, gestures, layout transitions | High |
| **Smooth Scroll** | Lenis | Lightweight smooth scrolling, replaces abandoned Locomotive Scroll | High |
| **Visual Novel** | Custom implementation (~200 LOC) | No viable React VN library exists; simple dialogue tree + typewriter effect | High |
| **Sprites** | CSS sprite sheets + GSAP | Standard game-dev-on-web approach, no extra library needed | High |
| **Styling** | Tailwind CSS v4 + CSS Modules | Zero-runtime, enables deep custom aesthetic without component library constraints | High |
| **State** | Zustand | Lightweight global state for dialogue progress, animation state, section tracking | High |
| **Effects** | Lottie React | JSON-based animations for sparkles, ability effects, supernatural powers | Medium |
| **Images** | next/image (built-in) | WebP/AVIF auto-conversion, responsive sizing, lazy loading, blur placeholders | High |
| **Deployment** | Vercel + static export | Native Next.js hosting, free tier, global CDN, zero config | High |

## Key Decisions

### Build the VN System, Don't Install One

No React visual novel library has meaningful adoption. Ren'Py and Monogatari.js are standalone engines, not embeddable React components. A custom `useDialogue` hook with JSON dialogue trees gives full control and is roughly 200 lines of code. This is the right approach for portfolio-scale VN interactions.

### GSAP + Motion Together (Not Either/Or)

- **GSAP** handles the "cinematic" layer: scroll sequences, sprite animation, timeline choreography, parallax
- **Motion (framer-motion)** handles the "UI" layer: component enter/exit, layout transitions, hover effects, gestures
- Using one for everything leads to awkward code. They complement each other.

### No Component Library

Tailwind + CSS Modules instead of shadcn/MUI/Chakra. The BSD theme requires such deep visual customization that a component library would fight the design at every step. Build custom components styled to match the anime aesthetic.

## What NOT to Use

| Technology | Why Not |
|-----------|---------|
| **Three.js / React Three Fiber** | Overkill for 2D anime aesthetic; adds massive bundle, GPU requirements |
| **Locomotive Scroll** | Abandoned/unmaintained; Lenis is its spiritual successor |
| **Ren'Py / Monogatari.js** | Standalone engines, not embeddable in React |
| **PixiJS** | Good for 2D games but overkill for sprite display in a portfolio |
| **Anime.js** | Smaller community, less ecosystem than GSAP; GSAP is more battle-tested |
| **shadcn/ui, MUI, Chakra** | Component libraries fight against deep custom theming |
| **Redux** | Overkill for this project's state needs; Zustand is simpler |

## Asset Pipeline

- **Sprites/backgrounds**: Source as PNG/JPG → convert to WebP via next/image or build-time optimization
- **SVG**: Use for UI elements, icons, ability card decorations
- **Lottie JSON**: For animated effects (ability activations, transitions)
- **Fonts**: Custom fonts for BSD aesthetic (Japanese-inspired typography)

---
*Researched: 2026-03-06*
