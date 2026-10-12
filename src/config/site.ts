/**
 * Central site configuration — business details, contact numbers,
 * WhatsApp link and the opening-hours CSV source.
 */

export const site = {
  name: 'Toyotech MOT Centre',
  altName: 'Toyotech Hybrid Autos',
  tagline: 'Expert care for all makes and models',
  description:
    'Toyotech MOT Centre in Bletchley, Milton Keynes — hybrid vehicle specialists offering MOTs, servicing, brakes, repairs and diagnostics. MOTs 7 days a week, same-day bookings.',
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
 * disclosures regulations) and the Provision of Services Regulations 2009.
 * There are two registered companies (one for the main workshop, one for
 * the MOT testing station), with room for a third later: add each one to
 * `companies` and the Footer and Privacy Policy list it automatically.
 * Only add a company once its details are checked on Companies House.
 */
export type Company = {
  companyName: string;
  companyNumber: string;
  jurisdiction: string;
  registeredOffice: string;
  /** What this company runs, e.g. "Workshop" or "MOT testing station" */
  role?: string;
  /** ISO date of incorporation (Companies House) */
  incorporated?: string;
};

/**
 * Main workshop company — the website's data controller and the legalName in
 * the JSON-LD. Source: Companies House,
 * https://find-and-update.company-information.service.gov.uk/company/16013011
 */
export const legal = {
  companyName: 'Toyotech Hybrid Autos Limited',
  companyNumber: '16013011',
  jurisdiction: 'England and Wales',
  registeredOffice: 'Unit 3, 80-86 Tavistock Street, Bletchley, Milton Keynes, MK2 2PB',
  /** ISO date of incorporation (Companies House) — schema.org foundingDate */
  incorporated: '2024-10-11',
  role: 'Workshop',
} satisfies Company;

export const companies: Company[] = [
  legal,
  // MOT testing station. Source: Companies House,
  // https://find-and-update.company-information.service.gov.uk/company/17095416
  {
    companyName: 'Toyotech MOT Centre Ltd',
    companyNumber: '17095416',
    jurisdiction: 'England and Wales',
    registeredOffice: 'Unit 6, 80-86 Tavistock Street, Bletchley, Milton Keynes, MK2 2PB',
    incorporated: '2026-03-16',
    role: 'MOT testing station',
  },
];

/**
 * Areas the workshop serves, used for schema.org `areaServed`, llms.txt and
 * the Contact page's "Areas we cover" line. AI assistants match a prompt like
 * "hybrid garage near Newport Pagnell" against these, so list real nearby
 * places customers come from. Confirm with Mumthaz and keep in step with the
 * Google Business Profile's service-area list.
 */
export const serviceAreas = [
  'Bletchley',
  'Fenny Stratford',
  'Water Eaton',
  'Central Milton Keynes',
  'Wolverton',
  'Stony Stratford',
  'Newport Pagnell',
  'Milton Keynes',
];

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

/**
 * Numbers are split by job (meeting 12 Oct 2026). The first is the main
 * number used site-wide (header, hero, schema `telephone`).
 */
export const phones: Phone[] = [
  { label: 'Main line · MOTs & tyres', display: '01908 639629', tel: '+441908639629' },
  { label: 'Servicing & quotes · call or WhatsApp', display: '07450 277250', tel: '+447450277250' },
];

export type WhatsAppLine = { label: string; display: string; number: string };

/** Service garage line — the site-wide WhatsApp button and the no-JS fallback. */
const serviceWhatsApp: WhatsAppLine = { label: 'Servicing & repairs', display: '07450 277250', number: '447450277250' };
/** MOT & tyres line (WhatsApp only; MOT calls go to the main line). */
const motWhatsApp: WhatsAppLine = { label: 'MOTs & tyres', display: '07476 094818', number: '447476094818' };

const waLink = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

const whatsappMessage = 'Hello Toyotech, I am interested in booking a service or MOT. Could you let me know your availability?';

/**
 * Jobs offered by the WhatsApp enquiry form (WhatsAppEnquiry.astro). Each one
 * goes to the WhatsApp line that handles it; `{reg}` in the template is
 * replaced with the customer's reg plate.
 */
export const whatsappEnquiries = [
  {
    id: 'mot',
    label: 'MOT',
    number: motWhatsApp.number,
    template: "Hello Toyotech, I'd like to book an MOT for my car, reg {reg}. Could you let me know your availability?",
  },
  {
    id: 'service',
    label: 'Service',
    number: serviceWhatsApp.number,
    template: "Hello Toyotech, I'd like to book a service for my car, reg {reg}. Could you let me know your availability?",
  },
  {
    id: 'repair',
    label: 'Repair or quote',
    number: serviceWhatsApp.number,
    template: "Hello Toyotech, I'd like a quote for a repair on my car, reg {reg}. The problem is: ",
  },
  {
    id: 'tyres',
    label: 'Tyres',
    number: motWhatsApp.number,
    template: "Hello Toyotech, I'm looking for tyres for my car, reg {reg}. Could you let me know what you have?",
  },
];

export const whatsapp = {
  number: serviceWhatsApp.number,
  display: serviceWhatsApp.display,
  href: waLink(serviceWhatsApp.number, whatsappMessage),
  lines: [serviceWhatsApp, motWhatsApp],
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

/**
 * Workshop: Monday to Saturday. MOT testing: 7 days. Both 09:00-18:00
 * (meeting 12 Oct 2026). Plain-English summary for the footer and copy.
 */
export const hoursSummary = {
  workshop: 'Workshop: Mon–Sat, 9am–6pm',
  mot: 'MOTs: 7 days a week, 9am–6pm',
};

/** Shown if the Google Sheet can't be fetched or parsed. */
export const fallbackHours: HoursRow[] = [
  ...['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => ({
    day,
    open: '09:00',
    close: '18:00',
    closedFlag: false,
    note: 'Workshop and MOTs',
  })),
  { day: 'Sunday', open: '09:00', close: '18:00', closedFlag: false, note: 'MOTs only, workshop closed' },
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
