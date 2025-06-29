import React, { useState } from 'react';
import { ArrowLeft, ThumbsUp, ThumbsDown, Share, MoreHorizontal, Bell, CheckCircle } from 'lucide-react';
import { Video } from '../types';
import CommentSection from './CommentSection';

interface VideoPlayerProps {
  video: Video;
  onBack: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onBack }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K views`;
    }
    return `${views} views`;
  };

  const formatSubscribers = (subscribers: number) => {
    if (subscribers >= 1000000) {
      return `${(subscribers / 1000000).toFixed(1)}M subscribers`;
    } else if (subscribers >= 1000) {
      return `${(subscribers / 1000).toFixed(0)}K subscribers`;
    }
    return `${subscribers} subscribers`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <button
        onClick={onBack}
        className="mb-4 flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main video content */}
        <div className="lg:col-span-2">
          {/* Video player */}
          <div className="relative bg-black rounded-lg overflow-hidden mb-4 aspect-video">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-colors cursor-pointer">
                <svg className="w-12 h-12 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Video info */}
          <div className="mb-4">
            <h1 className="text-white text-xl font-semibold mb-2">{video.title}</h1>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <span>{formatViews(video.views)}</span>
                <span>•</span>
                <span>{formatDate(video.uploadDate)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-[#272727] rounded-full">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-l-full hover:bg-[#404040] transition-colors ${
                      liked ? 'text-blue-500' : 'text-white'
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
                    <span className="text-sm">{video.likes.toLocaleString()}</span>
                  </button>
                  <div className="w-px h-6 bg-[#404040]"></div>
                  <button
                    onClick={handleDislike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-r-full hover:bg-[#404040] transition-colors ${
                      disliked ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5" fill={disliked ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 bg-[#272727] px-4 py-2 rounded-full text-white hover:bg-[#404040] transition-colors">
                  <Share className="w-5 h-5" />
                  <span className="text-sm">Share</span>
                </button>
                
                <button className="bg-[#272727] p-2 rounded-full text-white hover:bg-[#404040] transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Channel info */}
          <div className="bg-[#272727] rounded-lg p-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={video.channel.avatar}
                  alt={video.channel.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-semibold">{video.channel.name}</h3>
                    {video.channel.verified && (
                      <CheckCircle className="w-4 h-4 text-gray-400" fill="currentColor" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{formatSubscribers(video.channel.subscribers)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSubscribed(!subscribed)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors ${
                    subscribed
                      ? 'bg-[#404040] text-white hover:bg-[#606060]'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                {showFullDescription 
                  ? video.description 
                  : `${video.description.substring(0, 150)}...`
                }
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-400 text-sm mt-2 hover:underline"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>

          {/* Comments */}
          <CommentSection />
        </div>

        {/* Sidebar with related videos */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Up next</h3>
          {/* This would typically show related videos */}
          <div className="text-gray-400 text-sm">
            Related videos would appear here
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;