# Dreamy Backgrounds — Prompt Pack
### Dolphin Aquarium & Pets · AI video prompts + exact placement instructions

**How to use this pack (3 steps):**
1. **Generate** — copy each `VIDEO PROMPT` into your AI video tool (Runway Gen-3, Kling, Pika, Luma, Sora). Generate at **1920×1080, 8–10 seconds, seamless loop** unless noted.
2. **Compress** — every clip must end under **3 MB**. Use: `ffmpeg -i in.mp4 -an -vf "scale=1280:-2" -c:v libx264 -crf 30 -preset slow -movflags +faststart out.mp4`
3. **Build** — drop files into `public/assets/ambience/` with the exact names below, then paste the **BUILDER PROMPT** at the end into your AI builder (Lovable / Bolt / v0 / me).

---

## Global style tokens — paste into EVERY prompt so all clips feel like one film

> Style suffix (append to every prompt):
> *"Dreamy cinematic macro atmosphere, soft volumetric god rays, gentle floating particles, slow graceful motion, shallow depth of field with creamy bokeh, rich but muted film-grade color, subtle teal-and-gold grade, no text, no watermark, no people looking at camera, seamless loop, 24fps, hypnotic and calming."*

**Palette (mention the hexes — keeps every clip on-brand):**
| World | Colors |
|---|---|
| Ocean | deep navy `#03233F`, cyan glow `#B6ECF5`, teal `#0E5F7A` |
| Home / cream | warm cream `#F6F1E8`, sand `#E8DCC8`, gold `#ECD288` |
| Forest | moss `#3E6B4F`, fern `#7FB069`, sunlit amber `#E8B86D` |

---

## 1 · Loading screen
**What it is:** fullscreen intro — white logo, "Since 1992 · Madgaon, Goa", progress bar. Currently flat dark.

**VIDEO PROMPT:**
> Underwater scene in deep navy `#03233F`, a single soft column of cyan light `#B6ECF5` descending from far above, tiny silver bubbles rising slowly through the light, gentle caustic shimmer on a dark sandy floor, extreme depth, quiet and premium. [style suffix]

**File:** `public/assets/ambience/loader.mp4`

**Placement:** in `app/page.js`, inside the `.loader` motion.div, behind `.loader-inner`:
```jsx
<video className="amb-video" src="/assets/ambience/loader.mp4" autoPlay muted loop playsInline preload="auto" />
```
CSS: `.loader .amb-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.5; }` and add `position:relative; overflow:hidden` to `.loader`. Dark overlay `#03233F` at 55% over it so the white logo stays crisp.

---

## 2 · Hero / Aquatic chapter (the arowana scroll sequence)
**What it is:** pinned 460vh scroll film, chili-red arowana. Already the strongest moment — **do not replace it**. Add a *caustic light overlay* only.

**VIDEO PROMPT (overlay, generate with alpha or black background):**
> Sunlight caustics dancing underwater, rippling light patterns only, no creatures, no floor, abstract shimmering web of soft cyan light on near-black `#03233F`, very low contrast. [style suffix]

**File:** `public/assets/ambience/caustics.mp4`

**Placement:** in `components/ScrollSequence.jsx`, as a fixed overlay inside the pinned wrapper, `mix-blend-mode: screen; opacity:.16; pointer-events:none; z-index: 2` (above the canvas, below the text). Plays always — it's the "living water" light on every frame.

---

## 3 · Interlude — "A living collection, cared for since 1992" (`#care`)
**What it is:** dark ocean stats band with count-ups.

**VIDEO PROMPT:**
> Deep open-ocean water at night, slow drifting bioluminescent plankton like underwater stars, one distant soft cyan glow pulsing gently, vast and serene, navy `#03233F` palette. [style suffix]

**File:** `public/assets/ambience/care.mp4`

**Placement:** `app/page.js` — inside `<section className="interlude ...">`, before `<LiveBackground>`; give the section `position:relative; overflow:hidden` and put the video at `position:absolute; inset:0; object-fit:cover; opacity:.35` with a navy gradient overlay 60%. Remove or keep `LiveBackground` — your choice, they blend (video behind, particles in front).

---

## 4 · Transition — "But a home isn't complete with fins alone."
**What it is:** full-screen poetic line, dark → warm hand-off between the two worlds.

**VIDEO PROMPT:**
> A slow dreamlike morph from deep teal underwater light into warm golden morning haze, soft focus, particles of light crossing the frame like fireflies meeting bubbles, gradient journey from `#03233F` to `#E8B86D`, abstract, no objects. [style suffix]

**File:** `public/assets/ambience/transition.mp4`

**Placement:** `app/page.js` — `<section className="transition">`, same absolute-cover pattern, `opacity:.5`, behind the text (`z-index:0`, text `z-index:1`).

---

## 5 · Garden chapter (companions scroll sequence, `#companions`)
**What it is:** pinned 520vh warm scroll film — dogs, cats, birds. Keep the frames; add ambience the same way as §2.

**VIDEO PROMPT (overlay, black background):**
> Golden morning light filtering through a forest canopy, soft floating pollen and dust motes glowing in sunbeams, warm amber `#E8B86D` and moss `#3E6B4F`, very gentle leaf-shadow flicker, abstract background plate. [style suffix]

**File:** `public/assets/ambience/pollen.mp4`

**Placement:** same slot as `caustics.mp4` in `ScrollSequence.jsx` but for the garden instance — `mix-blend-mode: screen; opacity:.14`.

---

## 6 · Companions gallery
**What it is:** grid of pet portraits after the garden chapter.

**VIDEO PROMPT:**
> A sunlit dreamy garden wall covered in soft green ivy, warm bokeh of a Goa morning in the background, butterflies crossing very slowly, cream-gold grade `#F6F1E8`, shallow depth. [style suffix]

**File:** `public/assets/ambience/gallery.mp4`

**Placement:** `components/CompanionsGallery.jsx` — wrap the section, video absolute-cover at `opacity:.22` behind the grid; keep `data-nav` untouched.

---

## 7 · Services (`#services`, cream)
**What it is:** 3 service cards + auto-scrolling photo strip on warm cream.

**VIDEO PROMPT:**
> Cozy warm interior light, drifting golden leaves and soft paw-print-shaped bokeh floating gently across a cream `#F6F1E8` backdrop, premium pet-boutique warmth, extremely subtle. [style suffix]

**File:** `public/assets/ambience/services.mp4`

**Placement:** `app/page.js` — inside `<section id="services">`, behind `.wrap`, absolute-cover `opacity:.18`. Keep `GardenBackground` leaves in front of it.

---

## 8 · Why us (`#why`, espresso)
**What it is:** dark espresso trust band — 2 lakh customers, health guarantee.

**VIDEO PROMPT:**
> Elegant dark espresso-brown `#2A2118` water surface seen from below, slow golden `#ECD288` light ripples, a few rising champagne-like bubbles, luxurious and calm, five-star hotel lobby mood underwater. [style suffix]

**File:** `public/assets/ambience/why.mp4`

**Placement:** `app/page.js` — inside `<section id="why">`, absolute-cover `opacity:.3`, keep `LiveBackground` particles above it.

---

## 9 · Founders (`#founders`, cream)
**What it is:** 3 founder portrait cards.

**VIDEO PROMPT:**
> Sophisticated cream `#F6F1E8` silk-like backdrop with slow golden light sweeps and very fine drifting dust in sunbeams, executive-portrait studio warmth, restrained and expensive-looking. [style suffix]

**File:** `public/assets/ambience/founders.mp4`

**Placement:** `app/page.js` — inside `<section id="founders">`, absolute-cover `opacity:.2`, behind `.wrap`.

---

## 10 · Clients (`#clients`, sand)
**What it is:** St. Regis, Fisherman's Wharf, Radisson Blu logo cards.

**VIDEO PROMPT:**
> Minimal sand `#E8DCC8` gradient backdrop with a single slow-moving warm light band, like late-afternoon sun passing across a linen wall, barely-there elegance, no objects. [style suffix]

**File:** `public/assets/ambience/clients.mp4`

**Placement:** `app/page.js` — inside `<section id="clients">`, absolute-cover `opacity:.25`.

---

## 11 · Reviews wall
**What it is:** two marquee rows of review cards hanging on clothespins from ropes, warm backdrop with drifting animal silhouettes.

**VIDEO PROMPT:**
> Dreamy warm attic-of-memories mood, soft string lights bokeh glowing amber, a rope with tiny wooden clothespins subtly swaying in a breeze, warm cream `#F6F1E8` haze, nostalgic and cozy, very shallow depth of field so only the bokeh is visible. [style suffix]

**File:** `public/assets/ambience/reviews.mp4`

**Placement:** `components/ReviewsWall.jsx` — absolute-cover `opacity:.3` behind the rope/track layers.

---

## 12 · Heart band (`#heart`)
**What it is:** "The heart of Dolphin" — pulsing heart icon, leads into Visit.

**VIDEO PROMPT:**
> A soft warm glow that beats gently like a slow heartbeat — expanding rings of amber `#ECD288` light on deep teal `#03233F`, intimate and alive, pulse every ~2.6 seconds, otherwise still. [style suffix]

**File:** `public/assets/ambience/heart.mp4`

**Placement:** `components/HeartSection.jsx` — absolute-cover `opacity:.35` behind `.hs-inner`.

---

## 13 · Visit — "More Than Pets" (`#visit`) ⭐ the money shot
**What it is:** luminous aquarium art (girl watching dolphin), white map card. Must match the current art exactly.

**VIDEO PROMPT:**
> A luminous deep-blue aquarium tunnel, a dolphin gliding slowly and gracefully past a huge glass wall, schools of tiny orange and blue fish shimmering, god rays of cyan light `#B6ECF5` from the water surface, a small child's silhouette watching in wonder from below, cinematic, magical, premium. [style suffix]

**File:** `public/assets/ambience/visit.mp4`

**Placement:** `components/VisitWorld.jsx` — inside the section, **behind** `.vw-scene` (the static art) at `opacity:.5`, OR replace `.vw-scene` entirely with the video (`object-fit:cover`) if the clip is good. Keep the white location card and text layers above (`z-index` untouched). If replacing, keep the scene's `filter: saturate(1.35) brightness(1.22)` values as a starting point and adjust.

---

## 14 · Footer
**What it is:** site footer, deep navy.

**VIDEO PROMPT:**
> Moonlit ocean surface from just below at night, silver `#B6ECF5` light shimmer, gentle waves overhead, a few last bubbles rising, closing-credits calm. [style suffix]

**File:** `public/assets/ambience/footer.mp4`

**Placement:** `components/SiteFooter.jsx` — absolute-cover `opacity:.2` behind the footer content.

---

## Non-negotiable build rules (include in the builder prompt)

1. Every `<video>`: `autoPlay muted loop playsInline preload="none"` + `IntersectionObserver` (or framer-motion `whileInView`) so it **only plays while on screen**.
2. Poster frame + `background-color` fallback that matches the section — no white flash.
3. **Respect reduced motion:** wrap playback in the existing reduced-motion check — calm static first frame for `prefers-reduced-motion: reduce` users (site already has this pattern in `globals.css`).
4. Videos sit **behind** content (`z-index:0`), sections get `position:relative; overflow:hidden`, overlays keep text legible (existing `.vw-shade`-style gradients stay).
5. Never touch `data-nav` attributes — the nav theme logic depends on them.
6. Mobile: same file, `object-fit:cover` crops fine; lazy `preload="none"` keeps first load fast.

---

## ⭐ THE BUILDER PROMPT (paste whole block into your AI builder)

> You are working on a Next.js 14 site (App Router, framer-motion) for Dolphin Aquarium & Pets, a Goa pet shop. I have generated a set of seamless-loop ambient background videos and placed them in `public/assets/ambience/`: `loader.mp4, caustics.mp4, care.mp4, transition.mp4, pollen.mp4, gallery.mp4, services.mp4, why.mp4, founders.mp4, clients.mp4, reviews.mp4, heart.mp4, visit.mp4, footer.mp4`.
>
> Create a reusable client component `components/AmbientVideo.jsx` that renders `<video autoPlay muted loop playsInline preload="none">` with a poster + matching background-color fallback, an `opacity` prop, and an IntersectionObserver that pauses the video when offscreen.
>
> Then place it as a full-bleed absolutely-positioned background (`inset:0; object-fit:cover; z-index:0`) in each location, keeping all existing content layers, overlays, particles (`LiveBackground`, `GardenBackground`) and `data-nav` attributes intact:
> 1. `app/page.js` loader overlay → `loader.mp4` (opacity .5, dark navy overlay 55%)
> 2. `components/ScrollSequence.jsx` → `caustics.mp4` for the aquatic chapter and `pollen.mp4` for the garden chapter, `mix-blend-mode:screen`, opacity .16/.14, above the frame canvas, below the beat text, pointer-events none
> 3. `app/page.js` section#care → `care.mp4` (.35) · 4. section.transition → `transition.mp4` (.5)
> 5. `components/CompanionsGallery.jsx` → `gallery.mp4` (.22)
> 6. `app/page.js` section#services → `services.mp4` (.18) · 7. section#why → `why.mp4` (.3) · 8. section#founders → `founders.mp4` (.2) · 9. section#clients → `clients.mp4` (.25)
> 10. `components/ReviewsWall.jsx` → `reviews.mp4` (.3)
> 11. `components/HeartSection.jsx` → `heart.mp4` (.35)
> 12. `components/VisitWorld.jsx` → `visit.mp4` (.5) behind `.vw-scene`
> 13. `components/SiteFooter.jsx` → `footer.mp4` (.2)
>
> Every host section needs `position:relative; overflow:hidden`. Add a global reduced-motion rule: for `prefers-reduced-motion: reduce`, ambient videos render only their poster frame (pause at first frame). Verify text contrast over each video and keep the existing shade overlays. Do not change any animations, copy, or nav logic.
