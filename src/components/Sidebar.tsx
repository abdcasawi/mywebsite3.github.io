import React from 'react';
import { Home, Compass, Clock, ThumbsUp, Flame, Music, Gamepad2, Trophy, Lightbulb, Shirt, Settings, PlaySquare, History, Watch as WatchLater, ListVideo, Globe, Radio, Newspaper, Users } from 'lucide-react';
import { mockChannels } from '../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLiveStreamClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeSection, onSectionChange, onLiveStreamClick }) => {
  const handleHomeClick = () => {
    window.open('https://mubasher.aljazeera.net', '_blank');
  };

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === 'home') {
      handleHomeClick();
    } else if (sectionId === 'live-modal') {
      onLiveStreamClick();
    } else {
      onSectionChange(sectionId);
    }
  };

  const mainSections = [
    { id: 'home', icon: Home, label: 'Home', isExternal: true },
    { id: 'live', icon: Radio, label: 'Live Stream', isLive: true },
    { id: 'live-modal', icon: PlaySquare, label: 'Full Screen Live', isExternal: true },
    { id: 'news', icon: Newspaper, label: 'Latest News' },
    { id: 'programs', icon: PlaySquare, label: 'Programs' },
  ];

  const newsSections = [
    { id: 'breaking', icon: Flame, label: 'Breaking News' },
    { id: 'middle-east', icon: Globe, label: 'Middle East' },
    { id: 'world', icon: Compass, label: 'World News' },
    { id: 'politics', icon: Users, label: 'Politics' },
    { id: 'business', icon: Trophy, label: 'Business' },
    { id: 'sports', icon: Trophy, label: 'Sports' },
    { id: 'technology', icon: Lightbulb, label: 'Technology' },
  ];

  const librarySections = [
    { id: 'history', icon: History, label: 'Watch History' },
    { id: 'saved', icon: ThumbsUp, label: 'Saved Articles' },
    { id: 'watch-later', icon: WatchLater, label: 'Watch Later' },
  ];

  if (!isOpen) {
    return (
      <div className="fixed left-0 top-16 bottom-0 w-[72px] bg-[#1a1a1a] z-40 overflow-y-auto border-r border-[#333]">
        <div className="py-2">
          {mainSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`w-full flex flex-col items-center py-4 px-1 hover:bg-[#333] transition-colors relative ${
                activeSection === section.id && !section.isExternal ? 'bg-[#333]' : ''
              }`}
            >
              <section.icon className="w-6 h-6 text-white mb-1" />
              <span className="text-xs text-white text-center leading-tight">{section.label}</span>
              {section.isLive && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-16 bottom-0 w-60 bg-[#1a1a1a] overflow-y-auto z-40 border-r border-[#333]">
      <div className="py-3">
        {/* Main sections */}
        <div className="mb-3">
          {mainSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`w-full flex items-center space-x-6 px-6 py-2.5 hover:bg-[#333] transition-colors relative ${
                activeSection === section.id && !section.isExternal ? 'bg-[#333]' : ''
              }`}
            >
              <section.icon className="w-6 h-6 text-white" />
              <span className="text-white text-sm">{section.label}</span>
              {section.isLive && (
                <div className="ml-auto flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-red-500 text-xs font-medium">LIVE</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <hr className="border-[#333] my-3" />

        {/* News Categories */}
        <div className="mb-3">
          <div className="px-6 py-2">
            <h3 className="text-white font-medium text-base">News Categories</h3>
          </div>
          {newsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className="w-full flex items-center space-x-6 px-6 py-2.5 hover:bg-[#333] transition-colors"
            >
              <section.icon className="w-6 h-6 text-white" />
              <span className="text-white text-sm">{section.label}</span>
            </button>
          ))}
        </div>

        <hr className="border-[#333] my-3" />

        {/* Your Library */}
        <div className="mb-3">
          <div className="px-6 py-2">
            <h3 className="text-white font-medium text-base">Your Library</h3>
          </div>
          {librarySections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className="w-full flex items-center space-x-6 px-6 py-2.5 hover:bg-[#333] transition-colors"
            >
              <section.icon className="w-6 h-6 text-white" />
              <span className="text-white text-sm">{section.label}</span>
            </button>
          ))}
        </div>

        <hr className="border-[#333] my-3" />

        {/* Followed Channels */}
        <div className="mb-3">
          <div className="px-6 py-2">
            <h3 className="text-white font-medium text-base">Followed Channels</h3>
          </div>
          {mockChannels.slice(0, 5).map((channel) => (
            <button
              key={channel.id}
              className="w-full flex items-center space-x-3 px-6 py-2.5 hover:bg-[#333] transition-colors"
            >
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-white text-sm truncate flex-1 text-left">{channel.name}</span>
              <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
            </button>
          ))}
        </div>

        <hr className="border-[#333] my-3" />

        {/* Al Jazeera Network */}
        <div className="mb-3">
          <div className="px-6 py-2">
            <h3 className="text-white font-medium text-base">Al Jazeera Network</h3>
          </div>
          <button 
            onClick={() => window.open('https://mubasher.aljazeera.net/', '_blank')}
            className="w-full flex items-center space-x-6 px-6 py-2.5 hover:bg-[#333] transition-colors"
          >
            <div className="w-6 h-6 bg-[#d4af37] rounded flex items-center justify-center">
              <Radio className="w-4 h-4 text-black" />
            </div>
            <span className="text-white text-sm">Al Jazeera Mubasher</span>
          </button>
          <button 
            onClick={() => window.open('https://www.aljazeera.com/live/', '_blank')}
            className="w-full flex items-center space-x-6 px-6 py-2.5 hover:bg-[#333] transition-colors"
          >
            <div className="w-6 h-6 bg-[#d4af37] rounded flex items-center justify-center">
              <Radio className="w-4 h-4 text-black" />
            </div>
            <span className="text-white text-sm">Al Jazeera English</span>
          </button>
          <button 
            onClick={() => window.open('https://www.aljazeera.net/live/', '_blank')}
            className="w-full flex items-center space-x-6 px-6 py-2.5 hover:bg-[#333] transition-colors"
          >
            <div className="w-6 h-6 bg-[#d4af37] rounded flex items-center justify-center">
              <Globe className="w-4 h-4 text-black" />
            </div>
            <span className="text-white text-sm">Al Jazeera Arabic</span>
          </button>
          <button 
            onClick={() => window.open('https://balkans.aljazeera.net/', '_blank')}
            className="w-full flex items-center space-x-6 px-6 py-2.5 hover:bg-[#333] transition-colors"
          >
            <div className="w-6 h-6 bg-[#d4af37] rounded flex items-center justify-center">
              <span className="text-black text-xs font-bold">B</span>
            </div>
            <span className="text-white text-sm">Al Jazeera Balkans</span>
          </button>
        </div>

        <hr className="border-[#333] my-3" />

        {/* Settings */}
        <div className="px-6 py-2">
          <button className="w-full flex items-center space-x-6 py-2.5 hover:bg-[#333] rounded transition-colors">
            <Settings className="w-6 h-6 text-white" />
            <span className="text-white text-sm">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;