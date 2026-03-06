# Phase 2: Content Scenes & Navigation - Research

**Researched:** 2026-03-06
**Domain:** Scroll-driven animation, smooth scrolling, section navigation, component architecture
**Confidence:** HIGH

## Summary

Phase 2 transforms the Phase 1 foundation (theme, data, textures) into a fully navigable portfolio with 6 content sections. The core technical challenges are: (1) integrating Lenis smooth scroll with GSAP ScrollTrigger for scroll-driven animations, (2) building a persistent navigation panel that tracks scroll position, (3) creating reusable animated section components that render resume data with BSD styling, and (4) ensuring accessibility compliance (keyboard nav, reduced motion, aria labels).

All data files (skills.ts, projects.ts, experience.ts, education.ts, social.ts) and types are ready from Phase 1. The existing Section component, Shell layout, Zustand store (with currentSection and reducedMotion), theme tokens, and CSS textures provide the integration surface. Three new libraries are needed: `lenis` for smooth scroll, `gsap` + `@gsap/react` for scroll-triggered animations, and `motion` for component lifecycle animations.

**Primary recommendation:** Install lenis + gsap + @gsap/react + motion. Build a shared Lenis+GSAP integration provider first, then implement sections in dependency order: Nav -> Hero -> About -> Abilities -> Case Files -> Intel -> Social. Use `useGSAP` hook (not useEffect) for all GSAP animations with automatic cleanup.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Navigation: Left side rail, always visible on desktop. Vertical text labels only (JetBrains Mono), no icons. Active section highlights in gold with vertical progress line. Collapses to bottom bar on mobile (< 768px). Smooth scroll via Lenis. All sections directly accessible.
- Hero: Source full Dazai character renders from the web. 3-layer parallax (background Yokohama/noir, midground Dazai character, foreground floating elements). Typewriter title reveal. Scroll-down indicator at bottom.
- About: Character dossier format (personnel file, not prose). Fields: Origin (education), Known Abilities (achievements), Background (leadership). Uses aged paper texture. Scroll-triggered reveals.
- Abilities: Grid layout by category (4 categories). Category headers with kanji subtitles. Tier badge only (S/A/B/C letter, no meter/bar). Distinct color per tier (gold for S, teal for A, etc.). Animated card reveals via GSAP ScrollTrigger. Hover/click for description detail.
- Case Files: Folder flip/open animation. Rubber stamp overlays for status (CLASSIFIED red, SOLVED green). Uses classified-red token. Expandable details with links. 3 case files from projects.ts.
- Intel: Vertical timeline (top to bottom, most recent first). Connecting line between nodes. Classified dossier aesthetic. Redacted text reveal (black bars fade on scroll). Classified roles (Autodesk) get heavier redaction + stamp + red border. Solved roles more open. 4 dossiers from experience.ts.
- Social: Agency communication panel styling. LinkedIn, GitHub, Email from social.ts.
- Animation: GSAP ScrollTrigger for scroll-driven (ANIM-01). Motion for component lifecycle (ANIM-03). Parallax on hero (ANIM-04). Reduced motion via prefers-reduced-motion + Zustand flag (ANIM-05).
- Accessibility: Semantic HTML with heading hierarchy (SEO-01). Keyboard navigable (SEO-04). Alt text and aria labels (SEO-05).

### Claude's Discretion
- Typewriter reveal sequence (domain name first vs Dazai quip)
- Exact scroll-down indicator design
- Social/contact panel layout details
- Card hover interaction specifics (tooltip vs expand vs flip)
- Exact GSAP animation timing and easing curves
- How category headers are styled beyond kanji subtitles
- Mobile responsive adaptations for cards, case files, and dossiers

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | BSD-styled navigation panel visible at all times | Nav component with fixed positioning, Lenis scrollTo integration |
| NAV-02 | Smooth scroll between sections via Lenis | Lenis library with autoRaf + scrollTo API |
| NAV-03 | Section progress indicator showing current position | Lenis scroll events + IntersectionObserver to track active section, vertical progress bar |
| NAV-04 | All sections directly accessible | No gating -- all sections rendered in DOM, nav links scroll to anchors |
| HERO-01 | Dazai character presence with introduction sequence | Character image sourcing (web), layered parallax composition |
| HERO-02 | Typewriter title reveal | CSS or GSAP-based typewriter animation on mount |
| HERO-03 | Multi-layer parallax scene with depth | GSAP ScrollTrigger parallax with different scroll speeds per layer |
| HERO-05 | Scroll-down indicator / call to explore | Animated chevron/arrow with bounce, scrolls to next section on click |
| ABOUT-01 | Education displayed (UTD, SRM with GPAs) | education.ts data rendered in dossier format |
| ABOUT-02 | Background framed as BSD character backstory | Personnel file UI design with texture-paper/aged-edge CSS classes |
| ABOUT-03 | Leadership roles and achievements integrated | education.highlights data rendered within dossier sections |
| ABOUT-04 | Scroll-triggered reveal animations | GSAP ScrollTrigger staggered reveals |
| ABIL-01 | All resume skills displayed as ability cards | skills.ts (32 skills) rendered as styled cards |
| ABIL-02 | Power level ratings/meters | Tier badge (S/A/B/C letter) with distinct colors per tier |
| ABIL-03 | Ability categories | Grid sections per category with kanji headers |
| ABIL-04 | Animated card reveals on scroll | GSAP ScrollTrigger batch stagger animation |
| ABIL-05 | Hover/click interactions showing detail | Motion AnimatePresence for expand/tooltip showing description |
| CASE-01 | Influence Maximization case file | case-001 from projects.ts |
| CASE-02 | NER Radar case file | case-002 from projects.ts |
| CASE-03 | UniWay case file | case-003 from projects.ts |
| CASE-04 | Detective case file UI | Folder component with flip animation, stamps |
| CASE-05 | Expandable details with links | Expand/collapse with Motion, render CaseFile.links |
| CASE-06 | Case status indicators | stamp-classified CSS + green "SOLVED" variant |
| INTL-01 | American Airlines dossier | intel-001 from experience.ts |
| INTL-02 | Autodesk Data Scientist dossier | intel-002, Classified status |
| INTL-03 | Autodesk ML Engineer dossier | intel-003, Classified status |
| INTL-04 | SRM Research Intern dossier | intel-004, Solved status |
| INTL-05 | Mission dossier format | Classified document card with stamps and redaction bars |
| INTL-06 | Redacted text reveal animations | GSAP ScrollTrigger to animate opacity/clip-path on black overlay bars |
| INTL-07 | Timeline progression | Vertical line with connected nodes, CSS-based |
| SOCL-01 | LinkedIn link (BSD-styled) | socialLinks[0] rendered in agency panel |
| SOCL-02 | GitHub link (BSD-styled) | socialLinks[1] rendered in agency panel |
| SOCL-03 | Email link (BSD-styled) | socialLinks[2] rendered in agency panel |
| SOCL-04 | Agency communication panel styling | Themed card with monospace text, classified aesthetic |
| ANIM-01 | GSAP ScrollTrigger throughout | GSAP + @gsap/react with useGSAP hook |
| ANIM-03 | Motion for lifecycle animations | motion package, import from "motion/react" |
| ANIM-04 | Parallax depth effects | GSAP ScrollTrigger scrub with y-translation per layer |
| ANIM-05 | Reduced motion mode | prefers-reduced-motion media query + store.reducedMotion flag |
| SEO-01 | Semantic HTML with heading hierarchy | h1 on hero, h2 per section, h3 for subsections |
| SEO-04 | Keyboard navigation for interactive elements | tabIndex, focus-visible styles, Enter/Space handlers |
| SEO-05 | Alt text and aria labels | aria-label on nav links, alt on images, role on decorative elements |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| lenis | ^1.3 | Smooth scroll engine | Industry standard smooth scroll, native DOM, lightweight, built-in React wrapper and GSAP sync |
| gsap | ^3.12 | Scroll-driven animations | Most powerful animation library, ScrollTrigger plugin, free (Webflow-sponsored), automatic cleanup via useGSAP |
| @gsap/react | ^2.1 | React integration for GSAP | Official useGSAP hook -- handles cleanup, scoping, replaces useEffect for animations |
| motion | ^12.34 | Component lifecycle animations | Renamed framer-motion, React 19 compatible, import from "motion/react", AnimatePresence for mount/unmount |

### Already Installed (Phase 1)
| Library | Version | Purpose |
|---------|---------|---------|
| next | 15.5.12 | Framework |
| react | 19.1.0 | UI library |
| zustand | ^5.0.11 | State (currentSection, reducedMotion) |
| tailwindcss | ^4 | Styling |
| clsx + tailwind-merge | - | Class merging via cn() |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Lenis | CSS scroll-behavior: smooth | CSS-only is simpler but no momentum, no programmatic control, no GSAP sync |
| GSAP ScrollTrigger | Intersection Observer only | IO is free/native but cannot do scrub-linked parallax or staggered batch reveals |
| Motion | CSS @keyframes only | CSS animations cannot do layout transitions, mount/unmount, or spring physics |

**Installation:**
```bash
npm install lenis gsap @gsap/react motion
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Shell.tsx          # (exists) Main layout wrapper
│   │   ├── Section.tsx        # (exists) Section wrapper with depth variants
│   │   └── SmoothScroll.tsx   # NEW: Lenis + GSAP integration provider
│   ├── nav/
│   │   └── NavPanel.tsx       # NEW: Side rail navigation with progress
│   ├── sections/
│   │   ├── HeroSection.tsx    # NEW: Landing with parallax + typewriter
│   │   ├── AboutSection.tsx   # NEW: Character dossier with education data
│   │   ├── AbilitiesSection.tsx  # NEW: Skill cards grid by category
│   │   ├── CaseFilesSection.tsx  # NEW: Project folders with flip animation
│   │   ├── IntelSection.tsx   # NEW: Experience timeline with redaction
│   │   └── SocialSection.tsx  # NEW: Agency communication panel
│   └── ui/
│       ├── TypewriterText.tsx # NEW: Reusable typewriter animation
│       ├── AbilityCard.tsx    # NEW: Individual skill card
│       ├── CaseFolder.tsx     # NEW: Expandable case file folder
│       ├── IntelDossier.tsx   # NEW: Individual dossier card with redaction
│       └── StampBadge.tsx     # NEW: Reusable classified/solved stamp
├── hooks/
│   └── useReducedMotion.ts    # NEW: Sync prefers-reduced-motion with store
├── data/                      # (exists) All data files ready
├── lib/
│   ├── store.ts               # (exists) Zustand store
│   └── utils.ts               # (exists) cn() utility
└── styles/
    └── textures.css           # (exists) Paper, bandage, stamp, glow textures
```

### Pattern 1: Lenis + GSAP Smooth Scroll Provider
**What:** A client component that wraps the app, initializes Lenis, syncs it with GSAP's ticker, and provides scroll context.
**When to use:** Once at the app level (in layout.tsx or page.tsx).
**Example:**
```typescript
// src/components/layout/SmoothScroll.tsx
'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

Note: When using `<ReactLenis root>`, Lenis hijacks the native scroll on `<html>`. The GSAP sync happens via Lenis's built-in integration -- in recent versions, ScrollTrigger picks up Lenis automatically when both are present. If manual sync is needed:

```typescript
// Manual sync fallback (if auto-detection doesn't work)
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```

### Pattern 2: useGSAP for Scroll Animations
**What:** Use `@gsap/react`'s `useGSAP` hook instead of useEffect for all GSAP animations. It automatically cleans up all GSAP instances (timelines, ScrollTriggers) on unmount.
**When to use:** Every component with GSAP animations.
**Example:**
```typescript
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.dossier-field', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>...</div>;
}
```

### Pattern 3: Motion for Component Lifecycle
**What:** Use `motion` for mount/unmount animations (AnimatePresence), hover states, and layout transitions.
**When to use:** Card expansions, tooltip reveals, folder flip open/close.
**Example:**
```typescript
'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

function CaseFolder({ caseFile }: { caseFile: CaseFile }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <motion.div
        className="folder-cover"
        animate={{ rotateX: isOpen ? -120 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ transformOrigin: 'top' }}
      >
        {/* folder cover with stamp */}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* expanded details */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### Pattern 4: Reduced Motion Guard
**What:** Check both CSS media query and Zustand store flag. Disable all animations when either is active.
**When to use:** Every animated component.
**Example:**
```typescript
// src/hooks/useReducedMotion.ts
'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';

export function useReducedMotion() {
  const { reducedMotion, setReducedMotion } = usePortfolioStore();

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [setReducedMotion]);

  return reducedMotion;
}

// Usage in components:
// const reducedMotion = useReducedMotion();
// if (reducedMotion) { gsap.set(elements, { opacity: 1, y: 0 }); return; }
```

### Pattern 5: Scroll-Based Section Tracking for Nav
**What:** Use ScrollTrigger to update the Zustand store's currentSection as user scrolls.
**When to use:** Once, in a scroll tracking component or the nav component itself.
**Example:**
```typescript
useGSAP(() => {
  const sections = ['hero', 'about', 'abilities', 'case-files', 'intel', 'social'];
  sections.forEach((id) => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setCurrentSection(id),
      onEnterBack: () => setCurrentSection(id),
    });
  });
});
```

### Anti-Patterns to Avoid
- **useEffect for GSAP animations:** Always use `useGSAP` hook -- it handles cleanup automatically. Using useEffect leads to memory leaks from orphaned ScrollTrigger instances.
- **Importing from "framer-motion":** The package is renamed. Import from `"motion/react"` for React 19 compatibility.
- **Registering GSAP plugins inside useGSAP:** Register `gsap.registerPlugin(ScrollTrigger)` at module level (top of file), not inside hooks.
- **Animating without scope:** Always pass `{ scope: containerRef }` to useGSAP to scope CSS selector queries to the component's DOM tree.
- **Forgetting "use client":** All animation components MUST have the `'use client'` directive since they use browser APIs (window, DOM refs, IntersectionObserver).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scrolling | Custom RAF scroll interpolation | Lenis with `<ReactLenis root>` | Edge cases with touch, momentum, accessibility, focus management |
| Scroll-linked animation | Manual scroll listeners + transforms | GSAP ScrollTrigger | Handles resize, refresh, scrub, pin, snap, all edge cases |
| Mount/unmount animation | CSS transition + conditional rendering | Motion AnimatePresence | Exit animations require keeping DOM nodes alive during animation |
| Typewriter effect | setInterval character append | GSAP timeline with SplitText or simple GSAP `.to` on text | Timing, easing, pause/resume, reduced motion all handled |
| Parallax layers | Manual scroll listener + transform math | GSAP ScrollTrigger with `scrub: true` | Smooth interpolation, resize handling, mobile considerations |
| Section tracking | Manual scroll position calculation | ScrollTrigger.create with onEnter/onEnterBack | Handles all edge cases (fast scroll, resize, dynamic content) |

**Key insight:** Scroll-driven UIs have dozens of edge cases (resize, orientation change, dynamic content, touch vs wheel, momentum, accessibility). Libraries like Lenis and GSAP ScrollTrigger exist specifically because hand-rolling these is a maintenance nightmare.

## Common Pitfalls

### Pitfall 1: ScrollTrigger positions incorrect after images load
**What goes wrong:** ScrollTrigger calculates positions on mount, but images load later shifting content down. All trigger points are wrong.
**Why it happens:** Images without explicit dimensions cause layout shift after initial render.
**How to avoid:** Set explicit width/height or aspect-ratio on all images. Call `ScrollTrigger.refresh()` after images load. Use Next.js `<Image>` with width/height props.
**Warning signs:** Animations triggering too early or too late, especially on slower connections.

### Pitfall 2: Lenis and ScrollTrigger out of sync
**What goes wrong:** Lenis interpolates scroll position, but ScrollTrigger reads native scroll. Animations feel laggy or offset.
**Why it happens:** Missing sync between Lenis RAF loop and GSAP ticker.
**How to avoid:** Use the official sync pattern: `lenis.on('scroll', ScrollTrigger.update)` + add `lenis.raf` to GSAP ticker + disable lag smoothing. With `<ReactLenis root>`, verify sync is working in dev tools.
**Warning signs:** Scroll animations that "catch up" after scrolling stops.

### Pitfall 3: GSAP animations not cleaning up
**What goes wrong:** Navigating away and back creates duplicate ScrollTriggers. Animations fire multiple times or conflict.
**Why it happens:** Using useEffect instead of useGSAP, or not using scope.
**How to avoid:** Always use `useGSAP` hook from `@gsap/react`. Always pass `{ scope: ref }`.
**Warning signs:** Console warnings about duplicate ScrollTrigger instances.

### Pitfall 4: Hydration mismatch with "use client" components
**What goes wrong:** Server-rendered HTML doesn't match client-rendered HTML because animation initial states differ.
**Why it happens:** GSAP sets initial styles on mount that differ from server-rendered state.
**How to avoid:** Set initial styles via CSS/Tailwind (e.g., `opacity-0 translate-y-8`) matching the GSAP `from` values. GSAP then animates FROM those values.
**Warning signs:** Flash of unstyled content or React hydration warnings in console.

### Pitfall 5: Reduced motion not fully respected
**What goes wrong:** Some animations still play when user has prefers-reduced-motion enabled.
**Why it happens:** Only checking CSS media query but not applying to JS animations, or vice versa.
**How to avoid:** Check store.reducedMotion in every useGSAP callback. Use `gsap.set()` to apply final state immediately when reduced motion is active. For Motion components, set `transition={{ duration: 0 }}` when reduced motion is on.
**Warning signs:** Any visible animation when system reduced-motion preference is enabled.

### Pitfall 6: Performance on mobile with parallax
**What goes wrong:** Parallax + smooth scroll + many animated elements causes jank on mobile.
**Why it happens:** Too many composited layers, expensive transform calculations every frame.
**How to avoid:** Use `will-change: transform` sparingly. Limit parallax layers. Use ScrollTrigger's `fastScrollEnd` and `preventOverlaps`. Consider disabling parallax on mobile entirely.
**Warning signs:** FPS drops below 30 on mid-range mobile devices.

## Code Examples

### Typewriter Text Component
```typescript
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePortfolioStore } from '@/lib/store';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TypewriterText({ text, className, delay = 0 }: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  useGSAP(() => {
    if (!ref.current || reducedMotion) return;

    const chars = text.split('');
    ref.current.textContent = '';

    const tl = gsap.timeline({ delay });
    chars.forEach((char, i) => {
      tl.to(ref.current!, {
        duration: 0.05,
        onComplete: () => {
          if (ref.current) ref.current.textContent = text.slice(0, i + 1);
        },
      }, i * 0.05);
    });
  }, { dependencies: [text, delay, reducedMotion] });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {reducedMotion ? text : ''}
    </span>
  );
}
```

### Parallax Layer Pattern
```typescript
// Inside HeroSection useGSAP callback:
useGSAP(() => {
  if (reducedMotion) return;

  // Background layer -- slowest
  gsap.to('.parallax-bg', {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Midground (character) -- medium speed
  gsap.to('.parallax-mid', {
    y: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Foreground elements -- fastest / static
  gsap.to('.parallax-fg', {
    y: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}, { scope: heroRef });
```

### Redacted Text Reveal Pattern
```typescript
// Redacted overlay that lifts away on scroll
useGSAP(() => {
  if (reducedMotion) {
    gsap.set('.redaction-bar', { opacity: 0 });
    return;
  }

  gsap.to('.redaction-bar', {
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });
}, { scope: containerRef });

// JSX: Position black bars over text lines
// <span className="relative">
//   <span>{text}</span>
//   <span className="redaction-bar absolute inset-0 bg-black" aria-hidden="true" />
// </span>
```

### Stamp Badge Variants
```typescript
// Extend existing .stamp-classified from textures.css
// Add a solved variant
function StampBadge({ status }: { status: CaseStatus }) {
  const styles = {
    Classified: 'border-classified-red text-classified-red',
    Solved: 'border-teal text-teal',
    Active: 'border-gold text-gold',
  };

  return (
    <span
      className={cn(
        'inline-block border-3 font-mono text-sm font-bold uppercase tracking-widest',
        'px-3 py-1 rotate-[-3deg] opacity-80 select-none',
        styles[status]
      )}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}
```

### Nav Progress Tracking
```typescript
// Track scroll progress within the active section
useGSAP(() => {
  const sections = ['hero', 'about', 'abilities', 'case-files', 'intel', 'social'];
  sections.forEach((id) => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        // self.progress is 0-1 within this section
        // Update nav progress bar for this section
      },
      onEnter: () => setCurrentSection(id),
      onEnterBack: () => setCurrentSection(id),
    });
  });
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| framer-motion package | motion package (import from "motion/react") | 2024 | React 19 compatible, same API |
| @studio-freight/lenis | lenis (darkroomengineering/lenis) | 2024 | Package renamed, React wrapper at lenis/react |
| GSAP paid plugins | All GSAP plugins free (Webflow) | 2024 | ScrollTrigger, SplitText, etc. all free to use |
| useEffect for GSAP | useGSAP from @gsap/react | 2024 | Automatic cleanup of ScrollTriggers, scoping |
| Manual RAF loops for Lenis | autoRaf option or ReactLenis component | 2024 | No manual ticker management needed |

**Deprecated/outdated:**
- `@studio-freight/lenis` and `@studio-freight/react-lenis` -- renamed to `lenis`
- `framer-motion` import path -- use `motion/react` instead
- Manual useEffect + cleanup for GSAP -- use `useGSAP` hook
- GSAP Club memberships for plugins -- all plugins now free

## Open Questions

1. **Dazai character image sourcing**
   - What we know: User wants full Dazai character renders sourced from the web, not CSS silhouettes
   - What's unclear: Specific images haven't been identified. Copyright implications of using anime character art on a personal portfolio
   - Recommendation: Search for creative commons or fan-art-friendly BSD renders. Alternatively, use artistic/stylized representations. Implementation should use Next.js `<Image>` with explicit dimensions for performance. Plan should include image sourcing as an early task with a CSS-gradient fallback.

2. **Lenis + ReactLenis auto-sync with GSAP**
   - What we know: Official docs show manual sync pattern. Some community reports suggest recent versions auto-detect
   - What's unclear: Whether `<ReactLenis root>` in v1.3.x auto-syncs with GSAP ScrollTrigger or requires manual wiring
   - Recommendation: Start with `<ReactLenis root>`. Test if ScrollTrigger works correctly. If not, add the manual sync code. Both patterns are documented above.

3. **Motion performance with many cards**
   - What we know: 32 skill cards + 3 case files + 4 dossiers = 39 animated items
   - What's unclear: Whether AnimatePresence on all cards simultaneously causes performance issues
   - Recommendation: Use GSAP ScrollTrigger batch for scroll-in reveals (more efficient for many items). Reserve Motion for individual card interactions (hover/expand).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 |
| Config file | vitest.config.mts |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run --reporter=verbose` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Nav panel renders with all 6 section links | unit | `npx vitest run src/__tests__/nav.test.ts -t "renders"` | No -- Wave 0 |
| NAV-02 | Lenis scrollTo called on nav link click | unit | `npx vitest run src/__tests__/nav.test.ts -t "scroll"` | No -- Wave 0 |
| NAV-04 | All 6 sections rendered in DOM | unit | `npx vitest run src/__tests__/sections.test.ts -t "accessible"` | No -- Wave 0 |
| HERO-02 | Typewriter text renders full text | unit | `npx vitest run src/__tests__/typewriter.test.ts` | No -- Wave 0 |
| ABOUT-01 | Education data rendered (UTD, SRM, GPAs) | unit | `npx vitest run src/__tests__/about.test.ts` | No -- Wave 0 |
| ABIL-01 | All 32 skills rendered as cards | unit | `npx vitest run src/__tests__/abilities.test.ts -t "renders all"` | No -- Wave 0 |
| ABIL-03 | Skills grouped into 4 categories | unit | `npx vitest run src/__tests__/abilities.test.ts -t "categories"` | No -- Wave 0 |
| CASE-04 | Case file folders render with stamps | unit | `npx vitest run src/__tests__/casefiles.test.ts` | No -- Wave 0 |
| INTL-05 | All 4 dossiers rendered | unit | `npx vitest run src/__tests__/intel.test.ts` | No -- Wave 0 |
| INTL-07 | Timeline has connecting line element | unit | `npx vitest run src/__tests__/intel.test.ts -t "timeline"` | No -- Wave 0 |
| SOCL-01-03 | Social links rendered (LinkedIn, GitHub, Email) | unit | `npx vitest run src/__tests__/data.test.ts -t "Social"` | Yes |
| ANIM-05 | Reduced motion flag syncs with media query | unit | `npx vitest run src/__tests__/reducedmotion.test.ts` | No -- Wave 0 |
| SEO-01 | Heading hierarchy is valid (h1 > h2 > h3) | unit | `npx vitest run src/__tests__/seo.test.ts` | No -- Wave 0 |
| SEO-04 | Interactive elements have tabIndex and key handlers | unit | `npx vitest run src/__tests__/accessibility.test.ts` | No -- Wave 0 |
| SEO-05 | Images have alt text, nav links have aria-label | unit | `npx vitest run src/__tests__/accessibility.test.ts` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run --reporter=verbose`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/nav.test.ts` -- covers NAV-01, NAV-02, NAV-04
- [ ] `src/__tests__/sections.test.ts` -- covers all 6 sections rendering
- [ ] `src/__tests__/typewriter.test.ts` -- covers HERO-02
- [ ] `src/__tests__/about.test.ts` -- covers ABOUT-01, ABOUT-02, ABOUT-03
- [ ] `src/__tests__/abilities.test.ts` -- covers ABIL-01, ABIL-03
- [ ] `src/__tests__/casefiles.test.ts` -- covers CASE-04, CASE-06
- [ ] `src/__tests__/intel.test.ts` -- covers INTL-05, INTL-07
- [ ] `src/__tests__/reducedmotion.test.ts` -- covers ANIM-05
- [ ] `src/__tests__/seo.test.ts` -- covers SEO-01
- [ ] `src/__tests__/accessibility.test.ts` -- covers SEO-04, SEO-05
- [ ] Vitest config needs `environment: 'jsdom'` for DOM testing (currently set to `'node'`)
- [ ] Install `@testing-library/react` + `@testing-library/jest-dom` for component tests

Note: The current vitest environment is `node`, which works for data tests but component tests rendering JSX will need `jsdom`. This should be handled as an early Wave 0 task.

## Sources

### Primary (HIGH confidence)
- [Lenis GitHub](https://github.com/darkroomengineering/lenis) -- v1.3.18, React wrapper, GSAP sync pattern, autoRaf option
- [GSAP npm](https://www.npmjs.com/package/gsap) -- v3.12+, all plugins free, ScrollTrigger included
- [@gsap/react npm](https://www.npmjs.com/package/@gsap/react) -- useGSAP hook, automatic cleanup
- [Motion npm](https://www.npmjs.com/package/motion) -- v12.34.5, React 19 compatible, import from "motion/react"

### Secondary (MEDIUM confidence)
- [GSAP community forums](https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/) -- useGSAP + ScrollTrigger patterns in Next.js
- [GSAP + Lenis sync pattern](https://gsap.com/community/forums/topic/34696-scrolltrigger-with-lenis/) -- manual sync approach confirmed by GSAP team
- [Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide) -- framer-motion to motion migration, no breaking changes in v12

### Tertiary (LOW confidence)
- Lenis + ReactLenis auto-sync with GSAP -- community reports suggest auto-detection in recent versions, but not confirmed in official docs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries verified via npm, GitHub, official docs
- Architecture: HIGH -- patterns verified from official GSAP/Lenis docs and community best practices
- Pitfalls: HIGH -- documented in GSAP forums, confirmed by multiple sources
- Validation: MEDIUM -- test infrastructure needs jsdom environment switch and testing-library install

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable ecosystem, 30-day validity)
