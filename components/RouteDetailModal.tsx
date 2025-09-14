import React, { useEffect, useMemo } from 'react';
import type { RouteOption, DetailedTravelMode } from '../types';
import { WalkIcon, CycleIcon, BusIcon, CarIcon, LeafIcon, MetroIcon, AutoIcon } from './icons/TravelModeIcons';

interface RouteDetailModalProps {
  route: RouteOption;
  onClose: () => void;
  onCompleteTrip: (route: RouteOption) => void;
}

const ICONS: { [key in DetailedTravelMode]: React.ReactNode } = {
  walk: <WalkIcon className="w-5 h-5" />,
  cycle: <CycleIcon className="w-5 h-5" />,
  bus: <BusIcon className="w-5 h-5" />,
  car: <CarIcon className="w-5 h-5" />,
  metro: <MetroIcon className="w-5 h-5" />,
  rapid_metro: <MetroIcon className="w-5 h-5" />,
  local_auto: <AutoIcon className="w-5 h-5" />,
};

const getEcoScoreColor = (score: number) => {
  if (score >= 80) return 'text-eco-green-dark';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

const RouteDetailModal: React.FC<RouteDetailModalProps> = ({ route, onClose, onCompleteTrip }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleCompleteTrip = () => {
    onCompleteTrip(route);
    onClose();
  }

  const routeTitle = useMemo(() => {
    if (route.travelMode === 'bus') return 'Public Transport';
    return route.travelMode.charAt(0).toUpperCase() + route.travelMode.slice(1);
  }, [route.travelMode]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="route-details-title"
    >
      <div
        className="relative w-full max-w-lg p-6 overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800 animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-gray-500 rounded-full hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <h2 id="route-details-title" className="pr-8 mb-1 text-2xl font-bold text-gray-800 dark:text-white">
          {routeTitle} Details
        </h2>
        
        {/* Summary Stats */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-4 mb-4 text-sm text-gray-600 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <span>Total Time: <span className="font-semibold text-gray-800 dark:text-gray-200">{route.duration} min</span></span>
            <span>Total Distance: <span className="font-semibold text-gray-800 dark:text-gray-200">{route.distance} km</span></span>
            <span>CO₂ Emissions: <span className="font-semibold text-gray-800 dark:text-gray-200">{route.co2Emissions}g</span></span>
            <span className={`font-semibold flex items-center gap-1 ${getEcoScoreColor(route.ecoScore)}`}>
              <LeafIcon className="w-4 h-4" /> Eco Score: {route.ecoScore}
            </span>
        </div>

        {/* Segments */}
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {route.segments.map((segment, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-eco-blue">
                            {ICONS[segment.mode]}
                        </div>
                        {index < route.segments.length - 1 && (
                            <div className="w-px h-6 mt-1 bg-gray-300 dark:bg-gray-600"></div>
                        )}
                    </div>
                    <div className="flex-1 pb-1">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{segment.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {segment.duration} min &bull; {segment.distance} km
                        </p>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
            <button
                onClick={handleCompleteTrip}
                className="w-full px-4 py-3 font-bold text-white transition-transform duration-200 rounded-md shadow-md bg-eco-green hover:bg-eco-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-dark dark:focus:ring-offset-gray-900 active:scale-95"
            >
               Complete This Trip & Earn {route.ecoScore} Points
            </button>
        </div>

      </div>
    </div>
  );
};

export default RouteDetailModal;
