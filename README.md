Personal site for Rahul Rao. [Next.js](https://nextjs.org) App Router, Tailwind v4, deployed on Vercel.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Interactive explore canvas — a search box that maps a described role onto matching background |
| `/#classic` | The classic scrolling page, underneath the canvas |
| `/recruiter` | One-page recruiter summary. `?role=quant` / `?role=swe` pins the pitch |
| `/r/<tag>` | Same as `/recruiter`, for per-application tracking links (below) |

## Per-application tracking links

Send `/r/janestreet` rather than `/recruiter` when applying, and Vercel Web
Analytics will show that exact path in its Pages panel — so you can tell which
application actually got opened.

Paths are used rather than `?utm_source=` because **UTM parameters require the
Web Analytics Plus add-on** (Pro + $10/mo), while path reporting works on the
free Hobby plan. Tags must match `[a-z0-9][a-z0-9-]{0,31}`; anything else 404s
so stray URLs don't create junk analytics rows. The tag is never displayed —
visitors see exactly the same page as `/recruiter`.

Other Hobby-plan limits worth remembering: 50,000 events/month, a 1-month
reporting window, and no custom events.

## Environment

The natural-language search (`/api/match`) and per-node Q&A (`/api/ask`) need
`GEMINI_API_KEY` — see `.env.example`. Without it the rest of the site works
normally and the search returns a "not configured" message.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
