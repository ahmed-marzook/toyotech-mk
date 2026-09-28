import { fallbackHours, OPENING_HOURS_CSV_URL, type HoursRow } from '../config/site';
import { parseHours } from '../components/OpeningHours.jsx';

let cached: Promise<HoursRow[]> | undefined;

/**
 * Opening hours read from the published Google Sheet at build time, falling
 * back to `fallbackHours` if the fetch fails. Used by the JSON-LD and
 * /llms.txt, which crawlers read without running the client-side widget.
 * Fetched once per build.
 */
export function getBuildHours(): Promise<HoursRow[]> {
  cached ??= fetch(OPENING_HOURS_CSV_URL)
    .then(async (res) => (res.ok ? (parseHours(await res.text()) as HoursRow[]) : fallbackHours))
    .catch(() => fallbackHours);
  return cached;
}
