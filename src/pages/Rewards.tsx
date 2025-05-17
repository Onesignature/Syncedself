import React from 'react';
import { Award, Star, Trophy, Target, Gift, Zap, TrendingUp, RefreshCw } from 'lucide-react';
import { useSyncedToken } from '../hooks/useSyncedToken';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface Reward {
  id: number;
  title: string;
  tokens: number;
  description: string;
  progress: number;
  icon: React.ReactNode,
  color: string;
  unlockTokens: number;
}

const rewards: Reward[] = [
  {
    id: 1,
    title: "Consistency Champion",
    tokens: 50,
    description: "Complete daily check-ins for 7 consecutive days",
    progress: 71,
    icon: <Trophy className="h-6 w-6 text-yellow-500" />,
    color: "from-yellow-500 to-amber-500",
    unlockTokens: 100
  },
  {
    id: 2,
    title: "Mindfulness Master",
    tokens: 100,
    description: "Complete 10 meditation sessions",
    progress: 40,
    icon: <Star className="h-6 w-6 text-purple-500" />,
    color: "from-purple-500 to-pink-500",
    unlockTokens: 200
  },
  {
    id: 3,
    title: "Goal Getter",
    tokens: 75,
    description: "Achieve 3 personal goals",
    progress: 33,
    icon: <Target className="h-6 w-6 text-blue-500" />,
    color: "from-blue-500 to-cyan-500",
    unlockTokens: 150
  }
];

const Rewards: React.FC = () => {
  const { balance, isLoading } = useSyncedToken();
  const { connected } = useWallet();

  return (
    <div className="container-custom py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Award className="h-6 w-6 mr-2 text-teal-600" />
          <h1 className="text-2xl font-bold">My Rewards</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-md">
            {connected ? (
              <>
                <Gift className="h-5 w-5 mr-2" />
                <span className="font-bold">{balance.toFixed(2)}</span>
                <span className="ml-1">$SYNCED</span>
                {isLoading && <RefreshCw className="h-4 w-4 ml-2 animate-spin" />}
              </>
            ) : (
              <WalletMultiButton className="!bg-transparent !border-white !border" />
            )}
          </div>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors">
            <Zap className="h-5 w-5" />
            <span>Redeem</span>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-6 rounded-xl mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-bold">Progress Overview</h2>
          </div>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Level 5</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: '65%' }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>2,450 points</span>
          <span>Next level: 3,000 points</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div 
            key={reward.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-all duration-200 hover:shadow-md"
          >
            <div className={`bg-gradient-to-r ${reward.color} p-6 text-white`}>
              <div className="flex items-center justify-between mb-2">
                {reward.icon}
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {reward.tokens} $SYNCED
                </span>
              </div>
              <h2 className="text-xl font-bold mb-1">{reward.title}</h2>
              <p className="text-white/80 text-sm">{reward.description}</p>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{reward.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${reward.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${reward.progress}%` }}
                ></div>
              </div>
              
              <button 
                className="w-full mt-4 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Gift className="h-4 w-4" />
                Claim Reward
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;