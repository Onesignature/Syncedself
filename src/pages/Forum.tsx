import React, { useState } from 'react';
import { MessageSquare, Search, Plus, ThumbsUp, MessageCircle, Bookmark, Share2, Filter } from 'lucide-react';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  avatar: string;
  content: string;
  replies: number;
  likes: number;
  tags: string[];
  timestamp: string;
  isBookmarked?: boolean;
}

const dummyPosts: ForumPost[] = [
  {
    id: 1,
    title: "How to manage anxiety during work meetings",
    author: "Sarah J.",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "I've been struggling with anxiety during work meetings. Any tips on managing this?",
    replies: 12,
    likes: 45,
    tags: ["Anxiety", "Work", "Self-Help"],
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    title: "Meditation techniques for beginners",
    author: "Mike R.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "Looking for simple meditation techniques to start my mindfulness journey.",
    replies: 8,
    likes: 32,
    tags: ["Meditation", "Mindfulness", "Beginners"],
    timestamp: "4 hours ago"
  },
  {
    id: 3,
    title: "Dealing with imposter syndrome",
    author: "Alex T.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "Anyone else dealing with imposter syndrome? Would love to hear your experiences.",
    replies: 15,
    likes: 67,
    tags: ["Mental Health", "Career", "Support"],
    timestamp: "6 hours ago"
  }
];

const Forum: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const allTags = Array.from(
    new Set(dummyPosts.flatMap(post => post.tags))
  );

  return (
    <div className="container-custom py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-teal-600" />
          Community Forum
        </h1>
        <button className="btn-primary flex items-center transform hover:scale-105 transition-transform duration-200">
          <Plus className="h-5 w-5 mr-2" />
          New Post
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-teal-300"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-teal-500 transition-colors duration-200 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTags(prev => 
              prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
            )}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTags.includes(tag)
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {dummyPosts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-teal-500 transition-all duration-200 hover:shadow-md transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-4">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-medium text-gray-800">{post.author}</h3>
                <span className="text-sm text-gray-500">{post.timestamp}</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center space-x-6">
                <button className="flex items-center text-gray-500 hover:text-teal-600 transition-colors">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-teal-600 transition-colors">
                  <MessageCircle className="h-5 w-5 mr-1" />
                  <span>{post.replies}</span>
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-teal-600 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-teal-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;