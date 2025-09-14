
import React from 'react';
import App from './App';
import LoginPage from './components/LoginPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { UserProfile } from './types';

const Auth: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('isAuthenticated', false);
    const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('userProfile', {
        name: 'Eco Warrior',
        ecoPoints: 0,
        trips: 0,
        badges: [],
    });

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleSignup = (name: string) => {
        setUserProfile(prev => ({ 
            name: name || 'Eco Warrior',
            ecoPoints: 0,
            trips: 0,
            badges: [],
        }));
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        // Clear local storage state first
        setIsAuthenticated(false);
        setUserProfile({
            name: 'Eco Warrior',
            ecoPoints: 0,
            trips: 0,
            badges: [],
        });
        // Navigate to the root of the application. This ensures a clean
        // reload and that the startup script in index.tsx correctly
        // shows the static HTML front page since the user is no longer authenticated.
        window.location.href = '/';
    };

    if (!isAuthenticated) {
        // When the React app loads, if the user is not authenticated,
        // it will now always show the login page first.
        return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
    }

    return <App userProfile={userProfile} setUserProfile={setUserProfile} onLogout={handleLogout} />;
};

export default Auth;
