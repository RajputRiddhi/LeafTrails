
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-16 h-16 border-4 rounded-full border-t-eco-green border-gray-200 dark:border-gray-600 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
