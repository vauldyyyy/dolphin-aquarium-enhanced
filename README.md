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
| **The heart of Dolphin** | Short emotional band leading into the visit section |
| **More Than Pets (visit)** | Location card with map, visit cards, live open/closed badge, feature strip |

Plus dedicated routes: `/shop`, `/care-guides`, `/contact`.

## The 100000x enhancement pass

On top of the scrollytelling core:

- **Shop, rebuilt** — 16 AI-generated product photos (deep-teal studio
  style, ~110 KB each) across four collections, animated category filter
  chips, and per-product **Enquire on WhatsApp** buttons that pre-fill the
  message with the product and price. Product names/prices remain
  indicative — confirm against live stock before launch.
- **Companion quiz** — the gallery's *Find my companion* button opens a
  4-question matcher (`components/CompanionQuiz.jsx`) that scores lifestyle
  against fish / bird / dog / cat / small pet and hands off to a pre-filled
  WhatsApp chat.
- **Immersion layer** (`components/Immersion.jsx`) — a bubble cursor trail
  over the two cinematic chapters (fine-pointer desktops only, disabled
  under `prefers-reduced-motion`) and a fully synthesized WebAudio ocean
  ambience with an off-by-default toggle — no audio assets to ship.
- **Trust & SEO** — `PetStore` JSON-LD (hours, address, phone, socials),
  full OpenGraph/Twitter cards, canonical URLs, per-route metadata,
  `sitemap.xml`, `robots.txt`, and a branded 404.
- **Contact form** — WhatsApp-first delivery with client-side validation
  and a success state; email remains as a fallback mention.
- **Reviews** — nine real Google reviews with corrected attribution (the
  dachshund/Parvo story belongs to Lionel Hillery Antao).
- **Security** — Next.js bumped to 14.2.35 (14.2.18 has a known CVE).

Note: the JSON-LD omits geo coordinates on purpose — confirm the exact
Google Maps pin before adding them.

## "More Than Pets" visit section

A full-width section near the end of the homepage (after "The heart of
Dolphin"), built from the supplied design concept — **not** the page hero; the
arowana story still opens the page.

- `components/VisitWorld.jsx` — "EST. EXCELLENCE" headline block, *Explore Our
  World* / *Watch Our Story* (scrolls to the story), handwritten "Inspiring a
  kinder brighter world", the **Our Location** card with the embedded Google Map
  (lazy-loaded), the three visit cards with a live **Open now / Closed now**
  badge (Goa time), and the feature strip with the "Goa" signature.
- Living backdrop: dolphin-and-child aquarium artwork with slow drift and pointer
  parallax, light rays, swaying coral and leaves, glowing wave lines that draw in,
  and a canvas ocean (bubbles, fish, caustics, click ripples) from
  `components/useOcean.js`.
- `app/sections.css` — styles for this section and the Heart band. Layout was
  measured against the concept at 1600×900 and matched to within a few pixels.
- `components/HeartSection.jsx`, `components/WhatsAppFloat.jsx`,
  `components/Icon.jsx` — supporting pieces from the supplied package.
- `lib/business.js` — **single source of truth** for phone, WhatsApp, address,
  map query and opening hours. Edit here.

Before launch:

- Phone, address and hours were transcribed from a screenshot — confirm them, and
  confirm the number is WhatsApp-enabled.
- The open/closed badge uses regular hours only; it doesn't know about holidays.
- Check the Google Maps pin that the map query resolves to.
- The dolphin-and-child scene is imaginative branding artwork, not a photo of the
  actual store.

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
