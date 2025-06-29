import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import LiveStreamModal from './components/LiveStreamModal';
import LivePlayer from './components/LivePlayer';
import { mockVideos } from './data/mockData';
import { Video } from './types';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('news');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showEmbeddedLive, setShowEmbeddedLive] = useState(false);

  const selectedVideo = useMemo(() => {
    return mockVideos.find(video => video.id === selectedVideoId);
  }, [selectedVideoId]);

  const filteredVideos = useMemo(() => {
    if (!searchQuery) return mockVideos;
    
    return mockVideos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleVideoClick = (videoId: string) => {
    setSelectedVideoId(videoId);
    setShowEmbeddedLive(false);
  };

  const handleBackToHome = () => {
    setSelectedVideoId(null);
    setShowEmbeddedLive(false);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSelectedVideoId(null);
    setShowEmbeddedLive(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSelectedVideoId(null);
    setShowEmbeddedLive(false);
    if (query) {
      setActiveSection('search');
    }
  };

  const handleLiveStreamClick = () => {
    setShowLiveModal(true);
  };

  const handleWatchLiveEmbedded = () => {
    setSelectedVideoId(null);
    setShowEmbeddedLive(true);
    setActiveSection('live');
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'breaking':
        return 'Breaking News';
      case 'middle-east':
        return 'Middle East News';
      case 'world':
        return 'World News';
      case 'politics':
        return 'Politics';
      case 'business':
        return 'Business News';
      case 'sports':
        return 'Sports';
      case 'technology':
        return 'Technology';
      case 'live':
        return 'Al Jazeera Mubasher Live Stream';
      case 'search':
        return `Search results for "${searchQuery}"`;
      default:
        return 'Latest News';
    }
  };

  // Handle ESC key for modal
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowLiveModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header 
        onToggleSidebar={handleToggleSidebar}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onLiveStreamClick={handleLiveStreamClick}
      />
      
      <Sidebar 
        isOpen={sidebarOpen}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onLiveStreamClick={handleLiveStreamClick}
      />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'ml-60' : 'ml-[72px]'
      }`}>
        {selectedVideo ? (
          <VideoPlayer 
            video={selectedVideo}
            onBack={handleBackToHome}
          />
        ) : showEmbeddedLive ? (
          <div className="px-6 py-6">
            <div className="mb-6">
              <button
                onClick={handleBackToHome}
                className="mb-4 flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
              >
                <span>← Back to News</span>
              </button>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {getSectionTitle()}
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Live coverage from Al Jazeera Mubasher • 24/7 News
              </p>
            </div>
            
            <div className="max-w-6xl">
              <LivePlayer 
                streamUrl="https://live-hls-apps-ajm24-fa.getaj.net/AJM24/index.m3u8"
                title="Al Jazeera Mubasher Live"
              />
            </div>
            
            <div className="mt-8 bg-[#1a1a1a] rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">About Al Jazeera Mubasher</h3>
              <p className="text-gray-300 leading-relaxed">
                Al Jazeera Mubasher is a 24-hour Arabic-language live news channel that provides continuous coverage 
                of breaking news, political events, and major developments across the Middle East and around the world. 
                The channel offers uninterrupted live broadcasting of important events, conferences, and news as they unfold, 
                providing viewers with real-time access to significant moments in history.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-[#d4af37] text-black px-3 py-1 rounded-full text-sm font-medium">Live News</span>
                <span className="bg-[#333] text-white px-3 py-1 rounded-full text-sm">24/7 Coverage</span>
                <span className="bg-[#333] text-white px-3 py-1 rounded-full text-sm">Arabic</span>
                <span className="bg-[#333] text-white px-3 py-1 rounded-full text-sm">Breaking News</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 py-6">
            {/* Live Stream Banner */}
            {activeSection === 'news' && (
              <div className="mb-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-xl p-6 text-black">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="font-bold text-lg">LIVE NOW</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Al Jazeera Mubasher Live Stream</h2>
                    <p className="text-black/80">Watch breaking news and live coverage 24/7 in Arabic</p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleWatchLiveEmbedded}
                      className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Watch Here
                    </button>
                    <button 
                      onClick={handleLiveStreamClick}
                      className="bg-black/20 text-black px-6 py-3 rounded-lg font-medium hover:bg-black/30 transition-colors border border-black/20"
                    >
                      Full Screen
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                {getSectionTitle()}
              </h2>
              {searchQuery && (
                <p className="text-gray-400 text-sm">
                  About {filteredVideos.length.toLocaleString()} results
                </p>
              )}
            </div>
            
            <VideoGrid 
              videos={filteredVideos}
              onVideoClick={handleVideoClick}
            />
            
            {filteredVideos.length === 0 && searchQuery && (
              <div className="text-center py-20">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto mb-6 opacity-20">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-gray-400">
                      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-white text-xl font-medium mb-2">No results found</h3>
                <p className="text-gray-400 text-base">Try different keywords or browse our news categories</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Live Stream Modal */}
      <LiveStreamModal
        isOpen={showLiveModal}
        onClose={() => setShowLiveModal(false)}
        streamUrl="https://live-hls-apps-ajm24-fa.getaj.net/AJM24/index.m3u8"
        title="Al Jazeera Mubasher Live"
      />

      {/* Modal backdrop click handler */}
      {showLiveModal && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowLiveModal(false)}
        />
      )}
    </div>
  );
}

export default App;