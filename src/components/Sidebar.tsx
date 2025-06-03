import React from 'react';
import { Plus, X, Moon, Sun, Book } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ConversationItem from './ConversationItem';
import { sampleConversations } from '../data/sampleConversations';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onToggle, 
  onNewChat,
  activeConversationId,
  setActiveConversationId
}) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggle}
        />
      )}
      
      <div 
        className={`fixed top-0 bottom-0 left-0 w-80 z-30 flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="p-3">
          <button
            onClick={onNewChat}
            className={`flex items-center w-full rounded-lg p-3 ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-200'
            } transition-colors border border-gray-700 border-opacity-20`}
          >
            <Plus size={16} className="mr-2" />
            <span className="font-medium">New chat</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <h2 className="text-sm font-medium px-3 mb-2 text-gray-500">Recent conversations</h2>
          {sampleConversations.map(conversation => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === activeConversationId}
              onClick={() => setActiveConversationId(conversation.id)}
            />
          ))}

          <div className="mt-6">
            <Link
              to="/journal"
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/journal'
                  ? theme === 'dark' 
                    ? 'bg-gray-800' 
                    : 'bg-white'
                  : ''
              } hover:bg-gray-200 dark:hover:bg-gray-700`}
            >
              <Book size={16} className="mr-2" />
              <span className="font-medium">Journal</span>
            </Link>
          </div>
        </div>
        
        <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <button
            onClick={toggleTheme}
            className={`flex items-center w-full rounded-lg p-3 ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-200'
            } transition-colors`}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={16} className="mr-2" />
                <span>Light mode</span>
              </>
            ) : (
              <>
                <Moon size={16} className="mr-2" />
                <span>Dark mode</span>
              </>
            )}
          </button>
        </div>
        
        <button
          className="md:hidden absolute top-3 right-3 p-2 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          onClick={onToggle}
        >
          <X size={20} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
