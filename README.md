# Rent a Car

A single-page car rental catalog. No backend, no database — car listings live in a
JSON file and customers reach out directly via call, WhatsApp, Telegram, or Instagram.

## Setup

```bash
npm install
npm run dev
```

## Editing car listings

Edit `src/data/cars.json`. Each entry follows the `Car` type in `src/types.ts`:
name, year, category, transmission, price, currency, image path, and description.

Car photos go in `public/cars/` — reference them from the JSON as `/cars/<filename>`.
A placeholder image is used until real photos are added.

## Editing contact info

Edit `src/data/contact.ts` with the owner's real phone number, WhatsApp number,
Telegram username, and Instagram username before deploying.

## Build

```bash
npm run build   # outputs static files to dist/
npm run preview # preview the production build locally
```

## Deploy (Render.com)

This repo includes a `render.yaml` for Render's Blueprint deploys (static site,
build command `npm install && npm run build`, publish directory `dist`). Push to
a git repo, connect it on Render, and it will pick up the blueprint automatically.
Any other static host (Vercel, Netlify, GitHub Pages) works too — just point the
build command at `npm run build` and the publish directory at `dist`.
