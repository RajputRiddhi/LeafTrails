import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: () => void;
    onSignup: (name: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignup }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('admin');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoginMode) {
            // In a real app, you'd validate email and password
            onLogin();
        } else {
            // In a real app, you'd validate all fields
            onSignup(name);
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 m-4 space-y-6 bg-white rounded-lg shadow-xl dark:bg-gray-800 animate-fade-in">
                <div className="flex flex-col items-center">
                    <img src="assets/img/logo.png" alt="LeafTrails Logo" className="object-contain w-16 h-16" />
                    <h1 className="mt-4 text-3xl font-bold text-center text-eco-green-dark dark:text-eco-green-light">
                        Welcome to LeafTrails
                    </h1>
                    <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                        {isLoginMode ? 'Sign in to continue your journey.' : 'Create an account to get started.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginMode && (
                        <div>
                            <label htmlFor="name" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Doe"
                                className="w-full px-4 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 transition-colors duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-bold text-white transition-transform duration-200 rounded-md shadow-md bg-eco-green hover:bg-eco-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900 active:scale-95"
                    >
                        {isLoginMode ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center">
                    <button onClick={toggleMode} className="text-sm font-medium text-eco-blue hover:underline focus:outline-none">
                        {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;