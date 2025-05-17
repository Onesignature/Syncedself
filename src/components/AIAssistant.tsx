import React, { useState } from 'react';
import { Send, Loader2, ArrowRightLeft, Zap, Network, Globe2 } from 'lucide-react';
import { ChainId } from '@layerzerolabs/lz-sdk';
import Together from 'together-ai';
import { useLayerZero } from '../hooks/useLayerZero';
import { useWallet } from '@solana/wallet-adapter-react';

const SUPPORTED_CHAINS = [
  { 
    id: ChainId.ETHEREUM, 
    name: 'Ethereum', 
    color: 'from-blue-500 to-blue-600',
    icon: '⟠'
  },
  { 
    id: ChainId.BSC, 
    name: 'BSC', 
    color: 'from-yellow-400 to-yellow-500',
    icon: '₿'
  },
  { 
    id: ChainId.AVALANCHE, 
    name: 'Avalanche', 
    color: 'from-red-500 to-red-600',
    icon: '◆'
  },
  { 
    id: ChainId.POLYGON, 
    name: 'Polygon', 
    color: 'from-purple-500 to-purple-600',
    icon: '⬡'
  },
  { 
    id: ChainId.ARBITRUM, 
    name: 'Arbitrum', 
    color: 'from-blue-400 to-blue-500',
    icon: '⚡'
  },
  { 
    id: ChainId.OPTIMISM, 
    name: 'Optimism', 
    color: 'from-red-600 to-red-700',
    icon: '⚡'
  },
  {
    id: 999,
    name: 'Solana',
    color: 'from-[#9945FF] to-[#14F195]',
    icon: '◎'
  }
];

const together = new Together({ 
  apiKey: 'ff8e705333943065084a798f10fa65f1f71a1447d9f2fd86c0b7df5d76dba8df'
});

const SYSTEM_PROMPT = `You are SyncedSelf's AI Therapist. Provide brief, focused support and platform guidance. Maintain professional boundaries and never give medical advice. Keep responses concise and actionable.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to SyncedSelf! I'm your AI Therapist. How can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { connected: isSolanaConnected } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    const newMessages = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    
    try {
      const response = await together.chat.completions.create({
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          }
        ].concat(newMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        })), [
          {
            role: "user",
            content: userMessage
          }
        ]),
        model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
        max_tokens: 1024,
        temperature: 0.7
      });

      const assistantMessage = response.choices[0].message.content || 'I apologize, but I was unable to generate a response.';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  const { sendCrossChainMessage, isLoading: isSending, error: sendError } = useLayerZero();

  const handleCrossChainShare = async () => {
    if (messages.length === 0) return;
    
    try {
      const lastMessage = messages[messages.length - 1];
      const hash = await sendCrossChainMessage(
        lastMessage.content,
        ChainId.BSC,
        isSolanaConnected
      );
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Message shared cross-chain via ${isSolanaConnected ? 'Solana' : 'EVM'}! Transaction: ${hash}`
      }]);
    } catch (error) {
      console.error('Cross-chain sharing error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error sharing message: ${error.message}`
      }]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="bg-gray-900 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Globe2 className="h-6 w-6 text-teal-400" />
              <h2 className="text-lg font-semibold">Cross-Chain Network Status</h2>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
              <Network className="h-5 w-5 text-teal-400" />
              <span className="text-sm">Powered by LayerZero</span>
              <Zap className="h-5 w-5 text-teal-400 lz-badge" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {SUPPORTED_CHAINS.map((chain) => (
              <div
                key={chain.id}
                className={`bg-gradient-to-r ${chain.color} rounded-lg p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{chain.icon}</span>
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                </div>
                <div className="text-sm font-medium">{chain.name}</div>
                <div className="text-xs opacity-75">Connected</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto relative">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 message-animation ${
                msg.role === 'assistant' 
                  ? 'bg-white' 
                  : 'bg-teal-50'
              } p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-gray-600">{msg.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center p-4 message-animation">
              <div className="bg-white rounded-lg p-4 typing-indicator w-full max-w-md">
              <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-300"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleCrossChainShare}
              disabled={isLoading || isSending || messages.length === 0 || !isSolanaConnected}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              title="Share last message cross-chain"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>
          </form>
          {!isSolanaConnected && (
            <p className="text-sm text-gray-500 mt-2">
              Connect your Solana wallet to enable cross-chain messaging
            </p>
          )}
          {sendError && (
            <p className="text-red-500 text-sm mt-2">{sendError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;