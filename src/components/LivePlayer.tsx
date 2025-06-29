import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, RotateCcw } from 'lucide-react';

interface LivePlayerProps {
  streamUrl: string;
  title?: string;
  onClose?: () => void;
}

const LivePlayer: React.FC<LivePlayerProps> = ({ streamUrl, title = "Live Stream", onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initializePlayer = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
        });
        
        hlsRef.current = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          setError(null);
        });
        
        hls.on(Hls.Events.ERROR, (event, data) => {
          // Handle non-fatal buffer stalling errors
          if (data.details === 'bufferStalledError' && !data.fatal) {
            console.warn('HLS Buffer Stall:', data);
            setIsLoading(true);
            return;
          }
          
          console.error('HLS Error:', data);
          
          if (data.fatal) {
            setError('Failed to load live stream. Please try again.');
            setIsLoading(false);
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari native HLS support
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
          setError(null);
        });
        video.addEventListener('error', () => {
          setError('Failed to load live stream. Please try again.');
          setIsLoading(false);
        });
      } else {
        setError('HLS is not supported in this browser.');
        setIsLoading(false);
      }
    };

    initializePlayer();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [streamUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };
    const handlePlaying = () => {
      // Hide loading overlay when playback resumes after buffering
      setIsLoading(false);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(console.error);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(console.error);
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(console.error);
    };
  };

  const retryStream = () => {
    setError(null);
    setIsLoading(true);
    const video = videoRef.current;
    if (video && hlsRef.current) {
      hlsRef.current.loadSource(streamUrl);
    }
  };

  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video object-contain"
        playsInline
        muted={isMuted}
        onClick={togglePlay}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading live stream...</p>
            <p className="text-gray-400 text-sm mt-2">{title}</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-white text-lg mb-4">{error}</p>
            <button
              onClick={retryStream}
              className="flex items-center space-x-2 bg-[#d4af37] text-black px-6 py-3 rounded-lg hover:bg-[#f4d03f] transition-colors mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* Live Indicator */}
      {!isLoading && !error && (
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>LIVE</span>
        </div>
      )}

      {/* Controls Overlay */}
      {showControls && !isLoading && !error && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex flex-col justify-between">
          {/* Top Controls */}
          <div className="flex items-center justify-between p-4">
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            )}
          </div>

          {/* Center Play Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-4 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-12 h-12 text-white" fill="currentColor" />
              ) : (
                <Play className="w-12 h-12 text-white" fill="currentColor" />
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" fill="currentColor" />
                ) : (
                  <Play className="w-6 h-6" fill="currentColor" />
                )}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="text-white hover:text-gray-300 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Maximize className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #d4af37;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #d4af37;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default LivePlayer;