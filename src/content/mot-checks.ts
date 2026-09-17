import type { LucideIcon } from 'lucide-react';
import { CarFront, Disc3, Fuel, Lightbulb, ScanLine, Settings2 } from 'lucide-react';

/**
 * The parts a tester inspects at a car MOT, grouped for readability.
 *
 * Source: DVSA's "Car parts checked at an MOT"
 * (https://www.gov.uk/government/publications/car-parts-checked-at-an-mot).
 * Contains public sector information licensed under the Open Government
 * Licence v3.0 — reworded here rather than copied, so the page isn't
 * duplicate content and reads for customers rather than testers.
 *
 * If DVSA revise the list, update this file — the page renders straight from it.
 */

export type MotCheckGroup = {
  slug: string;
  title: string;
  icon: LucideIcon;
  /** Why a customer should care about this group */
  intro: string;
  items: { name: string; description: string }[];
};

export const motCheckGroups: MotCheckGroup[] = [
  {
    slug: 'brakes-tyres-wheels',
    title: 'Brakes, tyres and wheels',
    icon: Disc3,
    intro: 'The most common reason cars fail. Worth checking yourself before the test.',
    items: [
      {
        name: 'Brakes',
        description:
          'Condition, operation and braking performance are all measured. Anti-lock brakes and electronic stability control are checked where fitted, along with any related warning lights.',
      },
      {
        name: 'Tyres and wheels',
        description:
          'Condition, security, size and type, plus tread depth — the legal minimum is 1.6mm across the central three-quarters of the tyre. Cars registered from 2012 also have their tyre pressure monitoring system checked.',
      },
    ],
  },
  {
    slug: 'steering-suspension',
    title: 'Steering and suspension',
    icon: Settings2,
    intro: 'How the car holds the road, and whether anything is worn or leaking.',
    items: [
      {
        name: 'Steering',
        description:
          'Condition, fluid level and operation, and whether any previous repairs were done properly. Electronic power steering and steering lock warning lights are checked too.',
      },
      {
        name: 'Suspension',
        description:
          'Shock absorbers, springs, bushes and joints are inspected for wear, damage and correct operation.',
      },
    ],
  },
  {
    slug: 'lights-visibility',
    title: 'Lights and visibility',
    icon: Lightbulb,
    intro: 'Being able to see, and be seen. A blown bulb is an easy fail to avoid.',
    items: [
      {
        name: 'Lights',
        description:
          'Condition and operation of all lamps, including HID and LED units, headlamp levelling, cleaning and aim, and the main beam warning light.',
      },
      {
        name: 'Windscreen',
        description:
          'Condition and the driver’s view of the road. Chips and cracks in the area swept by the wipers directly in front of the driver can fail.',
      },
      {
        name: 'Wipers and washers',
        description: 'Both must work well enough to give the driver a clear view of the road.',
      },
      {
        name: 'Mirrors',
        description:
          'The required number must be fitted, in good condition and securely mounted. Indirect vision devices are inspected where fitted.',
      },
      { name: 'Horn', description: 'Must work correctly and be of a type suitable for the vehicle.' },
    ],
  },
  {
    slug: 'body-interior',
    title: 'Body, structure and interior',
    icon: CarFront,
    intro: 'Structural safety, and the parts that protect you in a collision.',
    items: [
      {
        name: 'Body and vehicle structure',
        description:
          'Must be free from excessive corrosion or damage in specified areas, with no sharp edges that could cause injury.',
      },
      {
        name: 'Seat belts',
        description:
          'All required belts must be fitted, of the right type, secure and working properly. Airbag and pretensioner warning lamps are checked.',
      },
      {
        name: 'Seats',
        description:
          'The driver’s seat must adjust, and all seats must be secure with backrests that can be fixed upright.',
      },
      {
        name: 'Doors',
        description:
          'Must latch securely. Front doors must open from inside and outside, rear doors from outside. Hinges and catches are checked.',
      },
      { name: 'Bonnet', description: 'Must close securely.' },
      { name: 'Load security', description: 'The boot or tailgate must close properly.' },
      {
        name: 'Towbars',
        description:
          'Security, condition and any repairs, plus the electrical socket, speedometer and engine mountings.',
      },
    ],
  },
  {
    slug: 'fuel-exhaust',
    title: 'Fuel and exhaust',
    icon: Fuel,
    intro: 'Leaks, noise and what comes out of the tailpipe.',
    items: [
      {
        name: 'Fuel system',
        description: 'No leaks, hoses and pipes secure, and the fuel cap fastening and sealing correctly.',
      },
      {
        name: 'Exhaust emissions',
        description:
          'Measured against the standard for the vehicle’s age and fuel type. Diesels are also checked for visible smoke.',
      },
      {
        name: 'Exhaust system',
        description:
          'Secure, complete, without serious leaks and not noticeably louder than a standard system. The catalytic converter must be present where one was fitted as standard.',
      },
    ],
  },
  {
    slug: 'identification-electrics',
    title: 'Identification and electrics',
    icon: ScanLine,
    intro: 'Making sure the car is what the paperwork says it is.',
    items: [
      {
        name: 'Registration plates',
        description: 'Condition, security, colour and the way the characters are formed and spaced.',
      },
      {
        name: 'Vehicle identification number (VIN)',
        description:
          'Cars registered from 1980 must display a single VIN, and it must match the vehicle’s records.',
      },
      { name: 'Electrical', description: 'Visible wiring and the battery are checked for condition and security.' },
    ],
  },
];

/** Things people assume are covered by an MOT but aren't. */
export const notCovered = [
  'The condition of the engine, clutch and gearbox',
  'Whether the car is due a service, or the state of the oil and filters',
  'Air conditioning performance',
  'General mechanical wear that isn’t a safety or emissions item',
];
