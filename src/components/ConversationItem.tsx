import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConversationType } from '../types';

interface ConversationItemProps {
  conversation: ConversationType;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ 
  conversation, 
  isActive, 
  onClick 
}) => {
  const { theme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center px-3 py-3 rounded-lg mb-1 transition-colors ${
        isActive
          ? theme === 'dark' 
            ? 'bg-gray-800 text-white' 
            : 'bg-gray-200 text-gray-900'
          : theme === 'dark'
            ? 'hover:bg-gray-800 text-gray-300'
            : 'hover:bg-gray-200 text-gray-700'
      }`}
    >
      <MessageSquare size={16} className="mr-3 flex-shrink-0" />
      <div className="truncate">
        {conversation.title}
      </div>
    </button>
  );
};

export default ConversationItem;