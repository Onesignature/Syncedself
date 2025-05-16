import React from 'react';
import { Book, PlayCircle, FileText, Download } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'article' | 'download';
  icon: React.ReactNode;
  link: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Anxiety: A Comprehensive Guide",
    description: "Learn about the different types of anxiety and effective coping mechanisms.",
    type: "video",
    icon: <PlayCircle className="h-6 w-6 text-blue-500" />,
    link: "#"
  },
  {
    id: 2,
    title: "Mindfulness Meditation Basics",
    description: "A beginner's guide to mindfulness meditation practices.",
    type: "article",
    icon: <FileText className="h-6 w-6 text-green-500" />,
    link: "#"
  },
  {
    id: 3,
    title: "Daily Mood Tracker Template",
    description: "Download our customizable mood tracking spreadsheet.",
    type: "download",
    icon: <Download className="h-6 w-6 text-purple-500" />,
    link: "#"
  }
];

const Resources: React.FC = () => {
  return (
    <div className="container-custom py-8">
      <div className="flex items-center mb-8">
        <Book className="h-6 w-6 mr-2 text-teal-600" />
        <h1 className="text-2xl font-bold">Personalized Resources</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-teal-500 transition-colors">
            <div className="flex items-center mb-4">
              {resource.icon}
              <h2 className="text-lg font-semibold ml-2">{resource.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <a
              href={resource.link}
              className="text-teal-600 font-medium hover:text-teal-700 flex items-center"
            >
              Access Resource
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;