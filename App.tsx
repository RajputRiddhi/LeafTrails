import React, { useState, useCallback, useEffect } from 'react';
import type { AqiData, RouteOption, UserProfile, BadgeDefinition } from './types';
import { BADGES } from './constants';
import { getEcoRoutes } from './services/geminiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import RoutePlanner from './components/RoutePlanner';
import RouteResults from './components/RouteResults';
import UserProfileCard from './components/UserProfileCard';
import AqiDisplay from './components/AqiDisplay';
import LoadingSpinner from './components/LoadingSpinner';

interface AppProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onLogout: () => void;
}

const App: React.FC<AppProps> = ({ userProfile, setUserProfile, onLogout }) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [aqiData, setAqiData] = useState<AqiData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<BadgeDefinition | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleRouteSearch = async (source: string, destination: string) => {
    setIsLoading(true);
    setError(null);
    setRoutes([]);
    setAqiData(null);
    try {
      const result = await getEcoRoutes(source, destination);
      if (result) {
        setRoutes(result.routes);
        setAqiData(result.aqi);
      } else {
        setError('Could not fetch eco-friendly routes. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const checkForNewBadges = useCallback((updatedProfile: UserProfile, currentBadges: string[]) => {
    const newlyEarned = BADGES.find(badge => 
        !currentBadges.includes(badge.id) &&
        badge.condition(updatedProfile)
    );
    if (newlyEarned) {
        setNewlyUnlockedBadge(newlyEarned);
        setTimeout(() => setNewlyUnlockedBadge(null), 5000); // Hide after 5 seconds
        return [...updatedProfile.badges, newlyEarned.id];
    }
    return updatedProfile.badges;
  }, []);


  const handleCompleteTrip = useCallback((route: RouteOption) => {
    setUserProfile(prevProfile => {
        const updatedProfile = {
            ...prevProfile,
            ecoPoints: prevProfile.ecoPoints + route.ecoScore,
            trips: prevProfile.trips + 1,
            badges: prevProfile.badges, // temp
        };
        
        const updatedBadges = checkForNewBadges(updatedProfile, prevProfile.badges);
        
        return {...updatedProfile, badges: updatedBadges};
    });
    setRoutes([]);
    setAqiData(null);
  }, [setUserProfile, checkForNewBadges]);
  

  return (
    <div className="min-h-screen font-sans text-gray-800 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 dark:text-gray-200">
      <Header theme={theme} toggleTheme={toggleTheme} userEcoPoints={userProfile.ecoPoints} onLogout={onLogout} />

      {newlyUnlockedBadge && (
        <div className="fixed top-20 right-5 z-50 p-4 bg-eco-green-dark text-white rounded-lg shadow-xl animate-slide-in">
          <h3 className="font-bold">Achievement Unlocked!</h3>
          <p>{newlyUnlockedBadge.name}: {newlyUnlockedBadge.description}</p>
        </div>
      )}

      <main className="container p-4 mx-auto md:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <RoutePlanner onSearch={handleRouteSearch} isLoading={isLoading} />
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!isLoading && routes.length > 0 && <RouteResults routes={routes} onCompleteTrip={handleCompleteTrip} />}
            {!isLoading && routes.length === 0 && !error && (
                 <div className="p-8 text-center bg-white border-2 border-dashed rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Ready to start your green journey?</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Enter a source and destination above to discover sustainable travel options.</p>
                </div>
            )}
          </div>
          
          <div className="space-y-8 lg:col-span-1">
            <UserProfileCard userProfile={userProfile} />
            {aqiData && <AqiDisplay aqiData={aqiData} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;