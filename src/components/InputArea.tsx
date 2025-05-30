import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 z-40 md:left-80 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="mx-auto max-w-3xl">
        <div className={`relative rounded-lg border ${
          theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
        } shadow-sm`}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Message My, I..."
            className={`w-full p-3 pr-12 min-h-[44px] max-h-[200px] focus:outline-none rounded-lg resize-none ${
              theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'
            }`}
            style={{ overflow: 'hidden' }}
          />
          <button
            onClick={handleSendMessage}
            className={`absolute right-2 bottom-2.5 p-1.5 rounded-md ${
              message.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : theme === 'dark' ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-500'
            } transition-colors`}
            disabled={!message.trim()}
          >
            <Send size={16} className="transition-transform duration-200 ease-in-out transform group-hover:translate-x-1" />
          </button>
        </div>
        <p className="text-xs text-center mt-2 text-gray-500">
          My, I can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default InputArea;