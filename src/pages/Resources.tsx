import React from 'react';
import { Book, PlayCircle, FileText, Download, Star, Clock, Users, ArrowRight } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'article' | 'download';
  icon: React.ReactNode;
  link: string;
  duration?: string;
  rating?: number;
  students?: number;
  thumbnail?: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Anxiety: A Comprehensive Guide",
    description: "Learn about the different types of anxiety and effective coping mechanisms.",
    type: "video",
    icon: <PlayCircle className="h-6 w-6 text-blue-500" />,
    link: "#",
    duration: "45 mins",
    rating: 4.8,
    students: 1234,
    thumbnail: "https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: 2,
    title: "Mindfulness Meditation Basics",
    description: "A beginner's guide to mindfulness meditation practices.",
    type: "article",
    icon: <FileText className="h-6 w-6 text-green-500" />,
    link: "#",
    duration: "15 mins read",
    rating: 4.6,
    students: 856,
    thumbnail: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1280"
  },
  {
    id: 3,
    title: "Daily Mood Tracker Template",
    description: "Download our customizable mood tracking spreadsheet.",
    type: "download",
    icon: <Download className="h-6 w-6 text-purple-500" />,
    link: "#",
    rating: 4.9,
    students: 2341,
    thumbnail: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1280"
  }
];

const Resources: React.FC = () => {
  return (
    <div className="container-custom py-8 animate-fadeIn">
      <div className="flex items-center mb-8">
        <Book className="h-6 w-6 mr-2 text-teal-600" />
        <h1 className="text-2xl font-bold">Personalized Resources</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div 
            key={resource.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-teal-500 transition-all duration-200 hover:shadow-md transform hover:-translate-y-1 overflow-hidden"
          >
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${resource.thumbnail})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center text-white">
                {resource.icon}
                <span className="ml-2 font-medium">
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">{resource.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                {resource.duration && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{resource.duration}</span>
                  </div>
                )}
                {resource.students && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{resource.students.toLocaleString()} students</span>
                  </div>
                )}
              </div>
              
              {resource.rating && (
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{resource.rating}</span>
                </div>
              )}
              
              <a
                href={resource.link}
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Access Resource
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;