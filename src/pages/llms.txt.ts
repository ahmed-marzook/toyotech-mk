import type { APIRoute } from 'astro';
import { site, address, phones, whatsapp, legal, serviceAreas, url } from '../config/site';
import { services } from '../content/services';
import { hybridModels } from '../content/hybrid-models';
import { googleReviews } from '../content/reviews';
import { getBuildHours } from '../lib/build-hours';

/**
 * /llms.txt — a plain-Markdown summary of the business for AI assistants
 * (the llmstxt.org convention). Same facts as the JSON-LD and the pages,
 * generated from the same config so the three never drift apart. Keep it
 * factual: no claims that aren't already on the site.
 */
export const GET: APIRoute = async ({ site: origin }) => {
  const abs = (path: string) => new URL(url(path), origin).href;
  const hours = await getBuildHours();

  const hoursLines = hours.map((h) =>
    h.closedFlag ? `- ${h.day}: Closed` : `- ${h.day}: ${h.open}–${h.close}`,
  );

  const body = `# ${site.name} (${site.altName})

> Independent garage and MOT centre in Bletchley, Milton Keynes, specialising in hybrid vehicles. MOTs, servicing, diagnostics and repairs for all makes and models, with genuine parts and warranty. Open 7 days a week, same-day bookings available.

## Key facts

- Business type: Car repair garage, MOT testing centre, hybrid vehicle specialist
- Address: 80-86 Tavistock Street, Bletchley, Milton Keynes, ${address.postcode}, United Kingdom
- Phone: ${phones.map((p) => p.display).join(', ')}
- WhatsApp (quickest way to book): ${phones[0].display} — ${whatsapp.href}
- Contact: ${site.contactName}
- Areas served: ${serviceAreas.join(', ')}
- Legal entity: ${legal.companyName}, registered in ${legal.jurisdiction}, company no. ${legal.companyNumber}
- Google rating: ${googleReviews.rating} from ${googleReviews.count} reviews (${googleReviews.listingUrl})

## Opening hours

${hoursLines.join('\n')}

Hours are kept up to date on the website's Contact page.

## Specialism: hybrid vehicles

Hybrid battery health checks, module-level diagnostics, repair and replacement, and hybrid system servicing (inverter coolant, battery cooling fan and filter). Models we work on:

${hybridModels.map((m) => `- ${m}`).join('\n')}

## Services

${services.map((s) => `- ${s.name}: ${s.description}`).join('\n')}

## Pages

- [Home](${abs('/')}): overview, opening hours, reviews and location
- [Services](${abs('/services')}): every service we offer
- [Hybrid battery repair](${abs('/hybrid-battery')}): symptoms of a failing hybrid battery, how we diagnose, repair or replace it, and the models covered
- [What's checked at an MOT](${abs('/mot-checks')}): plain-English guide to every part inspected at a car MOT
- [Contact and directions](${abs('/contact')}): phone numbers, WhatsApp, address and map
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
