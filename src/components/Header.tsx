import React from 'react';
import { Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { theme } = useTheme();
  
  return (
    <header className={`sticky top-0 z-10 flex items-center h-12 px-4 ${
      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    } border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
      <button
        onClick={toggleSidebar}
        className={`md:hidden p-2 rounded-md ${
          theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        } transition-colors`}
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>
      <h1 className="ml-2 md:ml-0 text-lg font-semibold">My, I</h1>
    </header>
  );
};

export default Header;