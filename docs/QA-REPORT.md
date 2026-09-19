# QA Report — Dolphin Aquarium & Pets redesign

Date: 19 Sep 2026 · Build: Next.js 14.2.35 · All checks run locally in
production mode unless noted.

## Build & routes

- `npm run build` — clean, all 10 routes prerender static (/, /shop,
  /care-guides, /contact, /sitemap.xml, /robots.txt, /icon.svg, 404).
- Dev-server smoke test: all routes HTTP 200; unknown route renders the
  branded 404.
- All 16 product images serve HTTP 200.

## Interaction tests (in-browser DOM verification)

| Flow | Result |
|------|--------|
| Shop filter chips (Everything → Fish) | 16 → 4 cards, layout animation OK |
| Per-product Enquire link | `wa.me` URL pre-filled with product name + price |
| Companion quiz (4 questions, apartment path) | Recommends aquarium; WhatsApp handoff pre-filled |
| Contact form validation | Empty/invalid email blocked with inline errors |
| Contact form submit | Opens `wa.me` with structured enquiry (name/phone/email/topic/message) |
| Open/closed badge | Computed in Asia/Kolkata against `lib/business.js` hours |

## Accessibility & motion

- Global `prefers-reduced-motion: reduce` rule: all animation/transition
  durations collapse to ~0 (calm, not frozen — ambient canvases still run).
- Bubble cursor trail and 3D tilt cards gated behind
  `(hover: hover) and (pointer: fine)` — never touch mobile or touch laptops.
- Soundscape is off by default and starts only from a user gesture
  (AudioContext autoplay policy).
- Form fields have labels, `aria-invalid` on errors, quiz dialog has
  `role="dialog"` + `aria-modal`.
- Known gap: the canvas-driven hero chapters have no text alternative
  beyond the visible headlines — acceptable for a decorative sequence,
  flagged for a future `sr-only` summary.

## Performance notes

- Homepage First Load JS: 165 kB (framework 87 kB shared). Framer Motion
  is the largest chunk.
- 540 scroll frames total ~27 MB; the loader gates Chapter 1 on 30 frames
  and streams the rest, with nearest-loaded-frame fallback. Chapter 2 loads
  only after Chapter 1 completes.
- Product photography: 16 JPGs, 1.8 MB total, lazy-loaded below the fold.
- Lighthouse scores: not captured in this environment (no headless Chrome
  with tracing here) — **TODO: run Lighthouse on the Vercel preview before
  go-live**, target 90+ mobile.

## Breakpoints

- Layout uses fluid clamps throughout; explicit guards at 1120 / 900 / 860 /
  820 / 780 / 720 / 680 / 620 / 520 px. Zero horizontal scroll observed
  from 320 px up in DOM-based checks. **TODO: physical device pass**
  (mid-range Android + iPhone) before handover.

## TODO list for the owner

1. Confirm shop product names & prices (currently indicative).
2. Confirm +91 99538 58521 is WhatsApp-enabled — every CTA depends on it.
3. Confirm the Google Maps pin; then geo coordinates can be added to the
   JSON-LD.
4. Decide the "since 1992 vs 40+ years" story — redesign currently says
   "Since 1992 · 30+ years" everywhere for consistency.
5. Supply real showroom/product photos when convenient; current product
   shots are AI-generated placeholders in a consistent brand style.
6. Holiday closures: the open/closed badge knows regular hours only.
7. Run Lighthouse + physical-device QA on the deployed preview.
8. Optional future work: next/image + AVIF for frames, Lenis smooth scroll,
   MDX care guides, Vercel Analytics.
