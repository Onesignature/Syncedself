import React from 'react';
import { Award, Star, Trophy, Target } from 'lucide-react';

interface Reward {
  id: number;
  title: string;
  points: number;
  description: string;
  progress: number;
  icon: React.ReactNode;
}

const rewards: Reward[] = [
  {
    id: 1,
    title: "Consistency Champion",
    points: 500,
    description: "Complete daily check-ins for 7 consecutive days",
    progress: 71,
    icon: <Trophy className="h-6 w-6 text-yellow-500" />
  },
  {
    id: 2,
    title: "Mindfulness Master",
    points: 1000,
    description: "Complete 10 meditation sessions",
    progress: 40,
    icon: <Star className="h-6 w-6 text-purple-500" />
  },
  {
    id: 3,
    title: "Goal Getter",
    points: 750,
    description: "Achieve 3 personal goals",
    progress: 33,
    icon: <Target className="h-6 w-6 text-blue-500" />
  }
];

const Rewards: React.FC = () => {
  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Award className="h-6 w-6 mr-2 text-teal-600" />
          <h1 className="text-2xl font-bold">My Rewards</h1>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-lg">
          <span className="text-teal-600 font-semibold">Total Points: 2,450</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              {reward.icon}
              <h2 className="text-lg font-semibold ml-2">{reward.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{reward.description}</p>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="text-teal-600 font-medium">{reward.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-600 h-2 rounded-full"
                  style={{ width: `${reward.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Points: {reward.points}</span>
              <button className="text-teal-600 font-medium hover:text-teal-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;