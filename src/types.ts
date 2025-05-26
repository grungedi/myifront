export interface MessageType {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
}

export interface ConversationType {
  id: string;
  title: string;
  messages: MessageType[];
  created_at: string;
}