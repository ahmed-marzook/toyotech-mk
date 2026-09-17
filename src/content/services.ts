import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AppWindow,
  ArrowUpDown,
  BatteryCharging,
  Cable,
  CarFront,
  ClipboardCheck,
  Cog,
  Disc3,
  Engine,
  OctagonAlert,
  Settings2,
  ThermometerSnowflake,
  Wrench,
} from 'lucide-react';

export type Service = {
  slug: string;
  name: string;
  /** One-line summary for the home page */
  summary: string;
  description: string;
  icon: LucideIcon;
  /** Shown in the home-page preview (the services on the shop-front sign) */
  featured?: boolean;
};

// Service list taken from the shop banner and shop-front sign.
export const services: Service[] = [
  {
    slug: 'mot',
    name: 'MOT & MOT Repairs',
    summary: 'MOT testing with same-day slots.',
    description:
      'MOT testing for cars and light vans, plus any repairs needed to get you through. We explain advisories before any work is done.',
    icon: ClipboardCheck,
    featured: true,
  },
  {
    slug: 'servicing',
    name: 'Servicing',
    summary: 'Interim and full services for all makes.',
    description:
      'Interim and full servicing for all makes and models — oil, filters, fluids and a thorough multi-point inspection, using genuine parts.',
    icon: Wrench,
    featured: true,
  },
  {
    slug: 'brakes',
    name: 'Brakes & Brake Pads',
    summary: 'Pads, discs and brake fluid.',
    description: 'Brake pads, discs, callipers and brake fluid changes to keep you stopping safely.',
    icon: Disc3,
    featured: true,
  },
  {
    slug: 'diagnostics',
    name: 'Diagnostics',
    summary: 'Warning lights read and fixed.',
    description:
      'Engine management and warning-light diagnostics using up-to-date equipment, so we find the actual fault instead of guessing.',
    icon: Activity,
    featured: true,
  },
  {
    slug: 'hybrid-battery',
    name: 'Hybrid Battery',
    summary: 'Hybrid battery testing and repair.',
    description:
      'Our speciality. Hybrid battery health checks, diagnostics and repair, plus hybrid system servicing for Toyota, Lexus and other hybrids.',
    icon: BatteryCharging,
    featured: true,
  },
  {
    slug: 'engine',
    name: 'Engine',
    summary: 'Engine repairs and faults.',
    description: 'Engine faults, misfires, leaks, timing belts and general engine repairs.',
    icon: Engine,
    featured: true,
  },
  {
    slug: 'gearbox',
    name: 'Gearbox',
    summary: 'Manual and automatic gearbox work.',
    description: 'Gearbox diagnosis and repair for manual and automatic transmissions.',
    icon: Cog,
  },
  {
    slug: 'clutch',
    name: 'Clutch',
    summary: 'Clutch replacement and repair.',
    description: 'Slipping, juddering or heavy clutch? Clutch and flywheel replacement for all makes.',
    icon: Settings2,
  },
  {
    slug: 'power-steering',
    name: 'Power Steering',
    summary: 'Steering faults and leaks.',
    description: 'Power steering pumps, racks, electric steering faults and fluid leaks.',
    icon: CarFront,
  },
  {
    slug: 'ac-heater',
    name: 'AC & Heater',
    summary: 'Air-con regas and heater repairs.',
    description: 'Air-conditioning regas and repairs, heater matrix and blower faults.',
    icon: ThermometerSnowflake,
  },
  {
    slug: 'abs',
    name: 'ABS',
    summary: 'ABS warning lights and sensors.',
    description: 'ABS warning-light diagnosis, wheel-speed sensors and ABS module faults.',
    icon: OctagonAlert,
  },
  {
    slug: 'suspension',
    name: 'Suspension',
    summary: 'Shocks, springs and knocks.',
    description: 'Shock absorbers, springs, bushes, drop links and those knocking noises over bumps.',
    icon: ArrowUpDown,
  },
  {
    slug: 'glass',
    name: 'Glass',
    summary: 'Windscreen and window glass.',
    description: 'Windscreen and window glass replacement and repair.',
    icon: AppWindow,
  },
  {
    slug: 'electrical',
    name: 'Electrical Work',
    summary: 'Wiring, lights and electrics.',
    description: 'Wiring faults, lighting, batteries, alternators, starter motors and general auto electrics.',
    icon: Cable,
  },
];
