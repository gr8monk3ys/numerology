# Shareable Readings & SEO Pack — Design

**Date:** 2026-07-11
**Status:** Approved pending review
**Scope:** Five improvements agreed in review: (1) shareable reading URLs with dynamic OG cards, (2) SEO foundation, (3) per-angel-number pages, (4) hydration-error fix, (5) sticky section nav on the reading page.

## Goals

- A cast reading survives refresh and can be sent to another person as a URL.
- A shared reading link unfurls on social/chat as a personalized gold-on-black card ("Nataly · Life Path 8 · The Powerhouse").
- Search engines can discover and index every content page, each with correct canonical URLs, titles, h1s, and structured data.
- Every high-volume angel-number query ("1111 meaning") has a dedicated URL.
- Zero console errors on page load.

## Non-goals (explicitly out of scope)

- URL state for compatibility and forecast calculators (future).
- Life-path landing pages (`/life-path/8`) (future).
- Email capture, PDF export, analytics.

## Architecture decisions

**D1 — Canonical URL is env-derived.** New `lib/site.ts` exports `SITE_URL`: `NEXT_PUBLIC_SITE_URL` → `https://` + `VERCEL_PROJECT_PRODUCTION_URL` → fallback `https://numerology.vercel.app`. Used by `metadataBase`, sitemap, robots, and JSON-LD.

**D2 — Reading state lives in readable query params** (approved Option B): `/reading?name=Ada+Augusta+Byron&dob=1815-12-10&y=1` (`y=1` present only when "Y as vowel" is on). Rationale: human-readable, debuggable, server-visible so `generateMetadata` can personalize the OG card. `/reading` therefore becomes dynamically rendered; all other pages stay static.

**D3 — Privacy copy stays honest.** Casting remains 100% client-side. The reading page's privacy line gains: sharing a link puts the name and birth date in the URL so the recipient's reading can be recreated.

## Components

### 1. Shareable readings

- **`lib/share.ts`** (new, pure, unit-tested): `parseReadingParams(searchParams) → {name, birth, yAsVowel} | null` (strict validation: non-empty name after normalization, valid calendar date, year 1200–current) and `buildReadingQuery(state) → string`.
- **`app/reading/page.tsx`**: async server component; reads `searchParams`, passes parsed initial state to the client island. `generateMetadata` — when params are valid, computes the Life Path server-side (reusing `lib/numerology`) and returns personalized title/description plus `og:image` pointing at the OG route; otherwise returns current static metadata.
- **`components/reading/ReadingForm.tsx`**: accepts `initialState`; auto-casts on mount when provided. On every cast, `router.replace` syncs the URL (no scroll reset).
- **Share button** in `ReadingResults` header: copies the canonical share URL (`SITE_URL` + query) to the clipboard with a brief "Copied" state; uses `navigator.share` when available (mobile).

### 2. Dynamic OG cards

- **`app/api/og/reading/route.tsx`**: `ImageResponse` (1200×630). Void-black background, inner gilt rule (matching `.glass-strong`), gold orb with the Life Path number, the person's first name, the Life Path title from `meanings_lifepath.json`, "Numen" wordmark. Invalid/missing params → generic branded card (no error).
- **`app/opengraph-image.tsx`**: static build-time branded card used by every other page.
- Fonts: Grenze Gotisch + EB Garamond TTF subsets committed under `assets/fonts/`, loaded via `fetch(new URL(..., import.meta.url))` — no runtime dependency on Google Fonts.

### 3. Per-angel-number pages

- **`app/angel-numbers/[sequence]/page.tsx`**: `generateStaticParams` from `angel_numbers.json` (~24 pages). Unknown sequence → `notFound()` (the index decoder still handles arbitrary sequences client-side). Content: hero (sequence, title), meaning, Love/Career/Spiritual panels, computed root number linking to `/numbers/[root]`, detected pattern chips, "related sequences" (same root, max 4), CTA to `/reading`. Metadata: `"111 Angel Number Meaning · Manifestation Gateway"` + excerpt description. JSON-LD: `Article` + `BreadcrumbList`.
- **`app/angel-numbers/page.tsx`**: library cards become links to the detail pages; the decoder's exact-match result links to the detail page.

### 4. SEO foundation

- `metadataBase: new URL(SITE_URL)` in `app/layout.tsx`; add `twitter: { card: "summary_large_image" }`.
- **`app/icon.svg`**: gold ✦ mark on `#0a0705`.
- **`app/sitemap.ts`**: static routes + 12 number pages + all angel sequences.
- **`app/robots.ts`**: allow all, point at sitemap.
- **h1s**: `SectionHeading` gains `as?: "h1" | "h2"` (default `"h2"`); each page's hero heading uses `as="h1"`. The reading-results title demotes to `h2` so the page keeps a single h1.
- **JSON-LD**: `WebSite` in the root layout.

### 5. Fixes & housekeeping

- `suppressHydrationWarning` on `<html>` (the `reveal-ready` inline script mutates the class pre-hydration by design).
- `outputFileTracingRoot: import.meta.dirname` in `next.config.mjs` to stop the multi-lockfile workspace-root warning.

### 6. Sticky section nav (reading page)

- **`components/reading/SectionNav.tsx`** (client): renders after results; sticky below the navbar (`top-16`), horizontally scrollable chip row (`thin-scrollbar`), gilt manuscript styling. `IntersectionObserver` highlights the section in view; chips smooth-scroll to anchors.
- Each `Panel` in `ReadingResults` gets a stable `id` (core, karmic, letters, chaldean, correspondences, tarot, stars, planes, cycles, bridges, fortunate, forecast).

## Error handling

- `parseReadingParams` returns `null` on any invalid input → page renders the empty form, metadata falls back to static; no crash on garbage URLs.
- OG route never 500s for bad input — falls back to the generic card.
- Angel `[sequence]` 404s for unknown sequences.

## Testing

- Unit (vitest): `lib/share.ts` round-trip + rejection cases (garbage date, empty name, future year, `y` flag).
- Existing 53 numerology tests must stay green.
- Manual/e2e: production build passes; curl smoke-test all routes incl. two angel pages and sitemap/robots; Playwright: cast reading → URL updates → reload recreates reading → copy-link works; fetch OG route and eyeball the PNG; console clean (no hydration error, no favicon 404).
