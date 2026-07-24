# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page car rental catalog site. There is no backend and no database by
design — it's a small, static listing of cars with buttons to contact the owner
directly (call, WhatsApp, Telegram, Instagram) to arrange a rental. Keep it this
simple; don't introduce a server, API, or database unless the user explicitly
asks for one.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server with HMR
npm run build    # type-check (tsc -b) then build static output to dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

There is no test suite. There is no single-test command since there are no tests.

## Architecture

- **Data-driven, no backend**: car listings live in `src/data/cars.json`,
  typed by the `Car` interface in `src/types.ts`. Adding/editing cars means
  editing that JSON file directly — there is no admin UI or CMS.
- **Contact config**: the owner's phone/WhatsApp/Telegram/Instagram handles
  live in `src/data/contact.ts` (typed by `ContactInfo` in `src/types.ts`).
  This is the one file a deployer must fill in with real values before
  deploying — it ships with placeholder values.
- **Car photos**: served from `public/cars/` and referenced from `cars.json`
  as root-relative paths (e.g. `/cars/camry.jpg`), not imported as JS modules.
  This lets the JSON stay data-only. A placeholder SVG covers any car without
  a real photo yet.
- **Component flow**: `App.tsx` owns search/filter state (text query +
  category dropdown) and renders `SearchBar` + a grid of `CarCard`.
  `CarCard` renders one listing and embeds `ContactButtons`, which builds the
  `tel:`, `wa.me`, `t.me`, and `instagram.com` links from `contact.ts` (the
  WhatsApp link also pre-fills a message naming the specific car).
- **Styling**: plain CSS (no Tailwind/CSS-in-JS). `src/index.css` holds
  global theme variables (light/dark via `prefers-color-scheme`) inherited
  from the Vite template; `src/App.css` holds the catalog/card/contact-button
  layout. Reuse the existing CSS custom properties (`--bg`, `--text`,
  `--border`, `--accent`, etc.) rather than hardcoding new colors.
- **Build tool**: Vite + React + TypeScript (`react-ts` template). Linting
  is `oxlint` (config in `.oxlintrc.json`), not ESLint.

## Deployment

Static build only (`dist/`) — deployable to Render.com (a `render.yaml`
blueprint is included: build `npm install && npm run build`, publish `dist`),
or equally to Vercel/Netlify/GitHub Pages with the same build command and
output directory. There's no server-side routing or API to configure.
