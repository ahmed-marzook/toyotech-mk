import { useEffect, useState } from 'react';
import { OPENING_HOURS_CSV_URL, TIMEZONE, fallbackHours } from '../config/site';

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_RE = /^([01]?\d|2[0-3]):[0-5]\d$/;

/** Minimal CSV parser: handles quoted fields, escaped quotes and CRLF. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/** CSV text → sorted `{ day, open, close, closedFlag, note }` rows. Throws if unusable. */
export function parseHours(text) {
  const [header, ...body] = parseCsv(text).map((r) => r.map((f) => f.trim()));
  if (!header) throw new Error('Empty CSV');
  const col = Object.fromEntries(header.map((h, i) => [h.toLowerCase(), i]));
  for (const required of ['day', 'open_time', 'close_time', 'is_closed']) {
    if (!(required in col)) throw new Error(`Missing column: ${required}`);
  }

  const byDay = new Map();
  for (const r of body) {
    const rawDay = r[col.day] ?? '';
    const day = DAY_ORDER.find((d) => d.toLowerCase() === rawDay.toLowerCase());
    if (!day) continue;
    const open = r[col.open_time] ?? '';
    const close = r[col.close_time] ?? '';
    const hasValidTimes = TIME_RE.test(open) && TIME_RE.test(close);
    const closedFlag = (r[col.is_closed] ?? '').toLowerCase() === 'true' || !hasValidTimes;
    const note = col.note !== undefined ? r[col.note] || undefined : undefined;
    byDay.set(day, { day, open: closedFlag ? '' : open, close: closedFlag ? '' : close, closedFlag, note });
  }
  if (byDay.size === 0) throw new Error('No valid rows');
  return DAY_ORDER.filter((d) => byDay.has(d)).map((d) => byDay.get(d));
}

/** Current weekday name and minutes-since-midnight in the shop's timezone. */
function nowInShopTz() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIMEZONE,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type)?.value ?? '';
  return { day: get('weekday'), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** "08:30" → "8:30am" */
function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 || 12;
  return m === 0 ? `${hour12}${suffix}` : `${hour12}:${String(m).padStart(2, '0')}${suffix}`;
}

export default function OpeningHours({ dark = false }) {
  const [hours, setHours] = useState(fallbackHours);
  const [status, setStatus] = useState('loading'); // loading | live | fallback
  const [now, setNow] = useState(null); // null during SSR so markup matches on hydrate

  useEffect(() => {
    const controller = new AbortController();
    fetch(OPENING_HOURS_CSV_URL, { signal: controller.signal, cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        setHours(parseHours(text));
        setStatus('live');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.warn('Opening hours: using fallback —', err.message);
        setStatus('fallback');
      });

    setNow(nowInShopTz());
    const timer = setInterval(() => setNow(nowInShopTz()), 60_000);
    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, []);

  const today = now && hours.find((h) => h.day === now.day);
  const isOpen =
    today && !today.closedFlag && now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close);

  // slate-600, not 500: 500 drops below 4.5:1 on the tinted "today" row
  const muted = dark ? 'text-white/70' : 'text-slate-600';

  return (
    <div className={dark ? 'text-white' : 'text-slate-800'}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-navy'}`}>Opening hours</h2>
        {now && (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${
              isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-brand-red-dark'
            }`}
            aria-live="polite"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-brand-red'}`} />
            {isOpen ? 'Open now' : 'Closed'}
          </span>
        )}
      </div>

      <ul className={`divide-y ${dark ? 'divide-white/10' : 'divide-slate-200'}`}>
        {hours.map((h) => {
          const isToday = now?.day === h.day;
          return (
            <li
              key={h.day}
              className={`flex items-start justify-between gap-4 px-3 py-3 ${
                isToday ? (dark ? 'rounded-lg bg-white/10' : 'rounded-lg bg-brand-blue/10') : ''
              }`}
              aria-current={isToday ? 'date' : undefined}
            >
              <div>
                <span className="font-semibold">
                  {h.day}
                  {isToday && <span className={`ml-2 text-xs font-bold uppercase ${dark ? 'text-white' : 'text-brand-red-dark'}`}>Today</span>}
                </span>
                {h.note && <p className={`text-sm ${muted}`}>{h.note}</p>}
              </div>
              <span className={`shrink-0 font-semibold tabular-nums ${h.closedFlag ? (dark ? 'text-white' : 'text-brand-red-dark') : ''}`}>
                {h.closedFlag ? 'Closed' : `${formatTime(h.open)} – ${formatTime(h.close)}`}
              </span>
            </li>
          );
        })}
      </ul>

      {status === 'fallback' && (
        <p className={`mt-3 text-xs ${muted}`}>
          Couldn’t load the latest hours — showing our usual times. Message us to confirm.
        </p>
      )}
    </div>
  );
}
