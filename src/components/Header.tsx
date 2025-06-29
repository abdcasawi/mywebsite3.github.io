import React, { useState } from 'react';
import { Search, Menu, Video, Bell, User, Mic, Globe } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLiveStreamClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, searchQuery, onSearchChange, onLiveStreamClick }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAlJazeeraMubasherLogoClick = () => {
    window.open('https://mubasher.aljazeera.net', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-[#333] px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-[#333] rounded-full transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleAlJazeeraMubasherLogoClick}
          >
            <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] p-2 rounded-lg">
              <img 
                src="/al-jazeera-mubasher-logo.png" 
                alt="Al Jazeera Mubasher" 
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  // Fallback to Globe icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Globe className="w-7 h-7 text-black hidden" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold tracking-tight">Al Jazeera</span>
              <span className="text-[#d4af37] text-xs font-medium">MUBASHER</span>
            </div>
          </div>
        </div>

        {/* Center search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search news, live streams..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#2a2a2a] border border-[#404040] rounded-l-full px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] text-base"
              />
            </div>
            <button className="bg-[#404040] border border-l-0 border-[#404040] rounded-r-full px-6 py-2.5 hover:bg-[#555] transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="ml-2 p-2.5 bg-[#333] rounded-full hover:bg-[#555] transition-colors">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={onLiveStreamClick}
            className="flex items-center space-x-2 bg-[#d4af37] text-black px-4 py-2 rounded-full hover:bg-[#f4d03f] transition-colors font-medium"
          >
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span>LIVE</span>
          </button>
          <button className="p-2 hover:bg-[#333] rounded-full transition-colors">
            <Video className="w-6 h-6 text-white" />
          </button>
          <button className="p-2 hover:bg-[#333] rounded-full transition-colors relative">
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-1 hover:bg-[#333] rounded-full transition-colors"
            >
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-12 bg-[#2a2a2a] rounded-lg shadow-lg py-2 w-64 z-50 border border-[#404040]">
                <div className="px-4 py-3 border-b border-[#404040]">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium">Your Account</p>
                      <p className="text-gray-400 text-sm">@youraccount</p>
                    </div>
                  </div>
                </div>
                <a 
                  href="https://mubasher.aljazeera.net/profile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-white hover:bg-[#404040] transition-colors"
                >
                  Your profile
                </a>
                <a 
                  href="https://mubasher.aljazeera.net/preferences" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-white hover:bg-[#404040] transition-colors"
                >
                  Preferences
                </a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-[#404040] transition-colors">
                  Switch account
                </a>
                <hr className="border-[#404040] my-2" />
                <a href="#" className="block px-4 py-2 text-white hover:bg-[#404040] transition-colors">
                  Settings
                </a>
                <a 
                  href="https://mubasher.aljazeera.net/contact-us" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-white hover:bg-[#404040] transition-colors"
                >
                  Help & Support
                </a>
                <a 
                  href="https://mubasher.aljazeera.net/feedback" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-white hover:bg-[#404040] transition-colors"
                >
                  Send feedback
                </a>
                <hr className="border-[#404040] my-2" />
                <a href="#" className="block px-4 py-2 text-white hover:bg-[#404040] transition-colors">
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;