/**
 * Servicing packages shown on the Services page. Each one has its own
 * WhatsApp button (`enquiry` = an id from `whatsappPresets` in
 * src/config/site.ts) that asks for the reg plus extra information and goes
 * to the servicing line.
 *
 * EXAMPLE CONTENTS: the Bronze/Silver/Gold inclusions below are typical UK
 * interim/full/major service items, pre-filled as a starting point. Confirm
 * them with Mumthaz (ANSWERS.txt Q40). No prices, by decision (Q16).
 */
export type ServicePackage = {
  tier: 'Bronze' | 'Silver' | 'Gold';
  enquiry: string;
  name: string;
  /** Who it suits / how often */
  summary: string;
  /** "Everything in X, plus:" heading, if it builds on a lower tier */
  builds?: string;
  includes: string[];
};

export const servicePackages: ServicePackage[] = [
  {
    tier: 'Bronze',
    enquiry: 'service-bronze',
    name: 'Bronze: interim service',
    summary: 'A check-up between full services. Good every 6 months or 6,000 miles, or for low-mileage cars.',
    includes: [
      'Engine oil and oil filter change',
      'Top up screenwash, coolant and brake fluid',
      'Tyre tread and pressure check',
      'Lights, horn and wipers check',
      'Visual brake check',
      'Battery check',
    ],
  },
  {
    tier: 'Silver',
    enquiry: 'service-silver',
    name: 'Silver: full service',
    summary: 'A thorough yearly service. Recommended every 12 months or 12,000 miles.',
    builds: 'Bronze',
    includes: [
      'Air filter replacement',
      'Brake pads and discs measured',
      'Steering and suspension check',
      'Exhaust and emissions check',
      'Drive belt and hoses check',
      'Diagnostic scan for fault codes',
    ],
  },
  {
    tier: 'Gold',
    enquiry: 'service-gold',
    name: 'Gold: major service',
    summary: 'The most thorough service. Recommended every 24 months or 24,000 miles.',
    builds: 'Silver',
    includes: [
      'Cabin (pollen) filter replacement',
      'Spark plugs (petrol) or fuel filter (diesel)',
      'Brake fluid change',
      'Coolant condition check',
      'Hybrid battery health check (hybrid cars)',
    ],
  },
];
