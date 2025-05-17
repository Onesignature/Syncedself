interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  userId: string;
  messages: ChatMessage[];
  model: string;
  systemMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage for chat sessions
const chatSessions = new Map<string, ChatSession>();

export const getChatSession = (userId: string): ChatSession | undefined => {
  return chatSessions.get(userId);
};

export const createChatSession = (
  userId: string,
  model: string = "togethercomputer/llama-2-70b-chat",
  systemMessage: string = "You are a helpful and empathetic mental health assistant focused on blockchain-based therapy. Provide supportive, professional responses while maintaining appropriate boundaries. Never provide medical advice or diagnoses. Keep responses concise and focused on the user's immediate concerns. If you don't know something, say so directly. When relevant, explain how blockchain technology enhances mental healthcare through privacy, security, and verified credentials."
): ChatSession => {
  const session: ChatSession = {
    userId,
    messages: [],
    model,
    systemMessage,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  chatSessions.set(userId, session);
  return session;
};

export const addMessageToChatSession = (
  userId: string,
  role: 'user' | 'assistant',
  content: string
): void => {
  const session = chatSessions.get(userId);
  if (session) {
    session.messages.push({ role, content });
    session.updatedAt = new Date();
  }
};

export const formatMessagesForAPI = (session: ChatSession): ChatMessage[] => {
  return [
    { role: 'system', content: session.systemMessage },
    ...session.messages.slice(-10) // Keep only last 10 messages for context
  ];
};

export const clearChatSession = (userId: string): boolean => {
  return chatSessions.delete(userId);
};