# Dave Churilla Portfolio

Case-study portfolio for a senior web developer. Next.js (App Router, Cache Components),
React, TypeScript, Tailwind CSS v4, and Sanity CMS with the Studio embedded at `/studio`.
See [CLAUDE.md](CLAUDE.md) for conventions and project decisions.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # site at http://localhost:3000, Studio at /studio
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Sanity project |
| `SANITY_API_TOKEN` | Server token for `defineLive` |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` | Contact form delivery (Resend) |
| `CONTACT_FROM_EMAIL` | Optional sender; defaults to Resend's test sender |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata and sitemap |

## Scripts

- `npm run dev` / `build` / `start` / `lint`
- `npm run typegen`: extract the schema and regenerate `sanity.types.ts` (run after schema or query changes)
