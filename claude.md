# Portfolio site

Personal portfolio for a senior front-end/full-stack developer. Goal: showcase
experience and skills to employers and clients via written case studies.

## Stack
Next.js (App Router), React, TypeScript (strict), Tailwind CSS, Sanity CMS
(embedded Studio at /studio, next-sanity).

## Conventions
- Server Components by default; add "use client" only when needed.
- Style with Tailwind only. No inline styles, no CSS-in-JS.
- Fetch content with GROQ via defineQuery; use Sanity TypeGen for types.
- Prefer small, composable components in src/components.
- No `any`. Keep accessibility in mind (semantic HTML, alt text, focus states).
- Cache Components is enabled: don’t use dynamic, revalidate, or fetchCache route segment configs.

## Commands
- npm run dev: start dev server (site + /studio)
- npm run build / npm run lint

## Content notes
Most featured work is under NDA or sunset (no live URLs). Case studies are
written narratives with screenshots, so project pages must not assume a live
link or repo.