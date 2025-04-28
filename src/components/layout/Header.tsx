import React, { useState } from 'react';
import { Bell, Search, User, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  toggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleMobileSidebar, isMobileSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="header h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center">
        <button
          onClick={toggleMobileSidebar}
          className="p-1 mr-4 rounded-md text-primary-300 hover:text-primary-200 hover:bg-dark-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden"
        >
          {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-primary-300 group-focus-within:text-primary-200" />
          </div>
          <input
            type="text"
            placeholder="Search contacts, deals, tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-md border border-dark-700/50 bg-dark-800/30 text-primary-100 placeholder-primary-400 
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              hover:bg-dark-800/50 hover:border-primary-600/50
              transition-colors backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-primary-400 bg-dark-800/50 border border-dark-700/50 rounded">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-1 rounded-full text-primary-300 hover:text-primary-200 hover:bg-dark-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary-500"></span>
        </button>
        
        <div className="h-8 w-px bg-dark-700/50 mx-2"></div>
        
        <Button
          variant="ghost"
          className="flex items-center text-primary-100 hover:text-primary-50"
          icon={<User size={18} />}
        >
          <span className="ml-2 font-medium">Account</span>
        </Button>
      </div>
    </header>
  );
};