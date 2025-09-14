// FIX: Import React to ensure consistent type resolution for React types like React.FC.
import React from 'react';

export type GeneralTravelMode = 'walk' | 'cycle' | 'bus' | 'car';
export type DetailedTravelMode = GeneralTravelMode | 'metro' | 'rapid_metro' | 'local_auto';

export interface RouteSegment {
  mode: DetailedTravelMode;
  duration: number; // in minutes
  distance: number; // in kilometers
  description: string;
}

export interface RouteOption {
  title: string;
  travelMode: GeneralTravelMode;
  duration: number; // in minutes
  distance: number; // in kilometers
  co2Emissions: number; // in grams
  ecoScore: number; // 1-100
  segments: RouteSegment[];
}

export interface UserProfile {
  name: string;
  ecoPoints: number;
  trips: number;
  badges: string[]; // Array of badge IDs
}

export interface AqiData {
  value: number;
  description: string;
}

export interface BadgeDefinition {
    id: string;
    name: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    condition: (profile: UserProfile) => boolean;
}