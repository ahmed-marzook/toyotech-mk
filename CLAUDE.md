# Toyotech MOT Centre — Website Project

## Business Overview

- **Name:** Toyotech MOT Centre / Toyotech Hybrid Autos
- **Legal entity:** Toyotech Hybrid Autos Limited, company no. 16013011, registered in England and Wales, incorporated 11 October 2024, SIC 45200 (Maintenance and repair of motor vehicles). Registered office: Unit 3, 80-86 Tavistock Street, Bletchley, Milton Keynes, MK2 2PB. Source: [Companies House](https://find-and-update.company-information.service.gov.uk/company/16013011). Lives in `legal` in `src/config/site.ts`, disclosed in the Footer and the Privacy Policy's "Who we are" section (Companies Act 2006 trading disclosures + Provision of Services Regulations 2009).
- **Specialty:** Hybrid vehicle servicing, plus general MOTs and servicing for all cars
- **Address:** No. 80-86, Tavistock Street, Bletchley, Milton Keynes, MK22PB
- **Contact:** Mumthaz — 07450 277250 / 01908 639629 (other numbers seen on signage: 07450 011199, 07450 281120 4)
- **Hours:** Open 7 days a week, same-day bookings available
- **Services offered** (from workshop signage): Diagnostic, Engine, Gear Box, MOT Repair, Service, Brake Pads, Power Steering, AC & Heater, Clutch, ABS, Glass, Suspension, Electrical Work, Hybrid Battery
- **Tagline:** "Expert Care for All Makes and Models" / "We Offer Genuine Parts and Warranty"
- **Google rating:** 4.8★ (10 reviews) — see Google Reviews section below

## Tech Stack

- **Framework:** Astro (static site, GitHub Pages output)
- **UI:** React islands where interactivity is needed (e.g. opening-hours widget)
- **Styling:** Tailwind CSS
- **Icons:** An icon library — use `lucide-react` (or `astro-icon` if pure Astro components preferred)
- **Hosting:** GitHub Pages (static export, no server-side code)
- **Package manager:** npm

## Brand / Theme

- **Colours:** Red and blue, matching signage (deep blue backgrounds, bright green/blue accents in logo, red "TOYOTECH" wordmark). Primary palette:
  - Blue: `#0B2545` (dark navy) / `#1E5AA8` (brand blue)
  - Red: `#D5222A` (Toyotech red)
  - White for contrast/text on dark backgrounds
- **Logo:** Toyotech swoosh logo provided — black background, silver/grey swoosh, red "Toyotech" wordmark, blue "Hybrid Autos" subtext, red/blue/green ring icon. Place in `src/assets/logo.png`; needs a transparent-background version for use on both light and dark site backgrounds (request from client or clean up in an image editor)
- **Tone:** Trustworthy, local, fast turnaround, hybrid specialists

## Pages

1. **Home**
   - Hero: "MOT Centre is Open" banner style, same-day bookings CTA
   - Quick highlights: 7 days a week, hybrid specialists, same-day bookings
   - "What we do" services grid beside the opening hours widget: 6 featured services on mobile/tablet, all services on desktop (lg+) so it fills the column next to the hours card
   - Opening hours widget (see below)
   - Google Reviews section (see below)
   - "Find us" location section: address, "Get directions" + call buttons, Google Maps embed (see Map Embed section below)
   - CTA button → WhatsApp
2. **Services**
   - List all services: Diagnostic, Engine, Gear Box, MOT Repair, Service, Brake Pads, Power Steering, AC & Heater, Clutch, ABS, Glass, Suspension, Electrical Work, Hybrid Battery
   - Each service: icon + short description
   - No images on service cards (icon + text only, keeps the focus on the service info)
   - Feature "Genuine Parts and Warranty" and hybrid specialism callouts
3. **MOT Checks** (`/mot-checks/`)
   - Plain-English guide to every part inspected at a car MOT, grouped into 6 areas
   - Content lives in `src/content/mot-checks.ts`, sourced from DVSA's "Car parts checked at an MOT" under the Open Government Licence v3.0 — reworded, not copied, and attributed at the foot of the page
   - Also covers what an MOT does *not* include (engine, clutch, gearbox condition, servicing) as a bridge to the Services page
4. **Hybrid Battery** (`/hybrid-battery/`)
   - Local SEO landing page for the business's strongest differentiator and least contested search term
   - Failure symptoms, the diagnose-repair-replace approach, and the hybrid models covered
   - Claims are deliberately kept to what this file records; the model list and repair-vs-replace wording need confirming with Mumthaz
5. **Contact**
   - Primary CTA: "Message us on WhatsApp" button (deep link, see below)
   - Phone numbers listed as tap-to-call links (mobile-first)
   - Address + Google Maps embed (see Map Embed section below) — always shown alongside a plain-text address and "Get directions" link, never as the only way to find the workshop
   - **No social media icons/links anywhere on the site**

## Opening Hours — Google Sheet Integration

- Client publishes a Google Sheet to the web as CSV (File → Share → Publish to web → CSV).
- Fetch this CSV client-side (or at build time via Astro's static fetch) from the published CSV URL.
- Parse rows into a `{ day, open, close, closedFlag }` structure.
- Display as a simple table/list component, highlighting "today" and showing "Open now" / "Closed" status based on current time.
- Build as a React island (`OpeningHours.jsx`) so it can refetch client-side if hours change without a rebuild; alternatively fetch at build time for a fully static approach — default to **client-side fetch** so hours stay live without redeploys.
- Handle fetch failure gracefully with a fallback static hours block.
- CSV URL should be stored in an environment variable / config file (`src/config/site.ts`) — not hardcoded inline.
- **Confirmed published CSV URL:** `https://docs.google.com/spreadsheets/d/e/2PACX-1vT9lL74saLCqZkn15-TFJzETCA0cuXHXASujcjRnQ9HbZFtc7kczFlnCKY9GUBjpVVEX-D4vgqAN3O1/pub?output=csv`

### Expected CSV Format

The published sheet uses one row per day with these columns (header row required):

| Column       | Type    | Notes                                                                                                |
| ------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| `day`        | string  | `Monday` … `Sunday`, full name                                                                       |
| `open_time`  | string  | 24hr `HH:MM`, e.g. `08:30`                                                                           |
| `close_time` | string  | 24hr `HH:MM`, e.g. `17:30`                                                                           |
| `is_closed`  | boolean | `TRUE`/`FALSE` — overrides open/close times when `TRUE`                                              |
| `note`       | string  | optional, shown under the day's hours (e.g. "Drop-off & collection", "Late drop-off by appointment") |

Example rows:

```
day,open_time,close_time,is_closed,note
Monday,08:30,17:30,FALSE,Drop-off & collection
Tuesday,08:30,17:30,FALSE,Drop-off & collection
Wednesday,08:30,17:30,FALSE,Drop-off & collection
Thursday,08:30,17:30,FALSE,Late drop-off by appointment
Friday,08:30,17:00,FALSE,Drop-off & collection
Saturday,09:00,14:00,FALSE,Weekend morning slots
Sunday,,,TRUE,Closed
```

Parsing rules:

- Treat `is_closed` as case-insensitive boolean (`TRUE`/`FALSE`, `true`/`false`)
- When `is_closed` is `TRUE`, `open_time`/`close_time` may be blank — render "Closed" and ignore the note field for time display but still show it if present
- Sort rows by a fixed day order (Monday → Sunday), not sheet row order, in case the sheet is re-ordered
- Trim whitespace on every field before parsing

## Google Reviews Section

- Display the business's Google rating and a handful of recent reviews on the Home page (and/or Contact page).
- **Confirmed Google Business listing:** Toyotech Hybrid Autos, 80-86 Tavistock St, Fenny Stratford, Bletchley, Milton Keynes MK2 2PB — Place ID `ChIJdd_Of5tVdkgROhBlr-LHD4U`, currently 4.8★ from 10 reviews.
- Since this is a static GitHub Pages site (no server), embedding live Google Places data requires either:
  1. **Google Places API (Place Details)** — needs an API key restricted to the domain; fetch at build time via Astro's static data fetching (avoids exposing the key client-side) and cache/regenerate periodically, or
  2. **Third-party embed widget** (e.g. Elfsight, Trustindex, EmbedSocial) — simplest, no key handling, but adds an external script and may show branding/limits on the free tier, or
  3. **Manually curated static reviews block** — hardcode a handful of hand-picked reviews + a "Read more reviews on Google" link/button out to the Google listing — zero maintenance, no API cost, safest default given the static-hosting constraint.
- **Default approach:** start with option 3 (static curated block) since there's no backend; revisit build-time API fetch (option 1) later if reviews need to stay live without manual updates.
- Link out to the full listing: `https://share.google/igMJfXrwPXxMLlpxE`
- Sample reviews to seed the static block with:
  - "Great mechanic shop, very friendly and they go above and beyond"
  - "Brought in a Toyota Prius expecting to pay a lot. Instead they gave me a great deal with speedy turn around... Very happy with the top notch service."
  - "Best for all car repairs at affordable cost. Been servicing for 3 years now."

## Map Embed

- `src/components/MapEmbed.astro` on the Home page ("Find us" section, after reviews) and the Contact page: a **self-hosted static screenshot** (`src/assets/workshop-map.png`, via `astro:assets`), not a live embed.
  - History: started as a keyless Google Maps iframe (set Google's cookies on every load, before consent — a GDPR/PECR issue). Swapped to a MapLibre GL + OpenFreeMap live vector map to fix that (genuinely cookie-free), but tile rendering proved unreliable on the live site — confirmed blank in both Chrome and Brave, no clean root cause pinned down (style JSON loaded fine; the actual tile data silently never painted). A static image sidesteps both problems: no third-party request at all once built, so nothing to fail at runtime.
  - **Unresolved:** the current screenshot is a Google Maps capture. Google's Maps Platform terms generally restrict caching/redistributing map imagery outside their own approved display methods (the live iframe/JS API) — self-hosting a screenshot sits in a legal grey area. Low real-world enforcement risk for a small local business, but not fully clean. An OpenStreetMap-sourced screenshot (ODbL/CC BY-SA, screenshotting explicitly permitted) would close that gap. Flagged in a code comment in `MapEmbed.astro`; needs a decision, not yet resolved.
  - The actual "get me there" job doesn't depend on the image at all — it's handled by the Google Maps / Waze buttons under the map (and beside the address on Home/Contact), which are plain outbound `<a>` links, not embeds. Clicking one navigates to Google's/Waze's own site/app (covered by their privacy policies); it doesn't load their content or set their cookies on this site.
  - Brand-styled buttons: `src/components/icons/GoogleMapsIcon.astro` (monochrome glyph, via the simple-icons dataset) and `WazeIcon.astro` (client-supplied, via SVG Repo). Colours are `--color-gmaps`/`--color-waze` in `src/styles/global.css` — both adjusted off the literal brand hex for WCAG AA: raw Waze blue (`#33ccff`) is too light for white text, so it uses navy text instead (8.22:1); raw Google blue (`#4285f4`) is borderline against white text (3.56:1, fails), so the button uses a darker shade (`#1765cc`, 5.57:1) instead.
- Wrapped in a native `<details open>` so it can be collapsed without JS.
- Accessibility: descriptive `alt` text on the image (WCAG 1.1.1); sized with `aspect-ratio` so it reflows on mobile (no fixed 600×400).
- Attribution: a small "Map data © Google" caption overlaid on the image — required whenever Google Maps imagery is displayed, independent of the caching question above.
- The plain-text address and Google Maps/Waze buttons sit alongside the image regardless of whether it loads, so the map is never the only way to find the workshop.
- Note: the opening-hours CSV fetch (to Google Sheets) is the only remaining third-party request Home and Contact make; it doesn't set a cookie.

## Social / Link Previews (Open Graph)

Currently the site's WhatsApp/social link preview shows text only, no image — because there's no `og:image` set. Fix by adding proper Open Graph + Twitter Card meta tags to the shared `<head>` (e.g. a `<SEO.astro>` partial imported by every page's layout, with per-page overrides for title/description):

```html
<meta
  property="og:title"
  content="Toyotech MOT Centre | Hybrid Specialists in Milton Keynes"
/>
<meta
  property="og:description"
  content="Toyotech MOT Centre in Bletchley, Milton Keynes — hybrid vehicle specialists offering MOTs, servicing, brakes, repairs and diagnostics. Open 7 days, same-day bookings."
/>
<meta
  property="og:image"
  content="https://toyotech.co.uk/og-image.png"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta
  property="og:url"
  content="https://toyotech.co.uk/"
/>
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

- `og:image` must be an **absolute URL** (not relative), or crawlers (WhatsApp, Facebook, etc.) won't resolve it.
- Target roughly **1200×630px** landscape for the large WhatsApp/Facebook card style — a smaller/square image falls back to a tiny thumbnail.
- Until real photography exists, generate a placeholder `og-image.png` from the logo on a branded red/blue background (`src/assets/og-image.png`), swap for a real workshop photo later.
- Each page (`index.astro`, `services.astro`, `contact.astro`) should be able to override `title`/`description`/`og:image` via props passed into the shared `<SEO>` partial, rather than one static tag set site-wide.
- WhatsApp/Facebook cache previews aggressively — after deploying, re-scrape the URL via [Facebook's Sharing Debugger](https://developers.facebook.com/tools/debug/) (same crawler WhatsApp uses) to force a refresh rather than waiting.

## Accessibility

- Semantic HTML throughout (`<nav>`, `<main>`, `<header>`, `<footer>`, one `<h1>` per page, logical heading order — no skipped levels)
- All images have descriptive `alt` text; purely decorative images (background swooshes, dividers) use `alt=""`
- Colour contrast: verify the red (`#D5222A`) and navy (`#0B2545`) palette meets **WCAG AA** (4.5:1 for body text, 3:1 for large text/UI components) — check text-on-red and text-on-navy combinations specifically, since brand reds often fail on white
- All interactive elements (WhatsApp button, nav links, tap-to-call, "Get directions") are keyboard-reachable with a visible focus state — don't strip default outlines without replacing them
- Touch targets ≥44×44px (mobile-first requirement already noted, but applies to accessibility too — motor-impaired users benefit equally)
- `MapEmbed` iframe has a descriptive `title` (already specified above) — screen readers otherwise announce an unnamed "frame"
- Sticky/floating WhatsApp button must not permanently obscure content or trap keyboard focus; ensure it's reachable and dismissible/collapsible
- Run an automated pass (Lighthouse or axe DevTools) before launch, then a manual keyboard-only and screen-reader (VoiceOver/NVDA) pass on the Home, Services and Contact pages

## Animations

Subtle, CSS-only motion — no JS animation libraries, no new npm dependencies. Keyframes, tokens and rules live in `src/styles/global.css`.

- **`prefers-reduced-motion` is mandatory (WCAG 2.3.3):** every animation/transition that moves sits inside `@media (prefers-reduced-motion: no-preference)` or uses Tailwind's `motion-safe:` variant. With reduced motion, states change instantly and nothing is hidden. Smooth scrolling is gated the same way.
- **Progressive enhancement — content is never gated behind animation:** everything is visible in the HTML by default. Service info, phone numbers and the WhatsApp button work immediately with JS disabled or before JS runs.
- **Scroll reveal** (fade + 1rem slide-up): service cards (Services) and Google review cards (Home and Contact). Mark elements with `data-reveal`; `src/components/RevealOnScroll.astro` (tiny vanilla IntersectionObserver snippet, in `BaseLayout`) reveals anything already on screen, then adds `html.js-reveal` — only then are off-screen elements hidden until they scroll in. Put `data-reveal` on a wrapper, not on an element that also has a hover transform.
- **Hover/tap:** `.btn-motion` (buttons: scale 1.04 hover, 0.97 press) and `.card-motion` (cards: lift + scale 1.02, shadow). One timing everywhere: `--duration-fast` 180ms, `--ease-motion` ease-out. Hover transforms only apply under `(hover: hover)` so they don't stick after a tap on touch screens. Don't add Tailwind `transition`/`transition-colors` alongside these classes — it overrides the transition list.
- **Floating WhatsApp button (mobile):** gentle scale pulse (1 → 1.06) + soft expanding ring, 3 cycles (~4s) after a 0.8s delay, then stops — under 5s, so no pause control is needed (WCAG 2.2.2). The button also has a dismiss control.
- **MapEmbed `<details>`:** `.details-motion` animates height/opacity via `::details-content` + `interpolate-size`; browsers without support just open instantly.
- **Opening hours:** the "today" row background fades in (it's applied after hydration), and the "Today" label and "Open now/Closed" badge use `motion-safe:animate-fade-in`.
- **Performance:** only `transform` and `opacity` are animated (compositor-only, cheap on low-end phones). Verified at 390px with 4× CPU throttling: no layout shift (CLS 0), no non-composited animations, Lighthouse mobile 100 across the board.

## SEO

- **Per-page `<title>` and meta description** — distinct for Home, Services, Contact (feeds directly into the Open Graph tags above; don't reuse one generic description everywhere)
- **Local SEO focus** — work "Bletchley", "Milton Keynes", "MOT", "hybrid" naturally into headings and body copy across pages, since this is a local search business, not a national brand
- **Structured data (JSON-LD)** — add an `AutoRepair`/`LocalBusiness` schema block (name, address, phone, opening hours, geo-coordinates, price range if known) on the Home page so Google can show rich results (map pin, hours, rating) directly in search
- **`sitemap.xml`** — use `@astrojs/sitemap` integration to auto-generate on build
- **`robots.txt`** — allow all crawling (no reason to block anything on a small static marketing site)
- **Canonical URLs** — `<link rel="canonical">` per page to avoid duplicate-content issues if the site is ever reachable via both a GitHub Pages subpath and a future custom domain
- **Fast builds, small payloads** — Astro's static output already helps Core Web Vitals; keep images optimised (`astro:assets` for automatic resizing/format conversion) once real photos are added
- **Google Business Profile** — since reviews/ratings are already pulled from the confirmed listing, make sure the site's NAP (name, address, phone) matches the Google Business Profile exactly — mismatches hurt local ranking

## Future Ideas (not in initial build)

- **Vehicle reg / MOT & tax status checker** — using the free DVLA Vehicle Enquiry Service API and DVSA MOT History API. Both are free to use with no per-lookup charges, but a static GitHub Pages site can't call them directly (API key can't live client-side), so this needs a small serverless proxy (Cloudflare Worker / Netlify Function) in front of it. Park this as a v2 feature once hosting supports it.

## WhatsApp Contact

- **Confirmed number:** 07450 277250
- Use a `wa.me` deep link: `https://wa.me/447450277250?text=Hi%20Toyotech%2C%20I%27d%20like%20to%20book%20an%20MOT`
- Make this the primary CTA button site-wide (header, home hero, contact page)
- Style as a prominent green WhatsApp-branded button, distinct from the red/blue theme, so it's instantly recognisable

## Images

- No real photos yet — use clearly marked placeholder components (e.g. grey box with icon + "Image coming soon" label) for:
  - Hero background
  - Workshop/team photos
  - Social preview (`og-image.png`) — see Social / Link Previews section above
- **No images on service cards** — the Services page uses icon + name + description only, so attention stays on the service information. Don't add thumbnails back.
- Structure image references so real photos can be dropped into `src/assets/` later without code changes (consistent naming: `hero.jpg`, `workshop.jpg`, `team.jpg`, `logo.png`). See `PHOTO-SHOT-LIST.txt` for what to shoot.

## Mobile-First Requirements

- Design and test mobile layout first (most customers arrive on mobile)
- Sticky/floating WhatsApp button on mobile for easy access while scrolling
- Tap-to-call phone numbers
- Large touch targets, collapsible nav menu

## Explicitly Out of Scope

- No social media links or embeds
- No booking/payment system (WhatsApp handles enquiries)
- No CMS — content lives in Astro content collections / config files

## Suggested Project Structure

```
src/
  components/
    Header.astro
    Footer.astro
    WhatsAppButton.jsx
    OpeningHours.jsx
    ServiceCard.astro
    ImagePlaceholder.astro
    MapEmbed.astro
    SEO.astro
  config/
    site.ts          # phone numbers, address, CSV URL, WhatsApp link, map config
  content/
    services.ts       # array of services with name/description/icon
  pages/
    index.astro
    services.astro
    contact.astro
  styles/
    global.css
astro.config.mjs        # set site + base for GitHub Pages
tailwind.config.cjs
```

## Deployment

- Configure `astro.config.mjs` with correct `site` and `base` for GitHub Pages (repo-name subpath if not a custom domain)
- Add a GitHub Actions workflow (`.github/workflows/deploy.yml`) to build and deploy to the `gh-pages` branch / Pages on push to `main`
