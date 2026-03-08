# Phase 4: Polish & Launch - Research

**Researched:** 2026-03-08
**Domain:** SEO metadata, OG image generation, performance optimization, deployment
**Confidence:** HIGH

## Summary

Phase 4 addresses the final two v1 requirements (ASSET-04, SEO-02) and deploys the site to production. The work divides into three distinct areas: (1) OG image generation using Next.js `ImageResponse` from `next/og`, (2) comprehensive SEO metadata including Open Graph tags, Twitter Cards, JSON-LD structured data, sitemap, and robots.txt, and (3) performance verification and production deployment.

The existing codebase is well-positioned for this phase. The `layout.tsx` already exports a basic `Metadata` object that needs extending. Next.js 15 provides built-in file conventions for all SEO artifacts (`opengraph-image.tsx`, `sitemap.ts`, `robots.ts`). The current build is 228kB JS -- well under the 1.5MB budget.

**Primary recommendation:** Use Next.js built-in file conventions for all SEO/OG artifacts. Deploy to Vercel for zero-config Next.js hosting with automatic SSL and custom domain support. No additional dependencies required.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- OG image built with Next.js ImageResponse (next/og) -- generated at build time, not a static file
- One site-wide OG image (single-page portfolio, no per-section variants)
- Text: "Akhila Susarla" prominently + a short BSD-flavored tagline
- Design: BSD noir aesthetic with the established color palette (midnight, gold, parchment)
- Meta description: professional tone with subtle BSD flavor -- emphasize "Data Scientist" keywords
- Primary keyword positioning: "Data Scientist" (not ML Engineer)
- JSON-LD structured data: Person schema + WebSite schema
- Generate sitemap.xml and robots.txt via Next.js built-in support (sitemap.ts, robots.ts)
- Canonical URL: damnseaweedbrain.com
- Open Graph tags: title, description, image, type (website), URL
- Twitter Card: summary_large_image
- Lighthouse audit targeting Performance + SEO categories -- fix anything below 90
- Focus on Core Web Vitals: LCP, CLS, FID/INP
- No analytics -- skip third-party tracking scripts entirely
- Verify 1.5MB initial load budget is met
- Target domain: damnseaweedbrain.com

### Claude's Discretion
- OG image visual design (layout, graphical elements, exact tagline wording)
- Exact meta description copy
- JSON-LD schema field values beyond name/role/social links
- Specific Lighthouse fixes (depends on audit results)
- Deployment platform choice and configuration
- Any additional performance optimizations beyond Lighthouse findings

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ASSET-04 | BSD-themed OG image for social media sharing | ImageResponse from next/og with Satori rendering; opengraph-image.tsx file convention generates at build time |
| SEO-02 | Meta tags and Open Graph data for social sharing | Next.js Metadata API in layout.tsx; openGraph + twitter fields; JSON-LD via script tag; sitemap.ts + robots.ts |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/og (ImageResponse) | Bundled with Next.js 15.5.12 | OG image generation from JSX | Built into Next.js, uses Satori + Resvg under the hood, no extra dependency |
| Next.js Metadata API | 15.5.12 | OG tags, Twitter Cards, canonical URL | Native framework feature, type-safe with `Metadata` type |
| Next.js file conventions | 15.5.12 | sitemap.ts, robots.ts, opengraph-image.tsx | Zero-config, cached by default, standard route handlers |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | latest | TypeScript types for JSON-LD schemas | Optional -- adds type safety for Person/WebSite JSON-LD; small dev dependency |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| schema-dts | Inline JSON-LD types | schema-dts provides full Schema.org typing but adds a dependency; inline is fine for 2 simple schemas |
| Vercel deployment | Netlify | Netlify supports Next.js via OpenNext adapter but Vercel has native day-one support; Vercel is the obvious choice for a Next.js portfolio |
| Vercel deployment | Static export (`output: 'export'`) | Static export would lose opengraph-image.tsx generation and other server features; not suitable |

**Installation:**
```bash
# No new production dependencies needed
# Optional dev dependency for JSON-LD types:
npm install -D schema-dts
```

## Architecture Patterns

### New Files to Create
```
src/app/
  opengraph-image.tsx    # OG image generation (1200x630 PNG)
  twitter-image.tsx      # Can re-export from opengraph-image or be separate
  sitemap.ts             # Single-page sitemap
  robots.ts              # Crawler directives
  page.tsx               # Add JSON-LD script tag
  layout.tsx             # Extend existing Metadata export
```

### Pattern 1: OG Image with ImageResponse
**What:** Generate a 1200x630 PNG at build time using JSX and inline CSS
**When to use:** For the single site-wide OG image
**Critical constraint:** Satori (the rendering engine) only supports flexbox layout and a subset of CSS. No CSS Grid, no `calc()`, no CSS variables, no WOFF2 fonts.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Akhila Susarla - Data Scientist Portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // Fonts must be TTF/OTF/WOFF (NOT WOFF2)
  // Fetch from Google Fonts CDN or bundle locally
  const fontData = await readFile(
    join(process.cwd(), 'assets/fonts/PlayfairDisplay-Bold.ttf')
  )

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',       // REQUIRED on every container
        width: '100%',
        height: '100%',
        background: '#0a0e1a', // midnight
        color: '#e8e0d4',      // parchment
        // ... layout
      }}>
        {/* Content */}
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Playfair Display', data: fontData, style: 'normal', weight: 700 }],
    }
  )
}
```

### Pattern 2: Extended Metadata in layout.tsx
**What:** Add metadataBase, openGraph, twitter, alternates to the existing Metadata export
**When to use:** Root layout -- applies to entire site

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://damnseaweedbrain.com'),
  title: 'Akhila Susarla | Data Scientist',
  description: '...', // professional + subtle BSD flavor
  keywords: ['Data Scientist', 'Machine Learning', 'Portfolio', 'Akhila Susarla'],
  authors: [{ name: 'Akhila Susarla' }],
  openGraph: {
    title: 'Akhila Susarla | Data Scientist',
    description: '...',
    url: 'https://damnseaweedbrain.com',
    siteName: 'DamnSeaweedBrain',
    locale: 'en_US',
    type: 'website',
    // images auto-populated by opengraph-image.tsx file convention
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akhila Susarla | Data Scientist',
    description: '...',
    // images auto-populated by twitter-image.tsx file convention
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}
```

### Pattern 3: JSON-LD Structured Data
**What:** Person + WebSite schema as script tags in page.tsx
**When to use:** In the main page component body

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
export default function Home() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Akhila Susarla',
    jobTitle: 'Data Scientist',
    url: 'https://damnseaweedbrain.com',
    sameAs: [
      'https://linkedin.com/in/akhila-susarla-1803b41b6/',
      'https://github.com/akhilasusarla',
    ],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DamnSeaweedBrain',
    url: 'https://damnseaweedbrain.com',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* existing page content */}
    </>
  )
}
```

### Pattern 4: Sitemap and Robots
**What:** File-convention route handlers for SEO crawling

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://damnseaweedbrain.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}

// app/robots.ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://damnseaweedbrain.com/sitemap.xml',
  }
}
```

### Anti-Patterns to Avoid
- **Using CSS Grid or `calc()` in OG image:** Satori silently ignores these -- layout will break with no error
- **Using WOFF2 fonts in ImageResponse:** Satori only supports TTF, OTF, and WOFF formats
- **Forgetting `display: 'flex'` on containers:** Satori defaults differ from browsers; every container element needs explicit flex
- **Static export (`output: 'export'`):** Would break opengraph-image.tsx generation and other server-side features
- **Putting JSON-LD in metadata export:** JSON-LD is NOT part of Next.js Metadata API; must be a `<script>` tag in the component body

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OG image | Canvas/Sharp-based image generator | `next/og` ImageResponse | Handles PNG encoding, font rendering, edge-compatible |
| Meta tags | Manual `<meta>` tags in `<head>` | Next.js Metadata API export | Type-safe, handles merging, auto-generates correct HTML |
| Sitemap XML | String template XML file | `sitemap.ts` file convention | Typed, cached, validated by Next.js |
| Robots.txt | Static text file | `robots.ts` file convention | Typed, can reference sitemap URL programmatically |
| SSL certificates | Manual cert setup | Vercel automatic HTTPS | Auto-provisioned and renewed for custom domains |

**Key insight:** Next.js 15 has built-in file conventions for every SEO artifact this phase needs. Zero external packages required for the core work.

## Common Pitfalls

### Pitfall 1: Satori CSS Limitations
**What goes wrong:** OG image renders incorrectly or elements disappear
**Why it happens:** Satori only supports flexbox and a CSS subset. No grid, no calc(), no CSS variables, no z-index. Silently ignores unsupported properties.
**How to avoid:** Use only inline styles with flexbox. Test locally by visiting `/opengraph-image` in the browser during development.
**Warning signs:** Elements not appearing, layout collapsing, text overlapping

### Pitfall 2: Font Format for OG Image
**What goes wrong:** Font fails to load or renders as fallback
**Why it happens:** Satori supports TTF, OTF, and WOFF only. The project uses Google Fonts loaded via `next/font/google` which provides WOFF2 -- this format is NOT available to Satori.
**How to avoid:** Download TTF versions of Playfair Display and Inter from Google Fonts. Store in `assets/fonts/` directory. Load via `readFile()` in the OG image handler.
**Warning signs:** Wrong font in OG preview, build errors about font loading

### Pitfall 3: Metadata Merging Overwrites
**What goes wrong:** openGraph fields from layout.tsx get completely replaced if page.tsx also defines openGraph
**Why it happens:** Next.js does shallow merge of metadata -- nested objects like `openGraph` are replaced entirely, not deep-merged
**How to avoid:** Define all openGraph fields in layout.tsx only, or if splitting, import shared fields. The file-based opengraph-image.tsx takes priority over metadata object images.
**Warning signs:** Missing OG description or title on final page

### Pitfall 4: metadataBase Required for Relative URLs
**What goes wrong:** Build error or incorrect absolute URLs in meta tags
**Why it happens:** URL-based metadata fields require absolute URLs. Without `metadataBase`, relative paths cause build errors.
**How to avoid:** Set `metadataBase: new URL('https://damnseaweedbrain.com')` in root layout.tsx
**Warning signs:** Build warnings about relative URLs, incorrect OG image URLs

### Pitfall 5: Streaming Metadata and Social Crawlers
**What goes wrong:** LinkedIn/Twitter/Facebook don't see OG tags
**Why it happens:** Next.js 15.2+ streams metadata by default. HTML-limited bots (like `facebookexternalhit`) need metadata in `<head>` before JS execution.
**How to avoid:** Next.js automatically detects HTML-limited bots and blocks rendering until metadata is resolved. No action needed for static metadata (the `metadata` object, not `generateMetadata`). Since this site uses static metadata, this is not an issue.
**Warning signs:** OG tags visible in browser but not in social preview debuggers

### Pitfall 6: Vercel Domain DNS Propagation
**What goes wrong:** Custom domain not working after deployment
**Why it happens:** DNS changes (CNAME/A records) take time to propagate
**How to avoid:** Configure DNS records promptly. Use Vercel's domain checker to verify. SSL auto-provisions once DNS resolves.
**Warning signs:** Domain showing Vercel 404, SSL certificate pending

## Code Examples

### OG Image Design Approach (BSD Noir Aesthetic)
```typescript
// Recommended structure for BSD noir OG image
// Source: verified Satori CSS constraints from https://github.com/vercel/satori
export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #111827 50%, #060a14 100%)',
        padding: '60px',
        fontFamily: 'Playfair Display',
      }}>
        {/* Gold accent line */}
        <div style={{
          display: 'flex',
          width: '120px',
          height: '4px',
          background: '#d4af37',
          marginBottom: '40px',
        }} />

        {/* Name */}
        <div style={{
          display: 'flex',
          fontSize: '72px',
          color: '#e8e0d4',
          fontWeight: 700,
          marginBottom: '16px',
        }}>
          Akhila Susarla
        </div>

        {/* Tagline */}
        <div style={{
          display: 'flex',
          fontSize: '32px',
          color: '#c9a84c',
          fontFamily: 'Inter',
        }}>
          Data Scientist | Armed Detective Agency
        </div>

        {/* Bottom border accent */}
        <div style={{
          display: 'flex',
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '8px',
          background: '#d4af37',
        }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Playfair Display', data: playfairFont, style: 'normal', weight: 700 },
        { name: 'Inter', data: interFont, style: 'normal', weight: 400 },
      ],
    }
  )
}
```

### Downloading Google Fonts as TTF for Satori
```bash
# Download TTF files for OG image rendering (Satori does not support WOFF2)
mkdir -p assets/fonts
# Playfair Display Bold
curl -o assets/fonts/PlayfairDisplay-Bold.ttf \
  "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDTbtPY_Q.ttf"
# Inter Regular
curl -o assets/fonts/Inter-Regular.ttf \
  "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKv0.ttf"
```

### Vercel Deployment Configuration
```bash
# Install Vercel CLI
npm install -g vercel

# Link project
vercel link

# Deploy to production
vercel --prod

# Add custom domain (via Vercel Dashboard)
# 1. Go to project Settings > Domains
# 2. Add damnseaweedbrain.com
# 3. Configure DNS: CNAME record pointing to cname.vercel-dns.com
# 4. SSL auto-provisions
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-seo package | Built-in Metadata API | Next.js 13.2+ | No external dependency needed |
| @vercel/og separate package | `next/og` built-in | Next.js 14+ | ImageResponse included with Next.js |
| Manual OG image files | opengraph-image.tsx convention | Next.js 13.3+ | Build-time generation from JSX |
| next-sitemap package | sitemap.ts file convention | Next.js 13.3+ | Zero-config, typed |
| viewport in metadata | generateViewport separate export | Next.js 14+ | viewport/themeColor moved out of Metadata |

**Deprecated/outdated:**
- `next-seo` package: Replaced by built-in Metadata API
- `@vercel/og` standalone install: Now bundled as `next/og`
- `themeColor` and `colorScheme` in metadata: Moved to `generateViewport` in Next.js 14

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.x with happy-dom |
| Config file | `vitest.config.mts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run --reporter=verbose` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ASSET-04 | OG image exports correct metadata (alt, size, contentType) | unit | `npx vitest run src/__tests__/og-image.test.ts -x` | Wave 0 |
| SEO-02 | Metadata object contains OG, Twitter, canonical fields | unit | `npx vitest run src/__tests__/metadata.test.ts -x` | Wave 0 |
| SEO-02 | JSON-LD scripts render Person and WebSite schemas | unit | `npx vitest run src/__tests__/jsonld.test.ts -x` | Wave 0 |
| SEO-02 | sitemap.ts returns correct URL entries | unit | `npx vitest run src/__tests__/sitemap.test.ts -x` | Wave 0 |
| SEO-02 | robots.ts returns correct rules | unit | `npx vitest run src/__tests__/robots.test.ts -x` | Wave 0 |
| PERF | Lighthouse scores above 90 | manual-only | Manual: `npx next build && npx next start` then Chrome DevTools Lighthouse | N/A -- requires running server |
| DEPLOY | Site accessible at damnseaweedbrain.com | manual-only | Manual: browser verification after Vercel deploy | N/A |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run --reporter=verbose`
- **Phase gate:** Full suite green + manual Lighthouse + manual deployment verification

### Wave 0 Gaps
- [ ] `src/__tests__/og-image.test.ts` -- covers ASSET-04 (test metadata exports, not actual image rendering)
- [ ] `src/__tests__/metadata.test.ts` -- covers SEO-02 metadata fields
- [ ] `src/__tests__/jsonld.test.ts` -- covers SEO-02 JSON-LD schemas
- [ ] `src/__tests__/sitemap.test.ts` -- covers SEO-02 sitemap entries
- [ ] `src/__tests__/robots.test.ts` -- covers SEO-02 robots rules
- [ ] `assets/fonts/PlayfairDisplay-Bold.ttf` -- TTF font for OG image (Satori requirement)
- [ ] `assets/fonts/Inter-Regular.ttf` -- TTF font for OG image

## Open Questions

1. **Domain registrar configuration**
   - What we know: Target domain is damnseaweedbrain.com, will point to Vercel
   - What's unclear: Where the domain is registered, whether DNS is already configured
   - Recommendation: User handles DNS configuration; planner documents the required records (CNAME to cname.vercel-dns.com or A record to 76.76.21.21)

2. **Twitter-image separate file or re-export**
   - What we know: Next.js supports separate `twitter-image.tsx` or auto-uses `opengraph-image.tsx` for Twitter too when twitter-image is absent
   - What's unclear: Whether the same image dimensions work well for both (1200x630 is standard for both)
   - Recommendation: Create only `opengraph-image.tsx` -- Next.js will use it for both OG and Twitter when no separate twitter-image exists. The 1200x630 size is standard for `summary_large_image`.

3. **Vercel free tier limits**
   - What we know: Vercel Hobby (free) tier supports custom domains, HTTPS, and is sufficient for a portfolio site
   - What's unclear: Whether the user already has a Vercel account
   - Recommendation: Hobby tier is fine; if user has Pro, even better. No cost concerns for a static portfolio.

## Sources

### Primary (HIGH confidence)
- [Next.js opengraph-image docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) - ImageResponse API, file conventions, config exports (v16.1.6 docs, current)
- [Next.js generateMetadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Metadata fields, openGraph, twitter, metadataBase, alternates (v16.1.6 docs, current)
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) - Recommended script tag pattern for structured data (v16.1.6 docs, current)
- [Next.js sitemap.xml docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - MetadataRoute.Sitemap type and file convention (v16.1.6 docs, current)
- [Next.js robots.txt docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - MetadataRoute.Robots type and file convention (v16.1.6 docs, current)

### Secondary (MEDIUM confidence)
- [Satori GitHub repository](https://github.com/vercel/satori) - CSS support limitations (flexbox only, no Grid, no WOFF2)
- [Vercel deployment docs](https://vercel.com/docs/frameworks/full-stack/nextjs) - Custom domain setup, automatic HTTPS

### Tertiary (LOW confidence)
- Google Fonts TTF URLs - Direct CDN links may change; verify at build time

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All built-in Next.js features, verified against current official docs
- Architecture: HIGH - File conventions and patterns directly from Next.js documentation
- Pitfalls: HIGH - Satori limitations well-documented; metadata merging behavior verified in docs
- Deployment: MEDIUM - Vercel process is straightforward but domain DNS specifics depend on user's registrar

**Research date:** 2026-03-08
**Valid until:** 2026-04-08 (stable -- all patterns use built-in Next.js features)
