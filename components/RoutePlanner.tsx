import React, { useState, useEffect } from 'react';
import LocationSuggestions from './LocationSuggestions';
import { useDebounce } from '../hooks/useDebounce';
import { getLocationSuggestions } from '../services/geminiService';
import { POPULAR_INDIAN_LOCATIONS } from '../constants';

interface RoutePlannerProps {
  onSearch: (source: string, destination: string) => void;
  isLoading: boolean;
}

const popularRoutes = [
    { source: POPULAR_INDIAN_LOCATIONS[1], destination: POPULAR_INDIAN_LOCATIONS[8] }, // Delhi to Jaipur
    { source: POPULAR_INDIAN_LOCATIONS[0], destination: POPULAR_INDIAN_LOCATIONS[6] }, // Mumbai to Pune
    { source: POPULAR_INDIAN_LOCATIONS[2], destination: POPULAR_INDIAN_LOCATIONS[3] }, // Bangalore to Chennai
    { source: POPULAR_INDIAN_LOCATIONS[5], destination: POPULAR_INDIAN_LOCATIONS[11] }, // Hyderabad to Goa
];

const RoutePlanner: React.FC<RoutePlannerProps> = ({ onSearch, isLoading }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [activeInput, setActiveInput] = useState<'source' | 'destination' | null>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [query, setQuery] = useState('');
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length > 2) {
        setIsSuggestionsLoading(true);
        const results = await getLocationSuggestions(debouncedQuery);
        setSuggestions(results);
        setIsSuggestionsLoading(false);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
    setQuery(e.target.value);
  };

  const handleSelectLocation = (location: string) => {
    if (activeInput === 'source') {
      setSource(location);
    } else if (activeInput === 'destination') {
      setDestination(location);
    }
    setSuggestions([]);
    setQuery('');
  };
  
  const handleSelectPopularRoute = (route: { source: string; destination: string }) => {
    setSource(route.source);
    setDestination(route.destination);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (source.trim() && destination.trim()) {
      onSearch(source, destination);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 animate-fade-in">
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Plan Your Journey in India</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="source" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">From</label>
          <input
            id="source"
            type="text"
            value={source}
            onFocus={() => { setActiveInput('source'); setQuery(source); }}
            onChange={(e) => handleInputChange(e, setSource)}
            placeholder="e.g., India Gate, Delhi"
            autoComplete="off"
            className="w-full px-4 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="destination" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">To</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onFocus={() => { setActiveInput('destination'); setQuery(destination); }}
            onChange={(e) => handleInputChange(e, setDestination)}
            placeholder="e.g., Gateway of India, Mumbai"
            autoComplete="off"
            className="w-full px-4 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 font-bold text-white transition-transform duration-200 rounded-md shadow-md bg-eco-green hover:bg-eco-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900 active:scale-95"
        >
          {isLoading ? 'Finding Green Routes...' : 'Find Eco-Friendly Routes'}
        </button>
      </form>
      
      <div className="pt-6 mt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="mb-3 text-sm font-semibold text-center text-gray-600 dark:text-gray-400">
          Popular Routes
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
            {popularRoutes.map((route, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectPopularRoute(route)}
                  type="button"
                  className="px-3 py-1 text-sm font-medium transition-colors duration-200 bg-gray-100 rounded-full text-gray-700 hover:bg-eco-blue-light hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-eco-blue-dark"
                >
                  {route.source} → {route.destination}
                </button>
            ))}
        </div>
      </div>

      <LocationSuggestions 
        suggestions={suggestions}
        isLoading={isSuggestionsLoading}
        onSelectLocation={handleSelectLocation} 
        showPopular={query.length <= 2}
      />
    </div>
  );
};

export default RoutePlanner;