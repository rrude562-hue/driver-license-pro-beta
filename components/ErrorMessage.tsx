
import React from 'react';
import { ExclamationCircleIcon, BackArrowIcon } from './Icons';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onBack: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onBack }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-6 rounded-md shadow-md max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-4">
        <ExclamationCircleIcon className="h-12 w-12 text-red-400" />
      </div>
      <h3 className="text-lg font-medium text-red-800 dark:text-red-100">Oops! Something went wrong.</h3>
      <div className="mt-2 text-sm text-red-700 dark:text-red-200">
        <p>{message}</p>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <BackArrowIcon className="inline h-4 w-4 mr-1" />
          Go Back
        </button>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
