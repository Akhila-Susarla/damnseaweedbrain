# Phase 4: Polish & Launch - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

The site meets performance budgets, has proper SEO/social sharing metadata, and is deployed to production on the damnseaweedbrain.com domain. This phase covers: OG image generation, meta tags, structured data, sitemap/robots, Lighthouse-driven performance fixes, and production deployment. No new features or content changes.

</domain>

<decisions>
## Implementation Decisions

### OG Image
- Built with Next.js ImageResponse (next/og) — generated at build time, not a static file
- One site-wide OG image (single-page portfolio, no per-section variants)
- Text: "Akhila Susarla" prominently + a short BSD-flavored tagline (e.g., "Data Scientist | Armed Detective Agency")
- Design: Claude's discretion — BSD noir aesthetic with the established color palette (midnight, gold, parchment)

### SEO & Meta Tags
- Meta description: professional tone with subtle BSD flavor — emphasize "Data Scientist" keywords while hinting at the immersive experience
- Primary keyword positioning: "Data Scientist" (not ML Engineer)
- JSON-LD structured data: Person schema (name, role, social links) + WebSite schema for rich Google snippets
- Generate sitemap.xml and robots.txt via Next.js built-in support (sitemap.ts, robots.ts)
- Canonical URL: damnseaweedbrain.com
- Open Graph tags: title, description, image, type (website), URL
- Twitter Card: summary_large_image

### Performance
- Lighthouse audit targeting Performance + SEO categories — fix anything below 90 score
- Focus on Core Web Vitals: LCP, CLS, FID/INP
- No analytics — skip third-party tracking scripts entirely
- Verify 1.5MB initial load budget is met (currently 228kB JS — well under)
- Review and fix any render-blocking resources, layout shifts, or LCP issues found by Lighthouse

### Deployment
- User did not discuss deployment platform — defer to planning phase to determine best approach
- Target domain: damnseaweedbrain.com

### Claude's Discretion
- OG image visual design (layout, graphical elements, exact tagline wording)
- Exact meta description copy
- JSON-LD schema field values beyond name/role/social links
- Specific Lighthouse fixes (depends on audit results)
- Deployment platform choice and configuration
- Any additional performance optimizations beyond Lighthouse findings

</decisions>

<specifics>
## Specific Ideas

- OG image should work well on LinkedIn (primary sharing platform for a portfolio) — professional enough for recruiter feeds
- "Data Scientist" keyword emphasis aligns with Akhila's current job search positioning
- BSD flavor in meta should intrigue without confusing people who don't know the anime

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `layout.tsx`: Already has Metadata export — extend with full OG/Twitter meta
- `next.config.ts`: Image optimization configured (WebP/AVIF, device sizes)
- Theme tokens in `globals.css`: midnight (#0a0e1a), gold (#c9a84c), parchment (#e8e0d4) — use in OG image
- Fonts registered: Playfair Display, Inter, JetBrains Mono, Caveat — available for OG image via next/og
- `src/data/social.ts`: Social links data for JSON-LD Person schema

### Established Patterns
- Next.js 15 App Router conventions (metadata export, file-based routing)
- Tailwind v4 CSS-first @theme pattern
- All content in static TypeScript data files (src/data/)
- next/font/google for font loading with display: swap

### Integration Points
- `src/app/layout.tsx`: Metadata export for OG/meta tags
- `src/app/opengraph-image.tsx`: Next.js convention for OG image generation
- `src/app/sitemap.ts` and `src/app/robots.ts`: Next.js convention for SEO files
- Build output verified at 228kB — baseline for performance comparison

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-polish-launch*
*Context gathered: 2026-03-08*
