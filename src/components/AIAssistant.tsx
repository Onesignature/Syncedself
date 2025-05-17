import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Together from 'together-ai';

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

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto relative">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.role === 'assistant' 
                  ? 'bg-white' 
                  : 'bg-teal-50'
              } p-4 rounded-lg shadow-sm`}
            >
              <p className="text-gray-600">{msg.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;