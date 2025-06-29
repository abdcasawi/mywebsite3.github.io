import React from 'react';
import { X } from 'lucide-react';
import LivePlayer from './LivePlayer';

interface LiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  streamUrl: string;
  title: string;
}

const LiveStreamModal: React.FC<LiveStreamModalProps> = ({ isOpen, onClose, streamUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        
        <LivePlayer 
          streamUrl={streamUrl} 
          title={title}
        />
        
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Press ESC to close • Click outside to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamModal;