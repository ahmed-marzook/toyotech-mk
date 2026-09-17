# Toyotech MOT Centre — Website Project

## Business Overview

- **Name:** Toyotech MOT Centre / Toyotech Hybrid Autos
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
   - Opening hours widget (see below)
   - Google Reviews section (see below)
   - "Find us" location section: address, "Get directions" + call buttons, Google Maps embed (see Map Embed section below)
   - CTA button → WhatsApp
2. **Services**
   - List all services: Diagnostic, Engine, Gear Box, MOT Repair, Service, Brake Pads, Power Steering, AC & Heater, Clutch, ABS, Glass, Suspension, Electrical Work, Hybrid Battery
   - Each service: icon + short description
   - Placeholder image per service card
   - Feature "Genuine Parts and Warranty" and hybrid specialism callouts
3. **Contact**
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

- `src/components/MapEmbed.astro` on the Home page ("Find us" section, after reviews) and the Contact page: a keyless Google Maps iframe (`https://maps.google.com/maps?q=…&output=embed`) — no API key needed.
- Embed URL and "Get directions" URL (uses the Place ID) live in `map` in `src/config/site.ts`.
- Wrapped in a native `<details open>` so it can be collapsed without JS; `loading="lazy"`.
- Accessibility: iframe has a descriptive `title`; no obsolete `frameborder`/`scrolling`/`margin*` attributes; sized with `aspect-ratio` so it reflows on mobile (no fixed 600×400).
- No backlink/attribution to embed-generator sites (e.g. embed-googlemap.com).
- Always paired with a plain-text address and a "Get directions" link plus a fallback link if the iframe fails — the map is never the only way to find the workshop.
- Note: the iframe loads Google's cookies — Home and Contact are the only pages making this third-party request (besides the client-side opening-hours CSV fetch).

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
  - Service card thumbnails
  - Workshop/team photos
- Structure image references so real photos can be dropped into `src/assets/` later without code changes (use a consistent naming convention, e.g. `service-mot.jpg`, `service-brakes.jpg`)

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
  config/
    site.ts          # phone numbers, address, CSV URL, WhatsApp link
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
