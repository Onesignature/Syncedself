import React, { useState } from 'react';
import { MessageSquare, Search, Plus } from 'lucide-react';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  content: string;
  replies: number;
  likes: number;
  timestamp: string;
}

const dummyPosts: ForumPost[] = [
  {
    id: 1,
    title: "How to manage anxiety during work meetings",
    author: "Sarah J.",
    content: "I've been struggling with anxiety during work meetings. Any tips on managing this?",
    replies: 12,
    likes: 45,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    title: "Meditation techniques for beginners",
    author: "Mike R.",
    content: "Looking for simple meditation techniques to start my mindfulness journey.",
    replies: 8,
    likes: 32,
    timestamp: "4 hours ago"
  },
  {
    id: 3,
    title: "Dealing with imposter syndrome",
    author: "Alex T.",
    content: "Anyone else dealing with imposter syndrome? Would love to hear your experiences.",
    replies: 15,
    likes: 67,
    timestamp: "6 hours ago"
  }
];

const Forum: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-teal-600" />
          Community Forum
        </h1>
        <button className="btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          New Post
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {dummyPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-teal-500 transition-colors">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>{post.author}</span>
                <span>{post.timestamp}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>{post.replies} replies</span>
                <span>{post.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;