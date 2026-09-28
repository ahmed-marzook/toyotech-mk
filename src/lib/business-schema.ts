import { site, address, phones, legal, serviceAreas } from '../config/site';

/** Site origin with base path, e.g. "https://toyotech.co.uk/" */
export function siteOrigin(site: URL | undefined): string {
  return new URL(import.meta.env.BASE_URL, site).href;
}

/** Stable @id for the business entity, shared by every JSON-LD block. */
export const businessId = (origin: string) => `${origin}#business`;

export const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: '80-86 Tavistock Street',
  addressLocality: 'Bletchley',
  addressRegion: 'Milton Keynes',
  postalCode: address.postcode,
  addressCountry: 'GB',
};

export const areaServed = serviceAreas.map((name) => ({ '@type': 'Place', name }));

/**
 * The minimum needed to identify the business on pages other than Home.
 * Same @id as the full block on Home, so crawlers merge them into one
 * entity instead of seeing a second, thinner business.
 */
export function businessRef(origin: string) {
  return {
    '@type': 'AutoRepair',
    '@id': businessId(origin),
    name: site.name,
    alternateName: site.altName,
    legalName: legal.companyName,
    url: origin,
    telephone: phones[0].tel,
    address: postalAddress,
  };
}
