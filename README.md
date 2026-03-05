# What If War Money Was Spent On Life?

An interactive single-page data visualization comparing global military budgets to what that money could fund instead — schools, hospitals, homes, clean water, vaccines, and trees.

Built with **Next.js 14 (App Router)** · Data from **SIPRI Yearbook 2024**

---

## Features

- **Spending Rank** — Bar chart of 8 nations by annual military expenditure + % of GDP cards
- **What Could Be Built** — Select any country and see how many schools, hospitals, homes, and more its budget could fund
- **Cost Per Citizen** — Per-capita breakdown with visual block representation

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router, edge runtime OG image
- [@vercel/og](https://vercel.com/docs/functions/og-image-generation) — Auto-generated 1200×630 Open Graph preview card
- Google Fonts — Playfair Display + Source Sans 3 (loaded at runtime)
- Pure inline styles — zero CSS frameworks

## Data Sources

| Country | Source |
|---|---|
| United States | SIPRI 2024 |
| China | SIPRI 2024 (estimate) |
| Russia | SIPRI 2024 (estimate) |
| India | SIPRI 2024 |
| Saudi Arabia | SIPRI 2024 |
| United Kingdom | SIPRI 2024 |
| Israel | SIPRI 2024 + US aid |
| Iran | SIPRI 2024 official (likely higher) |

Development costs are global averages used for illustrative purposes.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bedro95/war-cost-visualizer)

Or manually:

```bash
vercel --prod
```

---

Built by [Bader](https://x.com/itsabader) · [@itsabader](https://x.com/itsabader)
