
import type { BadgeDefinition } from './types';
import { GreenLeafIcon, FirstTripIcon, CarbonSaverIcon, EcoHeroIcon } from './components/icons/BadgeIcons';

export const BADGES: BadgeDefinition[] = [
  {
    id: 'first-trip',
    name: 'Green Starter',
    description: 'Complete your first eco-friendly trip.',
    icon: FirstTripIcon,
    condition: (profile) => profile.trips >= 1,
  },
  {
    id: 'eco-pioneer',
    name: 'Eco Pioneer',
    description: 'Earn 500 eco-points.',
    icon: GreenLeafIcon,
    condition: (profile) => profile.ecoPoints >= 500,
  },
  {
    id: 'carbon-saver',
    name: 'Carbon Saver',
    description: 'Complete 10 trips.',
    icon: CarbonSaverIcon,
    condition: (profile) => profile.trips >= 10,
  },
  {
    id: 'eco-hero',
    name: 'Eco Hero',
    description: 'Earn 2500 eco-points.',
    icon: EcoHeroIcon,
    condition: (profile) => profile.ecoPoints >= 2500,
  },
];

export const POPULAR_INDIAN_LOCATIONS: string[] = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Goa',
];
