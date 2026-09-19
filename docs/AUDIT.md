# Live-Site Audit — dolphinaquariumandpets.com

Audited 19 Sep 2026 (desktop + mobile DOM pass). The current site is a
single static page with ~25 images and one script — solid content, dated
presentation, and several quiet conversion leaks.

## What the live site gets right

- Real, specific testimonials (9 Google reviews) — genuine gold, kept verbatim
- Full founder bios with credible credentials
- Correct address, hours, phone, socials
- Services list is broader than most competitors (walk-in aviaries, DNA
  testing, microchipping, live seafood, waterfalls)

## Weaknesses found

| # | Issue | Impact |
|---|-------|--------|
| 1 | Contradictory claims: "Established 1992" vs "40+ years" vs "4+ decades" | Erodes trust; 1992→2026 is 34 years. Redesign uses "Since 1992 / 30+ years" |
| 2 | No Open Graph / Twitter cards | Shared links render as bare URLs |
| 3 | No structured data (LocalBusiness/PetStore) | No Google rich result with hours/rating |
| 4 | No sitemap.xml / robots.txt | Weaker indexing |
| 5 | Static wall-of-text testimonials | 9 great reviews, low readability, no carousel |
| 6 | Product/shop section is a text list with no photos or prices | No purchase intent capture |
| 7 | No per-service or per-product enquiry path | Leak: intent isn't routed anywhere specific |
| 8 | No visible open/closed status | Visitors don't know when to come |
| 9 | Generic template look; weak visual hierarchy | Doesn't match the "Goa's most iconic pet destination" claim |
| 10 | Nav contrast and hero typography are rough | First impression suffers |

## What the redesign does about each

1. Consistent "Since 1992 · 30+ years" everywhere — flagged to owner.
2. Full OG/Twitter cards with a real showroom image.
3. `PetStore` JSON-LD with hours, address, phone, socials (geo coordinates
   deliberately omitted until the exact pin is confirmed).
4. `app/sitemap.js` + `app/robots.js` shipped.
5. All 9 reviews rendered as cards; attribution corrected (the
   dachshund/Parvo story belongs to **Lionel Hillery Antao**, not
   Deirdre Sharon Gomes as the old site implies by order).
6. `/shop` rebuilt: 16 collections with studio photography (AI-generated,
   clearly indicative styling — confirm with real stock photos when
   available), indicative prices, filter chips.
7. Every product, pet and quiz result deep-links to WhatsApp with a
   pre-filled message naming the item.
8. Live "Open now / Closed now" badge computed in Asia/Kolkata, plus hours
   in the visit section, contact page JSON-LD, and footer.
9. Cinematic scrollytelling chapters (arowana → garden), editorial cream/deep
   ocean art direction, Fraunces/Inter/Great Vibes type system.
10. Glass nav that adapts dark/light to the section beneath it, magnetic
    buttons, scroll progress bar, reduced-motion support.
