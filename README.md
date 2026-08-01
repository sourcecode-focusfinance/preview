# FOCUS Finance — job link previews

A small Next.js app that turns FOCUS Finance's open job postings into pages with
proper share previews (Open Graph / Twitter cards) — so a link to a posting
unfurls nicely in Slack, WhatsApp, LinkedIn, iMessage, etc.

## How it works

- Job data is fetched at **build time** from `hr.focusfinance.bi/graphql`
  (`lib/jobPostings.ts`), which is a public, unauthenticated query for
  `jobPostings(status: OPEN)`.
- Each posting gets a static route at `/jobs/[slug]` (slug derived from the
  job title), with its own metadata (`generateMetadata`) and its own preview
  image (`opengraph-image.tsx`, using Next's built-in file convention —
  Next wires up the `og:image`/`twitter:image` meta tags automatically).
- `/` lists all currently open postings and links to each one.
- `generateStaticParams` in both the page and the image route means every
  posting is pre-rendered at `next build` — nothing is generated per-request.

Because everything is statically generated at build time, a newly opened or
closed posting on the HR side won't show up here until the app is rebuilt
and redeployed.

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://focusfinance.bi`) in the deploy
environment so absolute URLs (like the logo used inside the generated OG
images, and `metadataBase`) resolve correctly in production.
