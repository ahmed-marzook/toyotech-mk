/**
 * Central site configuration — business details, contact numbers,
 * WhatsApp link and the opening-hours CSV source.
 */

export const site = {
  name: 'Toyotech MOT Centre',
  altName: 'Toyotech Hybrid Autos',
  tagline: 'Expert care for all makes and models',
  description:
    'Toyotech MOT Centre in Bletchley, Milton Keynes — hybrid vehicle specialists offering MOTs, servicing, brakes, repairs and diagnostics. Open 7 days, same-day bookings.',
  contactName: 'Mumthaz',
};

export const address = {
  line1: 'No. 80-86, Tavistock Street',
  line2: 'Bletchley',
  city: 'Milton Keynes',
  postcode: 'MK2 2PB',
  get full() {
    return `${this.line1}, ${this.line2}, ${this.city}, ${this.postcode}`;
  },
};

/**
 * Trading disclosure required by the Companies Act 2006 (trading
 * disclosures regulations) and the Provision of Services Regulations 2009
 * now that the business trades as a limited company. Source: Companies
 * House, https://find-and-update.company-information.service.gov.uk/company/16013011
 */
export const legal = {
  companyName: 'Toyotech Hybrid Autos Limited',
  companyNumber: '16013011',
  jurisdiction: 'England and Wales',
  registeredOffice: 'Unit 3, 80-86 Tavistock Street, Bletchley, Milton Keynes, MK2 2PB',
};

/** Google Business listing (Toyotech Hybrid Autos) */
const googlePlaceId = 'ChIJdd_Of5tVdkgROhBlr-LHD4U';
const mapQuery = 'Toyotech Hybrid Autos, 80-86 Tavistock Street, Bletchley, Milton Keynes MK2 2PB';

/**
 * MK2 2PB postcode centroid (Ordnance Survey-derived, via doogal.co.uk) —
 * close enough for a workshop pin; not rooftop-precise.
 */
const lat = 51.99988;
const lng = -0.72453;

export const map = {
  lat,
  lng,
  zoom: 16,
  /** OpenFreeMap "positron" vector style — free, keyless, no tracking/cookies */
  styleUrl: 'https://tiles.openfreemap.org/styles/positron',
  /**
   * Normal outbound links, not embeds — clicking one navigates to Google's
   * or Waze's own site/app (covered by their privacy policies), it doesn't
   * load their content or set their cookies on this site the way an iframe
   * embed would.
   */
  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}&query_place_id=${googlePlaceId}`,
  /** Opens turn-by-turn navigation in the Waze app (falls back to waze.com on desktop) */
  wazeUrl: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes&zoom=17`,
};

export type Phone = { label: string; display: string; tel: string };

export const phones: Phone[] = [
  { label: 'Mobile / WhatsApp', display: '07450 277250', tel: '+447450277250' },
  { label: 'Landline', display: '01908 639629', tel: '+441908639629' },
  { label: 'Mobile', display: '07450 011199', tel: '+447450011199' },
  { label: 'Mobile', display: '07502 811204', tel: '+447502811204' },
];

const whatsappNumber = '447450277250';
const whatsappMessage = 'Hello Toyotech, I am interested in booking a service or MOT. Could you let me know your availability?';

export const whatsapp = {
  number: whatsappNumber,
  href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
};

/** Published Google Sheet (File → Share → Publish to web → CSV). */
export const OPENING_HOURS_CSV_URL =
  import.meta.env.PUBLIC_OPENING_HOURS_CSV_URL ??
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9lL74saLCqZkn15-TFJzETCA0cuXHXASujcjRnQ9HbZFtc7kczFlnCKY9GUBjpVVEX-D4vgqAN3O1/pub?output=csv';

/**
 * Cloudflare Web Analytics beacon token. Public by design — it ships in the
 * page HTML — so it lives here rather than in a secret. Cookieless, so no
 * consent banner is needed. Empty string disables the beacon entirely.
 */
export const ANALYTICS_TOKEN =
  import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN ?? 'd944ebac24cb40cf919eace884fb00a7';

/** Timezone used for "today" and "Open now" calculations. */
export const TIMEZONE = 'Europe/London';

export type HoursRow = {
  day: string;
  open: string;
  close: string;
  closedFlag: boolean;
  note?: string;
};

/** Shown if the Google Sheet can't be fetched or parsed. */
export const fallbackHours: HoursRow[] = [
  { day: 'Monday', open: '09:00', close: '18:00', closedFlag: false, note: 'Same-day bookings available' },
  { day: 'Tuesday', open: '09:00', close: '18:00', closedFlag: false, note: 'Same-day bookings available' },
  { day: 'Wednesday', open: '09:00', close: '18:00', closedFlag: false, note: 'Same-day bookings available' },
  { day: 'Thursday', open: '09:00', close: '18:00', closedFlag: false, note: 'Same-day bookings available' },
  { day: 'Friday', open: '09:00', close: '18:00', closedFlag: false, note: 'Same-day bookings available' },
  { day: 'Saturday', open: '09:00', close: '18:00', closedFlag: false, note: 'Same-day bookings available' },
  { day: 'Sunday', open: '09:00', close: '18:00', closedFlag: false, note: 'Same-day bookings available' },
];

export const nav = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'MOT Checks', path: '/mot-checks' },
  { label: 'Hybrid Battery', path: '/hybrid-battery' },
  { label: 'Contact', path: '/contact' },
];

/**
 * Prefix an internal path with the GitHub Pages base path. Page paths get a
 * trailing slash (trailingSlash: 'always'); file paths like /favicon.svg don't.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const [pathname, hash] = path.split('#');
  let p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!p.endsWith('/') && !/\.\w+$/.test(p)) p += '/';
  return `${base}${p}${hash ? `#${hash}` : ''}`;
}
