# Portfolio — João Victor Macedo Neves

Personal portfolio built with **Next.js 15**, **TypeScript**, and **CSS custom properties** — no UI libraries, no component frameworks, no shortcuts.

**Live:** [portfolio-joaodddev.vercel.app](https://portfolio-joaodddev.vercel.app)

---

## Stack

- **Next.js 15** — App Router, Server Components
- **TypeScript** — strict mode
- **CSS** — vanilla, custom properties, no Tailwind
- **Vercel** — CI/CD on every push to `main`

## Architecture decisions

**Server Components by default.** `page.tsx` reads `projects.ts` at build time and passes data down as props — no client-side fetching, no loading states, no useEffect.

**Client Component only where needed.** `ProjectsSection.tsx` is the only `'use client'` component, isolated to where interactivity (filter state) actually lives.

**Single source of truth for content.** All projects live in `src/data/projects.ts`. Adding a project means editing one file and pushing — Vercel rebuilds in ~30s.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # root layout, metadata, Inter font
│   ├── page.tsx            # home page (Server Component)
│   └── globals.css         # all styles — one file, no modules
├── components/
│   ├── Hero.tsx            # name, stack pills, social icons
│   ├── ProjectsSection.tsx # filter state (Client Component)
│   └── ProjectCard.tsx     # individual project card
└── data/
    └── projects.ts         # ← only file you edit to add projects
```