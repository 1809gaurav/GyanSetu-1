# Gyaansetu

The public marketing site for **Gyaansetu**, an accessibility-first learning layer for Indian
students. A single, scroll-driven page built around one idea: *Knowledge should reach everyone.*

The site pairs a custom 3D MacBook hero and a WebGPU shard field with straightforward,
content-first sections. Every outbound destination is configurable. Until a real URL is supplied,
the UI shows an honest disabled “Soon” state — there are no `href="#"` links and no invented
destinations.

- Repository: <https://github.com/Sakshamxx/GyanSetu>
- Deployment target: Vercel (static Vite build)

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 3.4, custom tokens, shadcn-style primitives |
| Motion | Framer Motion, GSAP, Lenis |
| 3D | three.js (vanilla renderer, lazy-loaded) |
| Background | React Bits AeroShards (WebGPU via `vgpu`) |
| Icons | Lucide + custom brand SVGs |
| Tests | Vitest + Playwright QA harness |

## Sections

`Hero → About → App → Extension → Contact → Footer`

The floating dock and the header both link to five section anchors. There is no client-side router;
the whole experience is one classic page.

The hero renders a 3D MacBook with the supplied brand mark on screen. The About page only renders a
team grid when real members are present in `src/siteConfig.ts`. Contact is a mailto/socials block —
there is no form and no backend.

## Getting started

Requirements: **Node.js 22.12+** and npm.

```bash
npm ci
npm run dev
```

The dev server prints its local URL (by default, <http://localhost:5173>).

### Production build

```bash
npm run build
npm run preview
```

`npm run build` type-checks the project and writes the static bundle to `dist/`.

## Configuration

Copy the example file and fill in whatever exists today:

```bash
cp .env.example .env.local
```

All variables are optional. An empty or malformed destination is treated as “not ready” and renders
a disabled control, so the site is safe to deploy before the app and store listings are live.

| Variable | Used for |
| --- | --- |
| `VITE_APP_URL` | Hosted web app / sign-up |
| `VITE_EXTENSION_URL` | Extension store listing or download page |
| `VITE_PRIVACY_URL` | Privacy policy |
| `VITE_CONTACT_EMAIL` | Contact email (renders a `mailto:`) |
| `VITE_CONTACT_URL` | Contact page, if you prefer a link over email |
| `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_INSTAGRAM_URL`, `VITE_YOUTUBE_URL`, `VITE_X_URL` | Social profiles |
| `VITE_HACKATHON_NAME` | Optional “Built for …” badge in About |

Rules:

- Destinations must be absolute `https://` URLs. `http://localhost` is accepted in development.
- `VITE_CONTACT_EMAIL` must be a valid email address.
- Leave a value blank to keep the disabled “Link coming soon” state.

Validate every configured destination:

```bash
npm run check-links
```

### Adding team members

Add real entries to the `team` array in `src/siteConfig.ts`:

```ts
export const team: TeamMember[] = [
  { name: "Full Name", role: "Product & accessibility", link: "https://…" },
];
```

The About team panel is hidden while the array is empty. When entries exist it appears
automatically. Never publish placeholder names or links.

### Brand assets and the 3D model

- `public/Gyansetu.png` — supplied logo, used in the header, footer and screen texture.
- `public/models/mac-noUv.glb` — MacBook geometry, loaded lazily by `src/components/MacBook.tsx`.
- `public/404.html` — static not-found page for direct visits to unknown paths.

## Accessibility

- Skip link focuses `<main>`; section navigation moves focus to the section heading.
- Full keyboard path through the header, dock, content links and footer.
- A footer switch overrides motion preference for the session and persists in `localStorage`.
  `prefers-reduced-motion` is respected by default; reduced mode disables Lenis, the shard field,
  the 3D intro, the magnetic buttons and the cursor companion.
- Decorative canvases and mock UI are hidden from assistive technology and have text alternatives.
- Colour tokens are tested for contrast; the current build passes `axe-core` WCAG 2.1 A/AA checks at
  320, 390, 768 and 1440 widths with zero violations.
- Placeholder destinations use disabled semantics, not fake links.

## Performance notes

- The MacBook (`three`, `gsap`) and AeroShards (`vgpu`) are lazy-loaded after first paint.
- A painted gradient is always underneath the WebGPU field, so unsupported browsers still get the
  intended atmosphere. On WebGL failure the hero shows a labelled fallback instead of an empty box.
- The 3D canvas pauses when off-screen or when the tab is hidden.
- `vgpu` is deliberately pinned to **0.3.1**. Version 0.6 rejects the vendored raw WGSL shader and
  breaks AeroShards; test thoroughly before changing it.
- Vite output is split into `motion`, `three`, `vgpu`, `gsap` and `lenis` chunks.

## Scripts

```bash
npm run dev          # local development
npm run build        # type-check + production bundle
npm run preview      # serve the production bundle
npm run typecheck    # TypeScript only
npm test             # unit tests (links, contrast)
npm run test:watch   # watch mode
npm run qa           # Playwright screenshots at desktop + mobile (see below)
npm run check-links  # verify configured destinations
```

The Playwright QA harness writes screenshots to `.qa/` (git-ignored). It expects a running dev
server at `http://127.0.0.1:5173`. Install a browser first if needed:

```bash
npx playwright install chromium
npm run dev
npm run qa
```

Set `CHROMIUM_PATH` to use a specific Chromium build.

## Deploying on Vercel

1. In Vercel, choose **Add New → Project** and import
   [`Sakshamxx/GyanSetu`](https://github.com/Sakshamxx/GyanSetu).
2. Vercel detects Vite. The checked-in `vercel.json` sets:
   - build command `npm run build`
   - output directory `dist`
   - security headers (CSP, frame denial, nosniff, referrer policy, permissions policy)
   - immutable caching for hashed `/assets/*`
3. Add the `VITE_*` environment variables from `.env.example` in **Project Settings → Environment
   Variables** for Production (and Preview, if desired). Values can be added after the first deploy;
   trigger a redeploy to apply them.
4. Deploy. Because this is a single page using hash anchors, no SPA rewrites are needed. Unknown
   paths get the branded `404.html`.

The production bundle was also exercised behind the same CSP used in `vercel.json` with no console or
CSP errors, including the WebGPU shard field and the lazy three.js scene.

## Project structure

```
public/                 logo, 3D model, 404, robots.txt
scripts/                link checker, Playwright QA
src/
  components/           header, dock, footer, MacBook, AeroShards, UI primitives
  hooks/                smooth scroll, active section, reduced motion
  sections/             Hero, About, AppShowcase, Extension, Contact
  lib/                  link readiness rules, utilities
  siteConfig.ts         single source of truth for links and product facts
  index.css             design tokens and utilities
vercel.json             build, output and security headers
```

## Brand note

Gyaansetu is an independent accessibility project and is not affiliated with Physics Wallah,
Unacademy or YouTube. Product names are used only to describe where the extension works.
