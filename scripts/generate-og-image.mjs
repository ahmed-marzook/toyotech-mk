/**
 * Generates public/og-image.png (1200×630) — the placeholder social preview
 * image used by WhatsApp/Facebook link cards: the client's logo artwork
 * (src/assets/logo.png, transparent) composited on the brand navy/blue/red
 * background, with the "Hybrid Autos" sub-line and tagline as text.
 * After regenerating, bump `v` in `ogImage` (src/config/site.ts) so
 * Facebook/WhatsApp fetch the new image instead of their cached copy.
 *
 * Run: npm run og-image
 * Lives in public/ (not src/assets/) so its URL stays stable and unhashed —
 * crawlers cache previews by image URL.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../public/og-image.png', import.meta.url));
const logoPath = fileURLToPath(new URL('../src/assets/logo.png', import.meta.url));

// Logo box: left-aligned with the text below, kept clear of the red accent.
const LOGO = { left: 88, top: 70, width: 720 };

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B2545"/>
      <stop offset="0.65" stop-color="#13335e"/>
      <stop offset="1" stop-color="#1E5AA8"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- red diagonal accent -->
  <path d="M1040 0h160v630H890z" fill="#D5222A" opacity="0.9"/>
  <path d="M1000 0h24L874 630h-24z" fill="#ffffff" opacity="0.9"/>

  <!-- sub-line -->
  <rect x="92" y="385" width="60" height="4" fill="#6CD12A"/>
  <text x="170" y="400" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700"
        fill="#ffffff" letter-spacing="6">HYBRID AUTOS</text>
  <rect x="560" y="385" width="60" height="4" fill="#6CD12A"/>

  <text x="92" y="480" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#ffffff">MOTs, Servicing &amp; Hybrid Specialists · Bletchley</text>
  <text x="92" y="540" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#6CD12A" font-weight="700">MOTs 7 days a week · Same-day bookings</text>
</svg>`;

const logo = await sharp(logoPath).resize({ width: LOGO.width }).toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, left: LOGO.left, top: LOGO.top }])
  .png()
  .toFile(out);
console.log(`Wrote ${out}`);
