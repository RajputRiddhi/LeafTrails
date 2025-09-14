import React from 'react';
import ThemeToggle from './ThemeToggle';
import { LeafIcon } from './icons/TravelModeIcons';

const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);


interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  userEcoPoints: number;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, userEcoPoints, onLogout }) => {
  return (
    <header className="sticky top-0 z-10 w-full shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-8">
        <div className="flex items-center gap-3">
          <img src="assets/img/logo.png" alt="LeafTrails Logo" className="object-contain w-10 h-10" />
          <h1 className="text-xl font-bold tracking-tight md:text-2xl text-eco-green-dark dark:text-eco-green-light">
            LeafTrails
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-green-700 rounded-full bg-green-100 dark:bg-green-900 dark:text-green-300">
            <LeafIcon className="w-4 h-4" />
            <span>{userEcoPoints.toLocaleString()} Points</span>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={onLogout}
            className="p-2 text-gray-600 transition-colors duration-200 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-eco-blue"
            aria-label="Logout"
            title="Logout"
          >
            <LogoutIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;