import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '../types';

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (videoId: string) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-10">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onVideoClick={onVideoClick}
        />
      ))}
    </div>
  );
};

export default VideoGrid;