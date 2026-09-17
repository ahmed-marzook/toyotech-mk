/**
 * Generates public/og-image.png (1200×630) — the placeholder social preview
 * image used by WhatsApp/Facebook link cards. Recreates the Toyotech logo
 * (silver swoosh, red wordmark, tri-colour ring) on the brand navy/blue/red
 * background. Swap for a real workshop photo later.
 *
 * Run: npm run og-image
 * Lives in public/ (not src/assets/) so its URL stays stable and unhashed —
 * crawlers cache previews by image URL.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../public/og-image.png', import.meta.url));

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B2545"/>
      <stop offset="0.65" stop-color="#13335e"/>
      <stop offset="1" stop-color="#1E5AA8"/>
    </linearGradient>
    <linearGradient id="silver" x1="0" x2="1">
      <stop offset="0" stop-color="#9ca3af" stop-opacity="0.35"/>
      <stop offset="0.55" stop-color="#f3f4f6"/>
      <stop offset="1" stop-color="#d1d5db"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- red diagonal accent -->
  <path d="M1040 0h160v630H890z" fill="#D5222A" opacity="0.9"/>
  <path d="M1000 0h24L874 630h-24z" fill="#ffffff" opacity="0.9"/>

  <!-- swoosh -->
  <path d="M90 225C300 90 620 40 860 150 640 95 380 130 90 225z" fill="url(#silver)"/>
  <path d="M190 240C380 150 600 120 790 165 600 140 400 170 190 240z" fill="#e5e7eb" opacity="0.55"/>

  <!-- wordmark: white outline keeps the red legible on navy -->
  <text x="90" y="345" font-family="Georgia, 'Times New Roman', serif" font-size="104" font-weight="900" textLength="600" lengthAdjust="spacingAndGlyphs"
        fill="#D5222A" stroke="#ffffff" stroke-width="5" paint-order="stroke">TOYOTECH</text>

  <!-- tri-colour ring -->
  <g transform="translate(768 308)" fill="none" stroke-width="18">
    <path d="M0 -44A44 44 0 0 1 41 -15" stroke="#1E5AA8"/>
    <path d="M44 0A44 44 0 0 1 0 44" stroke="#3b82f6"/>
    <path d="M0 44A44 44 0 0 1 -41 15" stroke="#D5222A"/>
    <path d="M-44 0A44 44 0 0 1 -15 -41" stroke="#6CD12A"/>
  </g>

  <!-- sub-line -->
  <rect x="92" y="385" width="60" height="4" fill="#6CD12A"/>
  <text x="170" y="400" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700"
        fill="#ffffff" letter-spacing="6">MOT CENTRE</text>
  <rect x="515" y="385" width="60" height="4" fill="#6CD12A"/>

  <text x="92" y="480" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#ffffff">Hybrid Specialists · Bletchley, Milton Keynes</text>
  <text x="92" y="540" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#6CD12A" font-weight="700">Open 7 days · Same-day bookings</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`Wrote ${out}`);
