import React, { useState } from 'react';
import type { RouteOption } from '../types';
import RouteCard from './RouteCard';
import RouteDetailModal from './RouteDetailModal';

interface RouteResultsProps {
  routes: RouteOption[];
  onCompleteTrip: (route: RouteOption) => void;
}

const RouteResults: React.FC<RouteResultsProps> = ({ routes, onCompleteTrip }) => {
  const [detailedRoute, setDetailedRoute] = useState<RouteOption | null>(null);

  const handleShowDetails = (route: RouteOption) => {
    setDetailedRoute(route);
  };

  const handleCloseModal = () => {
    setDetailedRoute(null);
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 animate-slide-in">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Your Green Options</h2>
        <div className="space-y-4">
          {routes.map((route, index) => (
            <RouteCard key={index} route={route} onShowDetails={handleShowDetails} onCompleteTrip={onCompleteTrip} />
          ))}
        </div>
      </div>
      {detailedRoute && (
        <RouteDetailModal 
          route={detailedRoute} 
          onClose={handleCloseModal} 
          onCompleteTrip={onCompleteTrip}
        />
      )}
    </>
  );
};

export default RouteResults;