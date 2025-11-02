import React from 'react';
import { TopicContent } from '../types';
import { BackArrowIcon, CheckCircleIcon, EyeIcon, ExclamationTriangleIcon, YouTubeIcon, DiagramIcon } from './Icons';

interface TopicDetailProps {
  content: TopicContent;
  onGoBack: () => void;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="mt-8">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="ml-3 text-2xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
    </div>
    {children}
  </div>
);

const TopicDetail: React.FC<TopicDetailProps> = ({ content, onGoBack }) => {

  const renderVideoContent = () => {
    if (!content.youtubeVideoUrl || !content.youtubeVideoTitle) {
      return (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200">
            <p className="font-bold">Video Not Available</p>
            <p>The AI could not find a valid instructional video for this topic.</p>
        </div>
      );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{content.youtubeVideoTitle}</h4>
                <a 
                  href={content.youtubeVideoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue-600 hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
                >
                    Watch Instructional Video on YouTube
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            </div>
        </div>
    );
  };


  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl animate-fade-in-up w-full max-w-4xl mx-auto">
      <button
        onClick={onGoBack}
        className="flex items-center text-brand-blue-600 dark:text-brand-blue-400 hover:underline font-semibold mb-6 transition-colors duration-300"
      >
        <BackArrowIcon className="h-5 w-5 mr-2" />
        Back to Topics
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{content.title}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{content.description}</p>
        </div>
        <div className="flex-shrink-0 lg:w-1/3">
          {content.photo ? (
             <img 
              src={`data:image/png;base64,${content.photo}`}
              alt={content.title} 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Photo not available</p>
            </div>
          )}
        </div>
      </div>

      <DetailSection title="Step-by-Step Guide" icon={<CheckCircleIcon className="h-7 w-7 text-green-500" />}>
        <ol className="list-none space-y-4">
          {content.steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-brand-blue-500 text-white font-bold text-sm mr-4">
                {index + 1}
              </div>
              <p className="text-gray-700 dark:text-gray-300 flex-1">{step}</p>
            </li>
          ))}
        </ol>
      </DetailSection>

      {content.diagram && (
        <DetailSection title="Diagram" icon={<DiagramIcon className="h-7 w-7 text-purple-500" />}>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg flex justify-center">
                <img 
                    src={`data:image/png;base64,${content.diagram}`}
                    alt={`Diagram for ${content.title}`}
                    className="rounded-md max-w-full h-auto"
                />
            </div>
        </DetailSection>
      )}

      <DetailSection title="Instructional Video" icon={<YouTubeIcon className="h-7 w-7 text-red-500" />}>
        {renderVideoContent()}
      </DetailSection>

      <DetailSection title="Key Observation Points" icon={<EyeIcon className="h-7 w-7 text-indigo-500" />}>
        <ul className="list-none space-y-3">
          {content.observations.map((point, index) => (
            <li key={index} className="flex items-start">
              <EyeIcon className="flex-shrink-0 h-5 w-5 text-indigo-400 mr-3 mt-1" />
              <p className="text-gray-700 dark:text-gray-300 flex-1">{point}</p>
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection title="Common Mistakes to Avoid" icon={<ExclamationTriangleIcon className="h-7 w-7 text-red-500" />}>
        <ul className="list-none space-y-3">
          {content.commonMistakes.map((mistake, index) => (
            <li key={index} className="flex items-start">
              <ExclamationTriangleIcon className="flex-shrink-0 h-5 w-5 text-red-400 mr-3 mt-1" />
              <p className="text-gray-700 dark:text-gray-300 flex-1">{mistake}</p>
            </li>
          ))}
        </ul>
      </DetailSection>
    </div>
  );
};

export default TopicDetail;
