import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface CommunityPostProps {
  author: {
    name: string;
    avatar: string;
  };
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  phase?: string;
  phaseColor?: string;
}

const CommunityPost: React.FC<CommunityPostProps> = ({
  author,
  timeAgo,
  content,
  likes,
  comments,
  phase,
  phaseColor
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-start space-x-3">
        <img 
          src={author.avatar} 
          alt={author.name} 
          className="w-10 h-10 rounded-full object-cover" 
        />
        
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-medium text-gray-800">{author.name}</span>
            {phase && (
              <span 
                className="ml-2 px-2 py-0.5 text-xs rounded-full" 
                style={{ backgroundColor: phaseColor + '33', color: phaseColor }}
              >
                {phase}
              </span>
            )}
            <span className="ml-auto text-xs text-gray-500">{timeAgo}</span>
          </div>
          
          <p className="mt-2 text-gray-700">{content}</p>
          
          <div className="mt-4 flex items-center space-x-4">
            <button 
              className={`flex items-center space-x-1 text-sm ${
                liked ? 'text-rose-500' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={handleLike}
            >
              <Heart size={18} className={liked ? 'fill-rose-500' : ''} />
              <span>{likeCount}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
              <MessageCircle size={18} />
              <span>{comments}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 ml-auto">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;