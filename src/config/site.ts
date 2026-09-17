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

/** Google Business listing (Toyotech Hybrid Autos) */
const googlePlaceId = 'ChIJdd_Of5tVdkgROhBlr-LHD4U';
const mapQuery = 'Toyotech Hybrid Autos, 80-86 Tavistock Street, Bletchley, Milton Keynes MK2 2PB';

export const map = {
  /** Keyless Google Maps embed — no API key needed */
  embedUrl: `https://maps.google.com/maps?hl=en&q=${encodeURIComponent(mapQuery)}&z=16&output=embed`,
  /** Opens the listing in Google Maps (app on mobile) */
  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}&query_place_id=${googlePlaceId}`,
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
