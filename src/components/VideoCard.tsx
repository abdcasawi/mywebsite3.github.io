import React from 'react';
import { CheckCircle, MoreVertical } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onVideoClick: (videoId: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onVideoClick }) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K views`;
    }
    return `${views} views`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="cursor-pointer group">
      <div className="relative mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-xl group-hover:rounded-none transition-all duration-200"
          onClick={() => onVideoClick(video.id)}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {video.duration}
        </div>
        <button className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-80">
          <MoreVertical className="w-4 h-4 text-white" />
        </button>
      </div>
      
      <div className="flex space-x-3" onClick={() => onVideoClick(video.id)}>
        <img
          src={video.channel.avatar}
          alt={video.channel.name}
          className="w-9 h-9 rounded-full flex-shrink-0 mt-1"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-base line-clamp-2 leading-tight mb-1 group-hover:text-gray-300 transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center space-x-1 mb-1">
            <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">
              {video.channel.name}
            </span>
            {video.channel.verified && (
              <CheckCircle className="w-3 h-3 text-gray-400" fill="currentColor" />
            )}
          </div>
          <div className="text-gray-400 text-sm">
            {formatViews(video.views)} • {formatDate(video.uploadDate)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;