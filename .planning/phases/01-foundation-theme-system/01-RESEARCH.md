# Phase 1: Foundation & Theme System - Research

**Researched:** 2026-03-06
**Domain:** Next.js 15 + Tailwind CSS v4 + Theme System + Asset Pipeline
**Confidence:** HIGH

## Summary

This phase establishes a greenfield Next.js 15 project with a BSD noir-inspired theme system, typed resume data, responsive layout shell, asset pipeline, and WCAG AA compliance. The core stack is Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Zustand v5. Tailwind v4 has moved to a CSS-first configuration model using `@theme` directives in CSS files instead of JavaScript config files -- this is a significant change from v3 and the primary pattern for defining all design tokens.

The resume data approach is straightforward: manually parse Akhila's .docx resume into static TypeScript data files with full type definitions. The BSD visual motifs (bandage textures, paper/parchment, stamps) should be implemented as CSS/SVG using `feTurbulence` SVG filters and CSS patterns -- no external image assets needed for textures.

**Primary recommendation:** Use `create-next-app@latest` with `--typescript` targeting Next.js 15.x, configure Tailwind v4 via `@tailwindcss/postcss`, define all theme tokens (colors, fonts, spacing) in `globals.css` using `@theme`, and use `next/font/google` for all three font families with CSS variable integration.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Deep midnight blue background (#0a0e1a range) -- Yokohama night noir feel
- Warm parchment text (#e8e0d4 range) for primary body text
- Warm gold/amber (#c9a84c / #d4af37 range) as primary accent
- Muted teal as secondary accent -- ability glow effects, hover states
- Subtle gradient shifts between sections
- Elegant serif for headings (Playfair Display / Cormorant family)
- Clean sans-serif for body text (Inter / Plus Jakarta Sans)
- Monospace for classified UI accents (JetBrains Mono / Fira Code / IBM Plex Mono)
- Japanese kanji as flavor text for ability names and section headers
- All fonts served as WOFF2, subsetted for performance
- Bandage textures as subtle accents (dividers, card borders, section separators)
- Aged paper + stamps for document elements
- Ink splatter / brush stroke effects
- Ability activation glow (radial glow/particle CSS effect)
- CSS/SVG-first approach for all motifs
- S/A/B/C tier rating system for skills
- Claude infers tier ratings from resume context
- Case file statuses: Solved, Active, Classified
- Static TypeScript data files (.ts) for resume data

### Claude's Discretion
- Exact hex values for the color palette (within decided ranges and mood)
- Specific font choices within the decided families
- Tailwind v4 custom theme configuration structure
- Zustand store shape for global state
- Asset pipeline tooling (sharp, next/image config, etc.)
- Responsive breakpoint values beyond 375px minimum and 1440px+ desktop

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FNDN-01 | Site built with Next.js 15 + React 19 + TypeScript | Standard stack section covers exact versions and setup |
| FNDN-02 | BSD dark noir theme system with design tokens | Architecture Patterns: Theme System section with @theme tokens |
| FNDN-03 | Responsive layout -- desktop-first with mobile breakpoints (375px min) | Breakpoint strategy in Architecture Patterns |
| FNDN-04 | Performance budget enforced -- 1.5MB initial load, WebP, lazy loading | Asset pipeline section and next/image integration |
| FNDN-05 | Tailwind CSS v4 for styling with custom theme configuration | Tailwind v4 CSS-first config documented in detail |
| FNDN-06 | Zustand store for global state | Zustand v5 store pattern documented |
| ASSET-01 | BSD-inspired custom visuals (original, not copyrighted) | CSS/SVG texture patterns documented |
| ASSET-02 | Bandage textures, paper/parchment, classified stamps as SVG/CSS | feTurbulence and CSS pattern approaches |
| ASSET-03 | Custom fonts (serif headings, clean body, monospace accents) in WOFF2 | next/font integration with Tailwind v4 CSS vars |
| ASSET-05 | Optimized asset pipeline -- WebP, lazy loading, responsive images | next/image + sharp pipeline documented |
| SEO-03 | WCAG AA contrast ratios on all text | Contrast requirements and verification approach |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.x (latest 15) | React framework with App Router, SSR, image optimization | Project requirement FNDN-01; stable, production-ready |
| react / react-dom | 19.x | UI library | Bundled with Next.js 15; required by FNDN-01 |
| typescript | 5.x | Type safety | Bundled with create-next-app; required by FNDN-01 |
| tailwindcss | 4.x | Utility-first CSS with CSS-first config | Required by FNDN-05; v4 uses @theme in CSS |
| @tailwindcss/postcss | 4.x | PostCSS plugin for Tailwind v4 | Required for Next.js integration with Tailwind v4 |
| zustand | 5.x | Lightweight global state management | Required by FNDN-06; 1.1KB, no boilerplate |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| sharp | latest | Server-side image optimization (WebP conversion) | Install for production builds; Next.js uses it automatically |
| mammoth | 1.x | Extract text from .docx files | One-time script to parse resume into TypeScript data |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next/font/google | next/font/local with downloaded WOFF2 | Google fonts auto-subsets and self-hosts; local only if custom subsets needed |
| Zustand | Jotai | Both from pmndrs; Zustand simpler for this use case (few global values) |
| sharp | squoosh | Sharp is 4-5x faster, Next.js recommends it for production |

**Installation:**
```bash
npx create-next-app@15 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install zustand
npm install sharp
npm install --save-dev mammoth  # one-time resume parsing
```

**Note:** `create-next-app@15` targets the 15.x line specifically. Tailwind v4 is included by default in recent create-next-app. Verify after scaffolding that `@tailwindcss/postcss` is in postcss.config.mjs.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout: fonts, theme provider, metadata
│   ├── page.tsx             # Landing page (renders all sections)
│   └── globals.css          # Tailwind @import + @theme tokens
├── components/
│   ├── layout/
│   │   ├── Shell.tsx        # Responsive layout container
│   │   └── Section.tsx      # Reusable section wrapper
│   └── ui/                  # Shared UI primitives (future phases)
├── data/
│   ├── types.ts             # All TypeScript interfaces/types
│   ├── skills.ts            # Skills with S/A/B/C tiers
│   ├── projects.ts          # Case files (projects + research)
│   ├── experience.ts        # Intel dossiers (work experience)
│   ├── education.ts         # Origin story (education)
│   └── social.ts            # Contact/social links
├── lib/
│   ├── store.ts             # Zustand global store
│   └── utils.ts             # Shared utility functions
├── styles/
│   └── textures.css         # SVG filter definitions, CSS patterns
└── assets/
    └── textures/            # Generated SVG textures (if needed)
public/
├── images/                  # Optimized images (WebP)
├── og/                      # OG images (future)
└── fonts/                   # Only if using local fonts
scripts/
└── parse-resume.ts          # One-time mammoth script
resources/
└── AkhilaSusarlaResume DS GHC.docx
```

### Pattern 1: Tailwind v4 CSS-First Theme Configuration
**What:** All design tokens defined in CSS using `@theme` directive
**When to use:** Always -- this is the v4 way, replaces tailwind.config.js

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* === Colors === */
  --color-midnight: #0a0e1a;
  --color-midnight-light: #111827;
  --color-midnight-deep: #060a14;
  --color-parchment: #e8e0d4;
  --color-parchment-dim: #c4b8a8;
  --color-gold: #d4af37;
  --color-gold-muted: #c9a84c;
  --color-teal: #2dd4bf;
  --color-teal-muted: #5eead4;
  --color-classified-red: #dc2626;

  /* === Fonts === */
  --font-heading: var(--font-playfair-display);
  --font-body: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);

  /* === Breakpoints === */
  --breakpoint-mobile: 375px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-wide: 1440px;
}
```

### Pattern 2: next/font with Tailwind v4 CSS Variables
**What:** Google Fonts loaded via next/font, exposed as CSS variables, consumed by @theme
**When to use:** Font setup in root layout

```typescript
// src/app/layout.tsx
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-midnight text-parchment font-body">
        {children}
      </body>
    </html>
  );
}
```

### Pattern 3: Zustand v5 Store Setup
**What:** Minimal global store for dialogue state, section tracking, animation flags
**When to use:** Phase 1 creates the store shell; Phase 3 populates it

```typescript
// src/lib/store.ts
import { create } from 'zustand';

interface PortfolioState {
  currentSection: string;
  dialogueActive: boolean;
  reducedMotion: boolean;
  setCurrentSection: (section: string) => void;
  setDialogueActive: (active: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>()((set) => ({
  currentSection: 'hero',
  dialogueActive: false,
  reducedMotion: false,
  setCurrentSection: (section) => set({ currentSection: section }),
  setDialogueActive: (active) => set({ dialogueActive: active }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
}));
```

### Pattern 4: Resume Data Types
**What:** TypeScript interfaces for all resume data with BSD-themed naming
**When to use:** Define once in types.ts, import everywhere

```typescript
// src/data/types.ts
export type SkillTier = 'S' | 'A' | 'B' | 'C';

export type CaseStatus = 'Solved' | 'Active' | 'Classified';

export interface Skill {
  name: string;
  tier: SkillTier;
  category: 'Languages' | 'Data Science/ML' | 'Tools & Frameworks' | 'Cloud';
  kanjiName?: string;       // Japanese flavor text
  description?: string;
}

export interface CaseFile {
  id: string;
  title: string;
  status: CaseStatus;
  description: string;
  technologies: string[];
  links?: { label: string; url: string }[];
  highlights: string[];
}

export interface IntelDossier {
  id: string;
  organization: string;
  role: string;
  period: string;
  status: CaseStatus;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  gpa?: string;
  period: string;
  highlights: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}
```

### Pattern 5: CSS/SVG Paper Texture (No Images)
**What:** Aged paper and noise textures using SVG feTurbulence filters
**When to use:** Card backgrounds, section dividers, document elements

```css
/* src/styles/textures.css */

/* Inline SVG noise filter -- apply via CSS */
.texture-paper {
  position: relative;
}

.texture-paper::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* Bandage stripe pattern -- CSS repeating gradient */
.texture-bandage {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 4px,
    rgba(232, 224, 212, 0.05) 4px,
    rgba(232, 224, 212, 0.05) 5px
  );
}

/* Classified stamp -- pure CSS */
.stamp-classified {
  border: 3px solid var(--color-classified-red);
  color: var(--color-classified-red);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding: 0.25rem 1rem;
  transform: rotate(-5deg);
  opacity: 0.8;
}
```

### Anti-Patterns to Avoid
- **Using tailwind.config.js with v4:** Tailwind v4 uses CSS-first `@theme` in globals.css. Do not create tailwind.config.js.
- **Importing external texture images:** Use CSS/SVG patterns for textures. External images add load time and copyright risk.
- **Runtime resume parsing:** Parse the .docx once during development, commit the TypeScript data files. Never parse at runtime.
- **Defining colors as raw hex in components:** Always use Tailwind theme tokens (`bg-midnight`, `text-gold`). Never hardcode hex values in JSX.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading & subsetting | Custom font loader | `next/font/google` | Handles self-hosting, subsetting, WOFF2, zero layout shift |
| Image optimization | Custom sharp pipeline | `next/image` component | Auto WebP, lazy loading, responsive srcset, blur placeholder |
| CSS utility framework | Custom CSS tokens system | Tailwind v4 `@theme` | CSS-first tokens auto-generate utilities + CSS variables |
| State management boilerplate | Custom React context | Zustand v5 `create()` | 1.1KB, no providers, no boilerplate |
| DOCX parsing | Manual text extraction | `mammoth` library | Handles OOXML complexity, headings, lists, formatting |
| PostCSS processing | Custom CSS build | `@tailwindcss/postcss` | Handles Tailwind compilation, vendor prefixes via Lightning CSS |

**Key insight:** Next.js 15 has built-in solutions for fonts, images, and CSS that handle the hard parts (subsetting, optimization, lazy loading). Using them correctly is the entire performance strategy.

## Common Pitfalls

### Pitfall 1: Tailwind v4 Config Confusion
**What goes wrong:** Developers create a tailwind.config.js file (v3 pattern) and wonder why @theme tokens are ignored
**Why it happens:** Most tutorials and training data reference v3 configuration
**How to avoid:** All theme configuration goes in globals.css under `@theme {}`. The PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss` directly
**Warning signs:** Error message "It looks like you're trying to use tailwindcss directly as a PostCSS plugin"

### Pitfall 2: Font Variable Not Applying
**What goes wrong:** Tailwind `font-heading` class doesn't work even though fonts load
**Why it happens:** CSS variable from next/font must be applied to an ancestor element AND referenced in @theme
**How to avoid:** (1) Apply all font `.variable` classes to `<html>` element, (2) Reference them in @theme as `--font-heading: var(--font-playfair-display)`
**Warning signs:** Font renders as fallback system font instead of custom font

### Pitfall 3: Dark Theme Contrast Failures
**What goes wrong:** Text is unreadable or fails WCAG AA (4.5:1 ratio)
**Why it happens:** Dark backgrounds with medium-tone text or accent colors used for body text
**How to avoid:** Validate every color combination: midnight bg + parchment text, midnight bg + gold text, midnight bg + teal text. Gold on midnight is risky -- may need brighter gold for small text
**Warning signs:** Squinting to read text, especially gold or teal on dark background

### Pitfall 4: Performance Budget Blown by Unoptimized Assets
**What goes wrong:** Initial page load exceeds 1.5MB budget
**Why it happens:** Large images, unsubsetted fonts, render-blocking CSS
**How to avoid:** (1) Always use `next/image` with WebP, (2) Use `next/font` for automatic subsetting, (3) Keep SVG textures inline in CSS, (4) Lazy load below-fold content
**Warning signs:** Lighthouse performance score below 90

### Pitfall 5: Next.js 15 vs 16 Version Confusion
**What goes wrong:** `npx create-next-app@latest` installs Next.js 16 instead of 15
**Why it happens:** Next.js 16 is now the latest version on npm
**How to avoid:** Use `npx create-next-app@15` explicitly to target the 15.x line as required by FNDN-01
**Warning signs:** Package.json shows `"next": "^16.x"` instead of `"^15.x"`

### Pitfall 6: Missing PostCSS Plugin Package
**What goes wrong:** Tailwind v4 doesn't process CSS, utilities don't generate
**Why it happens:** In v4, the PostCSS plugin moved to `@tailwindcss/postcss` (separate package)
**How to avoid:** Ensure `postcss.config.mjs` uses `"@tailwindcss/postcss": {}` and the package is installed
**Warning signs:** Tailwind utility classes appear as plain text, no styles applied

## Code Examples

### PostCSS Configuration for Tailwind v4
```javascript
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### Responsive Layout Shell (Desktop-First)
```typescript
// src/components/layout/Shell.tsx
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-midnight">
      <main className="mx-auto max-w-[1440px] px-4 tablet:px-8 desktop:px-16">
        {children}
      </main>
    </div>
  );
}
```

### next/image with Performance Guardrails
```typescript
// Usage pattern for all images
import Image from 'next/image';

<Image
  src="/images/texture.webp"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"           // Below fold
  placeholder="blur"       // Prevents layout shift
  blurDataURL="..."        // Base64 tiny placeholder
  quality={80}             // Balance quality vs size
/>
```

### WCAG AA Contrast Validation (Manual Checklist)
```
Required contrasts (WCAG AA = 4.5:1 normal text, 3:1 large text):

| Foreground        | Background       | Ratio  | Pass? |
|-------------------|------------------|--------|-------|
| #e8e0d4 parchment | #0a0e1a midnight | ~13:1  | YES   |
| #d4af37 gold      | #0a0e1a midnight | ~7.5:1 | YES   |
| #c9a84c gold-muted| #0a0e1a midnight | ~7:1   | YES   |
| #2dd4bf teal      | #0a0e1a midnight | ~9:1   | YES   |
| #5eead4 teal-muted| #0a0e1a midnight | ~11:1  | YES   |

Note: Verify exact values after finalizing hex codes.
Always check with WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
```

### One-Time Resume Parse Script
```typescript
// scripts/parse-resume.ts
// Run once: npx tsx scripts/parse-resume.ts
import mammoth from 'mammoth';
import { readFileSync, writeFileSync } from 'fs';

async function parseResume() {
  const result = await mammoth.extractRawText({
    path: './resources/AkhilaSusarlaResume DS GHC.docx'
  });
  console.log(result.value);
  // Manually structure output into src/data/*.ts files
}

parseResume();
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js (JS) | @theme in CSS (CSS-first) | Tailwind v4.0, early 2025 | No JS config file needed; tokens are CSS vars |
| @tailwind base/components/utilities | @import "tailwindcss" | Tailwind v4.0, early 2025 | Single import replaces three directives |
| tailwindcss PostCSS plugin | @tailwindcss/postcss | Tailwind v4.0, early 2025 | Separate package, must install explicitly |
| next/font CSS modules | next/font CSS variables + @theme | Tailwind v4 + Next.js 15 | Fonts defined as CSS vars, consumed by @theme |
| Zustand v4 with deprecated APIs | Zustand v5 (cleaned up) | Late 2024 | No new features, removed deprecated patterns |

**Deprecated/outdated:**
- `tailwind.config.js` / `tailwind.config.ts`: Replaced by `@theme` in CSS for v4
- `@tailwind base; @tailwind components; @tailwind utilities;`: Replaced by `@import "tailwindcss";`
- Direct `tailwindcss` as PostCSS plugin: Must use `@tailwindcss/postcss` package

## Open Questions

1. **Resume content parsing accuracy**
   - What we know: mammoth can extract raw text from the .docx
   - What's unclear: How well-structured the resume text is; may need manual cleanup
   - Recommendation: Run mammoth once, then manually curate TypeScript data files. The resume parsing is a dev-time task, not runtime.

2. **Japanese kanji font support**
   - What we know: next/font/google supports Noto Sans JP and other Japanese fonts
   - What's unclear: Whether Playfair Display has kanji glyphs (it does not)
   - Recommendation: Use a separate Japanese font (Noto Sans JP or Noto Serif JP) loaded via next/font for kanji-only flavor text. Subset to only needed characters for minimal payload.

3. **Exact gold/teal hex values for WCAG compliance**
   - What we know: The ranges given (#c9a84c, #d4af37 gold; teal unspecified) appear to pass AA on midnight backgrounds
   - What's unclear: Final exact values
   - Recommendation: Finalize during implementation, validate each pair with WebAIM checker before committing

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest (lightweight, Vite-native, fast) |
| Config file | vitest.config.ts -- Wave 0 |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FNDN-01 | Next.js 15 app builds and runs | smoke | `npx next build` | Wave 0 |
| FNDN-02 | Theme tokens defined and accessible as CSS vars | unit | `npx vitest run src/__tests__/theme.test.ts` | Wave 0 |
| FNDN-03 | Responsive breakpoints defined in theme | unit | `npx vitest run src/__tests__/theme.test.ts` | Wave 0 |
| FNDN-04 | Performance budget check (build output < 1.5MB) | smoke | `npx next build && du -sh .next/static` | Wave 0 |
| FNDN-05 | Tailwind v4 utilities generate from @theme | unit | `npx vitest run src/__tests__/theme.test.ts` | Wave 0 |
| FNDN-06 | Zustand store initializes with correct defaults | unit | `npx vitest run src/__tests__/store.test.ts` | Wave 0 |
| ASSET-01 | Visual motifs render as CSS/SVG (no external images) | manual-only | Visual inspection | N/A |
| ASSET-02 | Texture CSS classes apply correctly | unit | `npx vitest run src/__tests__/textures.test.ts` | Wave 0 |
| ASSET-03 | Fonts load via next/font with correct CSS vars | smoke | `npx next build` (font optimization logs) | Wave 0 |
| ASSET-05 | next/image configured for WebP output | unit | `npx vitest run src/__tests__/image-config.test.ts` | Wave 0 |
| SEO-03 | All color combinations pass WCAG AA 4.5:1 | unit | `npx vitest run src/__tests__/contrast.test.ts` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run && npx next build`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `vitest.config.ts` -- framework configuration
- [ ] `src/__tests__/theme.test.ts` -- validates CSS custom properties exist
- [ ] `src/__tests__/store.test.ts` -- validates Zustand store shape
- [ ] `src/__tests__/contrast.test.ts` -- validates color pair contrast ratios >= 4.5
- [ ] `src/__tests__/textures.test.ts` -- validates texture CSS class definitions
- [ ] Install: `npm install --save-dev vitest @vitejs/plugin-react jsdom`

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4.0 release blog](https://tailwindcss.com/blog/tailwindcss-v4) -- @theme syntax, CSS-first config, PostCSS plugin change
- [Tailwind CSS Next.js installation guide](https://tailwindcss.com/docs/guides/nextjs) -- @tailwindcss/postcss setup
- [Next.js App Router docs](https://nextjs.org/docs/app) -- App Router structure, layout.tsx patterns
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/google usage
- [Zustand GitHub releases](https://github.com/pmndrs/zustand/releases) -- v5.0.5 confirmed latest
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) -- WCAG AA validation tool

### Secondary (MEDIUM confidence)
- [Build with Matija: Google Fonts in Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) -- CSS variable integration pattern
- [CSS-Tricks: Grainy Gradients](https://css-tricks.com/grainy-gradients/) -- feTurbulence for paper textures
- [Codrops: SVG Filter Textures](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/) -- SVG noise/texture patterns
- [sharp official site](https://sharp.pixelplumbing.com/) -- image processing performance
- [mammoth npm](https://www.npmjs.com/package/mammoth) -- .docx to text extraction

### Tertiary (LOW confidence)
- Contrast ratio estimates for gold/teal on midnight: calculated from hex values but need final verification with exact chosen colors

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries verified, versions confirmed, install paths documented
- Architecture: HIGH -- Tailwind v4 @theme pattern verified against official docs and release blog
- Pitfalls: HIGH -- Tailwind v3-to-v4 migration issues well-documented; font variable issue confirmed in GitHub discussions
- Contrast ratios: MEDIUM -- estimated from hex ranges, must verify with final exact values

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (stable stack, 30-day window)
