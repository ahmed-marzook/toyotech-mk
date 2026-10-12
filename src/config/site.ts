/**
 * Central site configuration — business details, contact numbers,
 * WhatsApp link and the opening-hours CSV source.
 */

export const site = {
  name: 'Toyotech Hybrid Autos',
  // Former website name, still used by the MOT testing station's company
  // (Toyotech MOT Centre Ltd). Kept as the schema `alternateName` only.
  altName: 'Toyotech MOT Centre',
  tagline: 'Expert care for all makes and models',
  // What we do, in one line (hero eyebrow + footer). Add 'Tyres' once tyre
  // services launch — until then they're "Coming soon" only.
  strapline: ['MOTs', 'Servicing', 'Repairs', 'Hybrid specialists'],
  description:
    'Toyotech Hybrid Autos in Bletchley, Milton Keynes — independent garage for MOTs, servicing and repairs on all makes, plus hybrid specialists. MOTs 7 days a week, same-day bookings.',
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
 * DVSA MOT testing station, run by Toyotech MOT Centre Ltd. Site number from
 * DVSA's list of active MOT testing stations (Unit 6, 80-86 Tavistock
 * Street, Bletchley). Lets customers and crawlers check the garage against
 * the official register.
 */
export const motStation = {
  siteNumber: '5848BM',
  operator: 'Toyotech MOT Centre Ltd',
  classes: 'Class 4',
};

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

export type Phone = {
  label: string;
  display: string;
  tel: string;
  /** Also on WhatsApp: the preset its WhatsApp button opens (see `whatsappPresets`) */
  whatsapp?: string;
};

/**
 * Every number, split by job (meeting 12 Oct 2026). All can be called; the
 * mobiles are on WhatsApp too. The first is the main number used site-wide
 * (header, hero, schema `telephone`).
 */
export const phones: Phone[] = [
  { label: 'Main line and MOTs', display: '01908 639629', tel: '+441908639629' },
  { label: 'Servicing and quotes', display: '07450 277250', tel: '+447450277250', whatsapp: 'servicing' },
  { label: 'MOTs', display: '07476 094818', tel: '+447476094818', whatsapp: 'mot' },
];

export type WhatsAppLine = {
  label: string;
  display: string;
  number: string;
  /** Preset the line's own button opens (see `whatsappPresets`) */
  enquiry: string;
};

/** Service garage line — the site-wide WhatsApp button and the no-JS fallback. */
const serviceWhatsApp: WhatsAppLine = {
  label: 'Servicing and repairs',
  display: '07450 277250',
  number: '447450277250',
  enquiry: 'servicing',
};
/** MOT line. Tyres will use it too once they launch. */
const motWhatsApp: WhatsAppLine = { label: 'MOTs', display: '07476 094818', number: '447476094818', enquiry: 'mot' };

/**
 * One kind of WhatsApp enquiry. The pre-filled message is
 * `${intro}, reg AB12 CDE. ${outro}`, plus any extra information the
 * customer typed. WhatsAppEnquiry.astro builds the same message in the
 * browser; `enquiryHref` here is the no-JS fallback (no reg).
 */
export type Enquiry = {
  id: string;
  /** Short name: radio label in the general form */
  label: string;
  /** Dialog heading when a button opens this enquiry directly */
  title: string;
  number: string;
  intro: string;
  outro: string;
  /** Presets only: show the optional "Anything else?" box (the general form always shows it) */
  extra?: boolean;
  /** Shown in the general form but can't be picked yet */
  comingSoon?: boolean;
};

const availability = 'Could you let me know your availability?';

const mot: Enquiry = {
  id: 'mot',
  label: 'MOT',
  title: 'Book an MOT',
  number: motWhatsApp.number,
  intro: "Hello Toyotech, I'd like to book an MOT for my car",
  outro: availability,
};

const servicePackage = (tier: string): Enquiry => ({
  id: `service-${tier.toLowerCase()}`,
  label: `${tier} service`,
  title: `Book a ${tier} service`,
  number: serviceWhatsApp.number,
  intro: `Hello Toyotech, I'd like to book a ${tier} service for my car`,
  outro: availability,
  extra: true,
});

/** Choices in the general form, opened by any WhatsApp button without its own enquiry. */
export const whatsappEnquiries: Enquiry[] = [
  mot,
  {
    id: 'service',
    label: 'Service',
    title: 'Book a service',
    number: serviceWhatsApp.number,
    intro: "Hello Toyotech, I'd like to book a service for my car",
    outro: availability,
  },
  {
    id: 'repair',
    label: 'Repair or quote',
    title: 'Repair or quote',
    number: serviceWhatsApp.number,
    intro: "Hello Toyotech, I'd like a quote for a repair on my car",
    outro: 'The problem is: ',
  },
  {
    id: 'tyres',
    label: 'Tyres',
    title: 'Tyres',
    number: motWhatsApp.number,
    intro: "Hello Toyotech, I'm looking for tyres for my car",
    outro: 'Could you let me know what you have?',
    comingSoon: true,
  },
];

/**
 * Enquiries a button opens directly (`<WhatsAppButton enquiry="mot" />`),
 * skipping the "what do you need?" choice: the MOT page asks for the reg
 * only; the servicing packages ask for the reg plus extra information.
 */
export const whatsappPresets: Enquiry[] = [
  mot,
  ...['Bronze', 'Silver', 'Gold'].map(servicePackage),
  {
    id: 'servicing',
    label: 'Servicing and repairs',
    title: 'Message the service garage',
    number: serviceWhatsApp.number,
    intro: "Hello Toyotech, I'd like help with servicing or a repair on my car",
    outro: 'Could you get back to me?',
    extra: true,
  },
];

const waLink = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

const whatsappMessage = 'Hello Toyotech, I am interested in booking a service or MOT. Could you let me know your availability?';

export const whatsapp = {
  number: serviceWhatsApp.number,
  display: serviceWhatsApp.display,
  href: waLink(serviceWhatsApp.number, whatsappMessage),
  lines: [serviceWhatsApp, motWhatsApp],
};

/** Plain wa.me link for an enquiry (no reg): what the button does without JS. */
export function enquiryHref(id?: string): string {
  const e = whatsappPresets.find((p) => p.id === id);
  return e ? waLink(e.number, `${e.intro}. ${e.outro}`.trim()) : whatsapp.href;
}

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
  { label: 'MOT Checks', path: '/mot' },
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
