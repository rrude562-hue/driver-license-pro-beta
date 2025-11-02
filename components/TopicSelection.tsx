
import React from 'react';
import { RoadIcon, ParkingIcon, InspectionIcon } from './Icons';

interface TopicSelectionProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
}

const getTopicIcon = (topic: string) => {
  const lowerCaseTopic = topic.toLowerCase();
  if (lowerCaseTopic.includes('park') || lowerCaseTopic.includes('turn') || lowerCaseTopic.includes('dock')) {
    return <ParkingIcon className="h-10 w-10 text-brand-blue-500 mb-4" />;
  }
  if (lowerCaseTopic.includes('inspection')) {
    return <InspectionIcon className="h-10 w-10 text-brand-blue-500 mb-4" />;
  }
  return <RoadIcon className="h-10 w-10 text-brand-blue-500 mb-4" />;
};

const TopicSelection: React.FC<TopicSelectionProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Select a Topic to Master</h2>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
        Choose a maneuver or skill below to get an AI-generated, step-by-step guide.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => onSelectTopic(topic)}
            className="group text-left p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-blue-500 focus:ring-opacity-50"
          >
            <div className="flex flex-col items-center text-center">
              {getTopicIcon(topic)}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand-blue-600 dark:group-hover:text-brand-blue-400 transition-colors duration-300">
                {topic}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelection;
