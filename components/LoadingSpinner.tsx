
import React from 'react';

interface LoadingSpinnerProps {
  topic: string | null;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ topic }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-blue-500"></div>
      <h2 className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Generating your guide for...
      </h2>
      <p className="text-lg text-brand-blue-600 dark:text-brand-blue-400">{topic || 'the selected topic'}</p>
    </div>
  );
};

export default LoadingSpinner;
