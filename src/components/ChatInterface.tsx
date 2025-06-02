// ... [importações mantidas como estão]
import React, { useRef, useState, useEffect } from 'react';
import Message from './Message';
import InputArea from './InputArea';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';
import { getSampleMessages } from '../data/sampleConversations';
import { MessageType } from '../types';

const callBedrockAPI = async (prompt: string): Promise<string> => {
  try {
    const res = await fetch('https://3rmsznjnw7.execute-api.us-east-1.amazonaws.com/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: prompt }),
    });

    const data = await res.json();
    return data?.content?.[0]?.text || JSON.stringify(data, null, 2);
  } catch (err: any) {
    return `Erro ao chamar API: ${err.message}`;
  }
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  isSidebarOpen, 
  toggleSidebar,
  activeConversationId
}) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeConversationId) {
      setMessages(getSampleMessages(activeConversationId));
    } else {
      setMessages([]);
    }
  }, [activeConversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const newUserMessage: MessageType = {
      id: `msg_${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    const bedrockResponseText = await callBedrockAPI(content);

    const aiResponse: MessageType = {
      id: `msg_${Date.now() + 1}`,
      content: bedrockResponseText,
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const welcomeMessage = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h1 className="text-4xl font-bold mb-6">My, I</h1>
      <p className="text-lg mb-8 max-w-2xl">
        I'm an AI assistant. I'm designed to be helpful, harmless, and honest.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {['Tell me a fun fact', 'Explain quantum computing', 'Write a poem about space'].map((example, index) => (
          <button
            key={index}
            onClick={() => handleSendMessage(example)}
            className={`p-4 rounded-lg text-left hover:bg-opacity-80 transition-all ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <p className="font-medium">{example}</p>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col flex-1 transition-all ${isSidebarOpen ? 'md:ml-80' : ''}`}>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className={`flex-1 overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {messages.length > 0 ? (
          <div className="flex flex-col pb-32 pt-4">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className={`flex items-center p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} mx-auto my-2 rounded-lg max-w-3xl`}>
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-2 py-1">
                    <div className={`h-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded w-3/4`}></div>
                    <div className={`h-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded`}></div>
                    <div className={`h-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded w-5/6`}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          welcomeMessage()
        )}
      </div>
      
      <InputArea onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
