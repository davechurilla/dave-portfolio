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

## Project status & decisions
- Owner: Dave Churilla, senior front-end/full-stack dev. Site's purpose: show
  experience and skills to employers/clients via written case studies.
- Replaces the outdated site at portfolio.davechurilla.com. Do not publish the
  home address or phone number; use a contact form or email instead.
- Featured work is mostly NDA (Pennymac) or sunset agency campaigns (RAPP etc.),
  so no live URLs. Case studies are narrative + screenshots. Projects use a
  `confidential` flag instead of requiring links.
- Scaffolded with create-next-app (App Router, TypeScript, Tailwind) and npm.
  Sanity added via `sanity init` with next-sanity; Studio embedded at /studio.
- Cache Components is enabled in next.config. Do NOT use `dynamic`, `revalidate`,
  or `fetchCache` route segment configs (they cause build errors).
- Schemas in place: siteSettings, project, technology, experience.
- Sanity MCP server is configured (re-authorize via /mcp if it expires).

## Next steps
1. Make siteSettings a singleton in the Studio structure.
2. Add placeholder content (technologies + one real project).
3. Set up data layer: Sanity client, GROQ via defineQuery, TypeGen types.
   Check current next-sanity guidance for Cache Components before choosing a
   caching/revalidation approach.
4. Build home, project index, project detail, about, contact.
5. Images via Sanity pipeline + next/image; SEO metadata; deploy to Vercel with
   a Sanity webhook for revalidation.