# Dolphin Aquarium & Pets — Scrollytelling Site

A cinematic, Apple-style scrollytelling website for **Dolphin Aquarium & Pets**
(Madgaon, Goa — since 1992), built with **Next.js 14 (App Router)** and
**Framer Motion**.

Two pinned, full-screen canvas chapters play image sequences frame-by-frame as
you scroll, then the page flows into the real business content.

## Experience

| Section | What happens |
|---|---|
| **Chapter 1 — Aquatics** | 240-frame chili red arowana sequence in a seamless black void |
| **Interlude** | 12+ years · 100% certified provenance · 24/7 monitored systems |
| **Transition** | Dark → cream gradient band |
| **Chapter 2 — Companions** | 300-frame warm garden sequence (dogs, cats, birds) |
| **Services / Why Us / Founders / Reviews** | Real business content, editorial styling |
| **Finale** | WhatsApp + directions, address, hours, phone, socials |

Plus dedicated routes: `/shop`, `/care-guides`, `/contact`.

## How the animation works

All motion is driven by Framer Motion:

- **`useScroll({ target, offset })`** → per-chapter scroll progress (0 → 1)
- **`useSpring`** → smooths that progress into a buttery canvas playhead
- **`useMotionValueEvent`** → paints the matching frame to a `<canvas>` (cover-fit, DPR-aware)
- **`useTransform`** → maps scroll ranges to each story beat's opacity / Y / blur
- **`AnimatePresence`** → loader exit fade and the mobile menu
- **`whileInView` / `whileHover` / `whileTap`** → content reveals and interactions

Frames preload into memory (Chapter 1 first, Chapter 2 in the background) with a
nearest-loaded-frame fallback so playback never stalls.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build && npm start   # production
```

## Project structure

```
app/
  layout.js          fonts (Fraunces + Inter) + metadata
  page.js            home — both chapters + all content sections
  globals.css        design system (two palettes: void / cream)
  shop/ care-guides/ contact/
components/
  ScrollSequence.jsx scroll-linked canvas + Beat overlays
  Nav.jsx            glass nav, dark→light theme switch, mobile menu
  Reveal.jsx         whileInView reveal helper
  SiteFooter.jsx
  useImageSequence.js frame preloader
public/frames/
  aquatic/  240 frames (1080×720)
  garden/   300 frames (1280×720)
```

## Notes

- Aquatic frames were cropped from 1280×720 → 1080×720 to remove baked-in
  pillarbox bars and a corner watermark, so the footage sits truly full-bleed.
- The sequences total ~540 images; first load fetches Chapter 1 behind a
  progress loader. Consider WebP/AVIF conversion to cut weight further on mobile.
- Business details (address, hours, phone, WhatsApp, socials) are real and live
  in `app/page.js`, `components/SiteFooter.jsx` and `app/contact/page.js`.
