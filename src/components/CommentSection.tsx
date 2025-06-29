import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { mockComments } from '../data/mockData';
import { Comment } from '../types';

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('Top comments');

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    return (
      <div className={`${isReply ? 'ml-12' : ''} mb-4`}>
        <div className="flex space-x-3">
          <img
            src={comment.avatar}
            alt={comment.author}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-white text-sm font-medium">@{comment.author}</span>
              <span className="text-gray-400 text-xs">{formatTime(comment.timestamp)}</span>
            </div>
            <p className="text-white text-sm mb-2 leading-relaxed">{comment.content}</p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-1 rounded-full hover:bg-[#272727] transition-colors ${
                    liked ? 'text-blue-500' : 'text-gray-400'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
                </button>
                <span className="text-gray-400 text-xs">{comment.likes}</span>
              </div>
              
              <button
                onClick={() => setDisliked(!disliked)}
                className={`p-1 rounded-full hover:bg-[#272727] transition-colors ${
                  disliked ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <ThumbsDown className="w-4 h-4" fill={disliked ? 'currentColor' : 'none'} />
              </button>
              
              <button className="text-gray-400 text-xs hover:text-white transition-colors">
                Reply
              </button>
              
              <button className="p-1 rounded-full hover:bg-[#272727] transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-3">
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-blue-400 text-sm hover:underline mb-2"
                >
                  {showReplies ? 'Hide replies' : `View ${comment.replies.length} replies`}
                </button>
                {showReplies && (
                  <div>
                    {comment.replies.map((reply) => (
                      <CommentItem key={reply.id} comment={reply} isReply />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'You',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        content: newComment,
        timestamp: 'Just now',
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">
          {comments.length} Comments
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#272727] text-white text-sm px-3 py-1 rounded border-none focus:outline-none"
        >
          <option>Top comments</option>
          <option>Newest first</option>
        </select>
      </div>

      {/* Add comment */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex space-x-3">
          <img
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
            alt="Your avatar"
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-transparent text-white placeholder-gray-400 border-b border-[#404040] focus:border-blue-500 focus:outline-none resize-none pb-2"
              rows={1}
            />
            {newComment && (
              <div className="flex items-center justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={() => setNewComment('')}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={!newComment.trim()}
                >
                  Comment
                </button>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Comments list */}
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;