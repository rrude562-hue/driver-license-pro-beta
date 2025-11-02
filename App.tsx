
import React, { useState, useCallback } from 'react';
import { DRIVING_TOPICS } from './constants';
import { TopicContent } from './types';
import { fetchDrivingTopicDetails } from './services/geminiService';
import TopicSelection from './components/TopicSelection';
import TopicDetail from './components/TopicDetail';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { SteeringWheelIcon } from './components/Icons';

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicContent, setTopicContent] = useState<TopicContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectTopic = useCallback(async (topic: string) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    setError(null);
    setTopicContent(null);
    try {
      const content = await fetchDrivingTopicDetails(topic);
      setTopicContent(content);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGoBack = () => {
    setSelectedTopic(null);
    setTopicContent(null);
    setError(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner topic={selectedTopic} />;
    }
    if (error) {
      return <ErrorMessage message={error} onRetry={() => selectedTopic && handleSelectTopic(selectedTopic)} onBack={handleGoBack} />;
    }
    if (topicContent && selectedTopic) {
      return <TopicDetail content={topicContent} onGoBack={handleGoBack} />;
    }
    return <TopicSelection topics={DRIVING_TOPICS} onSelectTopic={handleSelectTopic} />;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
          <SteeringWheelIcon className="h-8 w-8 text-brand-blue-500" />
          <h1 className="ml-3 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Driver's License Pro
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
        <p>Powered by AI. Always verify information with official sources.</p>
      </footer>
    </div>
  );
};

export default App;
