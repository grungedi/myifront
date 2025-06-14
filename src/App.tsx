import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import { useTheme } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JournalPage from './pages/JournalPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('1');
  const { theme } = useTheme();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const startNewChat = () => {
    setActiveConversationId(null);
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onToggle={toggleSidebar}
            onNewChat={startNewChat}
            activeConversationId={activeConversationId}
            setActiveConversationId={setActiveConversationId}
          />
          <Routes>
            <Route 
              path="/" 
              element={
                <ChatInterface 
                  isSidebarOpen={isSidebarOpen} 
                  toggleSidebar={toggleSidebar}
                  activeConversationId={activeConversationId}
                />
              } 
            />
            <Route path="/journal" element={<JournalPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
