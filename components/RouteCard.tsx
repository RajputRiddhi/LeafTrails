import React from 'react';
import type { RouteOption } from '../types';
import { WalkIcon, CycleIcon, BusIcon, CarIcon, LeafIcon, MetroIcon, AutoIcon } from './icons/TravelModeIcons';

interface RouteCardProps {
  route: RouteOption;
  onShowDetails: (route: RouteOption) => void;
  onCompleteTrip: (route: RouteOption) => void;
}

const ICONS: { [key in RouteOption['travelMode']]: React.ReactNode } = {
  walk: <WalkIcon className="w-6 h-6" />,
  cycle: <CycleIcon className="w-6 h-6" />,
  bus: <BusIcon className="w-6 h-6" />,
  car: <CarIcon className="w-6 h-6" />,
};

const renderRouteIcon = (route: RouteOption) => {
  // For simple, single-mode routes
  if (route.travelMode !== 'bus' || route.segments.length <= 1) {
    return ICONS[route.travelMode];
  }

  // For multi-modal public transport, find the most prominent modes
  const prominentModes = [...new Set(route.segments.map(s => s.mode).filter(m => m !== 'walk'))];

  const icons = prominentModes.map(mode => {
    switch (mode) {
      case 'metro':
      case 'rapid_metro':
        return <MetroIcon key="metro" className="w-6 h-6" />;
      case 'bus':
        return <BusIcon key="bus" className="w-6 h-6" />;
      case 'local_auto':
        return <AutoIcon key="auto" className="w-6 h-6" />;
      default:
        return null;
    }
  }).filter(Boolean);

  if (icons.length === 0) {
    return ICONS.bus; // Fallback to bus icon if only walking segments are part of PT
  }

  if (icons.length > 1) {
    // Display first two prominent icons stacked to indicate a mixed route
    return (
      <div className="flex items-center -space-x-2.5">
        <div className="z-10">{icons[0]}</div>
        <div>{icons[1]}</div>
      </div>
    );
  }
  
  return icons[0];
};

const getEcoScoreColor = (score: number) => {
  if (score >= 80) return 'text-eco-green-dark bg-eco-green-light/20';
  if (score >= 50) return 'text-yellow-600 bg-yellow-400/20';
  return 'text-red-600 bg-red-400/20';
};

const RouteCard: React.FC<RouteCardProps> = ({ route, onShowDetails, onCompleteTrip }) => {
  const handleCompleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening when complete button is clicked
    onCompleteTrip(route);
  };
  
  return (
    <div 
      onClick={() => onShowDetails(route)}
      className="p-4 transition-all duration-300 border-l-4 rounded-r-lg shadow-sm cursor-pointer bg-gray-50 dark:bg-gray-700/50 hover:shadow-md hover:scale-[1.02]" 
      style={{ borderLeftColor: route.ecoScore >= 80 ? '#10B981' : route.ecoScore >= 50 ? '#F59E0B' : '#EF4444' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onShowDetails(route)}
      aria-label={`View details for ${route.title} route`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center p-3 text-white rounded-full min-w-[56px] min-h-[56px] bg-eco-blue-light dark:bg-eco-blue-dark">
            {renderRouteIcon(route)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{route.title}</h3>
            <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span>🕒 {route.duration} min</span>
              <span>📏 {route.distance} km</span>
              <span>💨 {route.co2Emissions}g CO₂</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-start sm:flex-col sm:items-end">
             <div className="text-xs font-semibold text-eco-blue dark:text-eco-blue-light sm:hidden">Click to see details</div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold text-sm ${getEcoScoreColor(route.ecoScore)}`}>
                <LeafIcon className="w-4 h-4" />
                <span>{route.ecoScore}</span>
            </div>
            <button
                onClick={handleCompleteClick}
                className="px-3 py-1 text-sm font-semibold text-white transition-colors duration-200 rounded-full bg-eco-green hover:bg-eco-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green"
            >
                Complete Trip
            </button>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;