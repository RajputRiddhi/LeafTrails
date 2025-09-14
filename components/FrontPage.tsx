
import React from 'react';
import { LeafIcon } from './icons/TravelModeIcons';

interface FrontPageProps {
    onGetStarted: () => void;
}

// Icons for the features section
const MapPinLeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <path d="M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path d="M12 12v-2" />
        <path d="M12 7V5" />
        <path d="m14.12 8.88.7-.7" />
        <path d="m7.18 8.88.7.7" />
    </svg>
);


const ChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 3v18h18" />
        <path d="m18 9-5 5-4-4-3 3" />
    </svg>
);

const BadgeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);


const FrontPage: React.FC<FrontPageProps> = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen font-sans antialiased text-gray-800 bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-10 p-4 bg-transparent">
                <div className="container flex items-center justify-between mx-auto">
                    <div className="flex items-center gap-2">
                        <LeafIcon className="w-8 h-8 text-eco-green" />
                        <span className="text-xl font-bold text-gray-800 dark:text-white">LeafTrails</span>
                    </div>
                    <button
                        onClick={onGetStarted}
                        className="hidden px-5 py-2 font-semibold text-white transition-colors duration-300 rounded-md sm:block bg-eco-green hover:bg-eco-green-dark focus:outline-none focus:ring-2 focus:ring-eco-green-dark focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        Get Started
                    </button>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative flex items-center justify-center min-h-screen px-4 pt-20 pb-10 text-center bg-white dark:bg-gray-800/50">
                    <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>

                    <div className="relative z-10 max-w-3xl animate-fade-in">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                            Travel Smart. <span className="text-eco-green-dark dark:text-eco-green-light">Live Green.</span>
                        </h1>
                        <p className="max-w-xl mx-auto mt-6 text-lg text-gray-600 dark:text-gray-300">
                            Your personal guide to sustainable travel. Find the most eco-friendly routes, reduce your carbon footprint, and join a community making a difference.
                        </p>
                        <button
                            onClick={onGetStarted}
                            className="px-8 py-4 mt-10 text-lg font-bold text-white transition-transform duration-200 transform rounded-full shadow-xl bg-eco-green hover:bg-eco-green-dark focus:outline-none focus:ring-4 focus:ring-eco-green/50 active:scale-95 hover:scale-105"
                        >
                            Start Your Green Journey
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-gray-100 sm:py-24 dark:bg-gray-900">
                    <div className="container px-4 mx-auto">
                        <div className="max-w-xl mx-auto mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Why Choose LeafTrails?</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                We make sustainable travel simple, rewarding, and accessible for everyone.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                            <div className="p-8 text-center transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:-translate-y-2">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-5 text-white rounded-full bg-eco-green">
                                    <MapPinLeafIcon className="w-8 h-8" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Eco-Friendly Routes</h3>
                                <p className="text-gray-600 dark:text-gray-400">Compare walking, cycling, public transit, and car routes to find the greenest option for your journey.</p>
                            </div>
                            <div className="p-8 text-center transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:-translate-y-2">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-5 text-white rounded-full bg-eco-green">
                                    <ChartIcon className="w-8 h-8" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Track Your Impact</h3>
                                <p className="text-gray-600 dark:text-gray-400">See your CO2 savings and track your progress over time. Every green trip makes a difference!</p>
                            </div>
                            <div className="p-8 text-center transition-transform duration-300 transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:-translate-y-2">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-5 text-white rounded-full bg-eco-green">
                                    <BadgeIcon className="w-8 h-8" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Earn Rewards</h3>
                                <p className="text-gray-600 dark:text-gray-400">Collect eco-points, unlock achievements, and climb the leaderboard as you make sustainable choices.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 bg-white dark:bg-gray-800">
                <div className="container px-4 mx-auto text-center text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} LeafTrails. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default FrontPage;