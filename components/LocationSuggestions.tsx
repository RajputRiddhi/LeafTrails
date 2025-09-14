import React from 'react';
import { POPULAR_INDIAN_LOCATIONS } from '../constants';

interface LocationSuggestionsProps {
  suggestions: string[];
  isLoading: boolean;
  onSelectLocation: (location: string) => void;
  showPopular: boolean;
}

const LocationSuggestions: React.FC<LocationSuggestionsProps> = ({ suggestions, isLoading, onSelectLocation, showPopular }) => {
  const hasSuggestions = suggestions.length > 0;
  
  // Render nothing if user is typing and there are no results (and not loading)
  if (!showPopular && !isLoading && !hasSuggestions) {
    return null; 
  }

  return (
    <div className="pt-6 mt-4 border-t border-gray-200 dark:border-gray-700">
      <h3 className="mb-3 text-sm font-semibold text-center text-gray-600 dark:text-gray-400">
        {showPopular ? 'Or pick a popular location' : 'Suggestions'}
      </h3>
      
      {isLoading && (
        <div className="flex justify-center">
            <div className="w-6 h-6 border-2 rounded-full border-t-eco-green border-gray-200 dark:border-gray-600 animate-spin"></div>
        </div>
      )}

      {!isLoading && (
        showPopular ? (
            <div className="flex flex-wrap justify-center gap-2">
                {POPULAR_INDIAN_LOCATIONS.map((location) => (
                    <button
                      key={location}
                      onClick={() => onSelectLocation(location)}
                      type="button"
                      className="px-3 py-1 text-sm font-medium transition-colors duration-200 bg-gray-100 rounded-full text-gray-700 hover:bg-eco-blue-light hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-eco-blue-dark"
                    >
                      {location}
                    </button>
                ))}
            </div>
        ) : (
            <div className="space-y-2">
                {suggestions.map((location) => (
                    <button
                      key={location}
                      onClick={() => onSelectLocation(location)}
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm font-medium transition-colors duration-200 bg-gray-100 rounded-md text-gray-700 hover:bg-eco-blue-light hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-eco-blue-dark"
                    >
                      {location}
                    </button>
                ))}
            </div>
        )
      )}
    </div>
  );
};

export default LocationSuggestions;
