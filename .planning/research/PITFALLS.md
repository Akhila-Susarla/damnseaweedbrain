# Pitfalls Research: BSD-Themed Interactive Portfolio

## Critical Pitfalls

### 1. Copyright / Legal Issues with Anime Assets

**Risk: HIGH** | **Phase: 1 (Asset Pipeline)**

**The problem:** Extracting and hosting Bungou Stray Dogs game assets (sprites, backgrounds, music) from official games is copyright infringement. Kadokawa and licensees actively enforce Japanese IP.

**Warning signs:**
- Using ripped game sprites directly
- Hosting official artwork without license
- Distributing modified game assets

**Prevention strategy:**
- Use original art inspired by BSD aesthetic (not copied)
- Commission fan artists or use artist-permitted fan art (with credit)
- Create original character illustrations in BSD style for the portfolio
- Use CSS/SVG to recreate aesthetic elements (bandage textures, noir lighting, paper effects) rather than using copyrighted source material
- BSD-themed UI (case files, dossiers, stamps) is a design pattern, not copyrighted — safe to build custom versions
- Dazai quotes from the anime can be used sparingly as fair use in a non-commercial portfolio

**Bottom line:** The BSD *aesthetic and design language* is free to use. The actual *art assets* from games/anime are not. Build custom visuals inspired by BSD, don't rip from games.

### 2. Over-Theming That Kills Usability

**Risk: HIGH** | **Phase: 2-3 (Scenes + BSD Layer)**

**The problem:** If a recruiter can't find skills/projects within 10 seconds, the theme is hurting the portfolio's purpose. Theme must enhance, never gate content.

**Warning signs:**
- Mandatory VN dialogue before seeing portfolio content
- Navigation hidden behind thematic metaphors
- Important info buried in "immersive" interactions
- Recruiter has to "play" to see your resume

**Prevention strategy:**
- Always provide a skip/fast-forward for VN dialogues
- Navigation panel visible at all times (BSD-styled but clear)
- Every section directly accessible — no content behind interactions
- "No Longer Human" Easter egg: strip all theme → plain resume (solves this elegantly)
- Test with the "5-second rule": can someone find your skills in 5 seconds?

### 3. Performance Death by a Thousand Assets

**Risk: HIGH** | **Phase: 1, 4 (Foundation + Polish)**

**The problem:** Anime-themed sites accumulate large PNGs, parallax layers, custom fonts, and scroll animations that combine to tank Core Web Vitals. A portfolio that takes 8 seconds to load won't get seen.

**Warning signs:**
- Initial page load > 3MB
- LCP > 2.5 seconds
- Multiple unoptimized PNG/JPG images
- Custom fonts loaded synchronously
- All GSAP animations initialized on page load

**Prevention strategy:**
- Hard performance budget: **1.5MB initial load, 3MB total**
- Use WebP/AVIF via next/image (40-60% smaller than PNG)
- Lazy load everything below the fold (Intersection Observer)
- Subset custom fonts (WOFF2, only glyphs used)
- Initialize GSAP ScrollTrigger per-section, not globally
- Preload only critical above-fold assets
- Use CSS animations for simple effects (cheaper than JS)

### 4. Animation Jank on Mid-Range Devices

**Risk: MEDIUM** | **Phase: 2-3 (Animations)**

**The problem:** Smooth animations on a MacBook Pro stutter on a 3-year-old Android phone or budget laptop. Parallax + scroll animations + sprite animation = dropped frames.

**Warning signs:**
- Animating `width`, `height`, `top`, `left` (triggers layout)
- Animating `background-color`, `box-shadow` (triggers paint)
- Too many elements in ScrollTrigger
- No `will-change` or `transform: translateZ(0)` hints

**Prevention strategy:**
- **Only animate `transform` and `opacity`** — these are GPU-composited
- Use `will-change: transform` sparingly on animated elements
- Reduce animation complexity on mobile (CSS media query or JS detection)
- Test on Chrome DevTools with 4x CPU throttling
- Limit simultaneous GSAP tweens to <10 per viewport
- Use `requestAnimationFrame` awareness — pause off-screen animations

### 5. Mobile Responsiveness as Afterthought

**Risk: HIGH** | **Phase: 2 (Scenes)**

**The problem:** Visual novel dialogues, RPG cards, parallax layers, and wide case file layouts all break on mobile unless designed for it from the start.

**Warning signs:**
- Desktop-first layouts with no mobile consideration until "polish" phase
- Horizontal scrolling on mobile
- Touch targets smaller than 44x44px
- VN dialogue boxes overlapping on small screens

**Prevention strategy:**
- Design mobile layout alongside desktop from Phase 2
- Simplify parallax to single-layer on mobile
- Stack ability cards vertically on mobile
- VN dialogue box: full-width bottom sheet on mobile
- Case files: card stack instead of folder layout on mobile
- Test at 375px width (iPhone SE) throughout development

### 6. Accessibility Neglect in Dark Themed Sites

**Risk: MEDIUM** | **Phase: 1 (Theme System)**

**The problem:** Dark themes with anime-inspired colors often fail WCAG AA contrast ratios. Gold-on-dark, red-on-dark, and muted text colors are common offenders.

**Warning signs:**
- Text contrast ratio < 4.5:1 (body) or < 3:1 (large text)
- No keyboard navigation for interactive elements
- Animations with no `prefers-reduced-motion` respect
- No alt text on decorative images

**Prevention strategy:**
- Validate all color combinations against WCAG AA during theme setup
- `@media (prefers-reduced-motion: reduce)` — disable parallax, reduce animations
- All interactive elements keyboard-focusable with visible focus styles
- Decorative images: `aria-hidden="true"`, `role="presentation"`
- Screen reader text for ability cards (not just visual power meters)

### 7. SEO Black Hole

**Risk: MEDIUM** | **Phase: 4 (Polish)**

**The problem:** Single-page JS-heavy sites with animation-gated content are invisible to search engines. A portfolio needs to be discoverable.

**Warning signs:**
- All content rendered client-side only
- No semantic HTML (`div` soup)
- Missing meta tags, OG images
- No `<h1>` or structured content hierarchy

**Prevention strategy:**
- Next.js SSG — content is pre-rendered as HTML (solves most issues)
- Use semantic HTML: `<section>`, `<article>`, `<h1>`-`<h3>`, `<nav>`
- Proper meta tags and OG images (BSD-themed social preview)
- JSON-LD structured data for person/portfolio
- Ensure all text content is in the static HTML, not only in JS state

### 8. Scope Creep via "Cool BSD Features"

**Risk: MEDIUM** | **Phase: All**

**The problem:** BSD has so much cool source material that it's tempting to keep adding features (map navigation, ability activation effects, mini-games, dual themes). Each "small addition" adds days.

**Warning signs:**
- Adding Tier 2/3 features before Tier 1 is polished
- "Wouldn't it be cool if..." during implementation
- Spending time on Easter eggs before core sections work

**Prevention strategy:**
- Strict phase gates — Tier 1 features complete and polished before Tier 2
- Track all "cool ideas" in a backlog, never add mid-phase
- MVP is a complete portfolio that happens to be BSD-themed, not a BSD game that happens to show a resume

## Phase Mapping Summary

| Phase | Pitfalls to Address |
|-------|-------------------|
| Phase 1 (Foundation) | Asset strategy/legal (#1), Performance budget (#3), Theme accessibility (#6) |
| Phase 2 (Scenes) | Over-theming (#2), Mobile responsiveness (#5), Animation jank (#4) |
| Phase 3 (BSD Layer) | Over-theming (#2), Animation jank (#4), Scope creep (#8) |
| Phase 4 (Polish) | Performance optimization (#3), SEO (#7), Scope creep (#8) |

---
*Researched: 2026-03-06*
