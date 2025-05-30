import React from 'react';
import { MessageType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { theme } = useTheme();
  const isUser = message.role === 'user';
  
  const bgColor = isUser 
    ? theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100' 
    : theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  
  const borderColor = !isUser && theme === 'light' ? 'border-b border-gray-200' : '';

  return (
    <div className={`px-4 py-6 ${bgColor} ${borderColor} w-full`}>
      <div className="max-w-3xl mx-auto flex">
        <div className="flex-shrink-0 mr-4">
          {isUser ? (
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </div>
          ) : (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
              <Bot size={16} />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-semibold mb-1">
            {isUser ? 'You' : 'My, I'}
          </div>
          <div className="whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;