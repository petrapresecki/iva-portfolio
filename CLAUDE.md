# Iva Portfolio

Graphic designer portfolio — single-page static site.

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first config in `src/index.css`)
- **Animations**: GSAP (scroll/timelines) + Framer Motion (UI transitions) + Lenis (smooth scroll)
- **Deployment**: Netlify (auto-deploy from `main`)
- **Package manager**: pnpm

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (runs `tsc -b && vite build`)
- `pnpm preview` — preview production build

## Conventions

- Path alias: `@/` maps to `src/`
- GSAP plugins registered in `src/lib/gsap.ts` — always import gsap from there, not from `gsap` directly
- Lenis setup in `src/lib/lenis.ts` — initialized in App.tsx
- Design tokens (colors, fonts) in `@theme` block in `src/index.css`
- Project content data in `src/data/projects.ts`
- Videos go in `public/videos/`, fonts in `public/fonts/`

## Git Workflow

- GitHub Flow: `main` + short-lived feature branches
- Branch naming: `feature/`, `fix/`, `content/`, `media/`
- Conventional commits: `feat:`, `fix:`, `style:`, `content:`

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable components (Button, VideoPlayer, etc.)
│   ├── layout/       # Header, Footer, Navigation
│   └── sections/     # Hero, ProjectGrid, About, Contact
├── hooks/            # Custom React hooks
├── lib/              # gsap.ts, lenis.ts, utils
├── data/             # Static content data
├── assets/           # SVGs, small images (build-processed)
└── styles/           # Additional CSS
```
