import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import CommunityPost from '../components/community/CommunityPost';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Send, Heart, Brain, Sparkles, Leaf, Users } from 'lucide-react';
import { phaseInfoData } from '../data/phaseData';
import { useCommunityPosts } from '../hooks/useCommunityPosts';

type CategoryType = 'mental-health' | 'somatic-therapy' | 'advice' | 'general' | 'wellness' | 'cycle-support';

interface Category {
  id: CategoryType;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const categories: Category[] = [
  {
    id: 'mental-health',
    name: 'Mental Health',
    icon: <Brain className="text-purple-500" size={20} />,
    description: 'Share experiences and support around mental well-being during your cycle',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: 'somatic-therapy',
    name: 'Somatic Therapy',
    icon: <Heart className="text-rose-500" size={20} />,
    description: 'Body-based healing and therapeutic practices',
    color: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'wellness',
    name: 'Wellness & Self-Care',
    icon: <Leaf className="text-green-500" size={20} />,
    description: 'Holistic wellness tips and self-care practices',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: 'cycle-support',
    name: 'Cycle Support',
    icon: <Sparkles className="text-amber-500" size={20} />,
    description: 'Phase-specific support and cycle syncing',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'advice',
    name: 'Advice & Questions',
    icon: <Users className="text-blue-500" size={20} />,
    description: 'Seek advice and share knowledge with the community',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'general',
    name: 'General Discussion',
    icon: <Users className="text-gray-500" size={20} />,
    description: 'Open discussions and community chat',
    color: 'bg-gray-50 text-gray-700 border-gray-200'
  }
];

const CommunityPage: React.FC = () => {
  const { user } = useUser();
  const { posts, loading, error, createPost } = useCommunityPosts();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [postContent, setPostContent] = useState('');
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-center text-gray-600">Please log in to access the community.</p>
        </div>
      </div>
    );
  }

  const handlePost = async () => {
    if (!selectedCategory || !postContent.trim()) return;

    try {
      await createPost({
        category: selectedCategory,
        content: postContent,
        phase: user.cycle.currentPhase
      });
      setPostContent('');
      setSelectedCategory(null);
    } catch (err) {
      console.error('Failed to create post:', err);
      alert('Failed to create post. Please try again.');
    }
  };

  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <p>Error loading posts: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Community</h1>
        
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl border transition-all ${
                selectedCategory === category.id 
                  ? `${category.color} border-2` 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {category.icon}
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              <p className="text-sm text-gray-600 text-left">
                {category.description}
              </p>
            </button>
          ))}
        </div>

        {/* Post creation */}
        <Card className="mb-8 p-5">
          <div className="flex items-start space-x-3">
            <img 
              src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150" 
              alt="Your profile" 
              className="w-10 h-10 rounded-full object-cover" 
            />
            <div className="flex-grow">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder={selectedCategory 
                  ? `Share your thoughts in ${categories.find(c => c.id === selectedCategory)?.name}...`
                  : "Select a category and share your thoughts..."
                }
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-rose-500 focus:border-rose-500 min-h-24"
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer"
                    style={{ 
                      backgroundColor: phaseInfoData[user.cycle.currentPhase].color + '33',
                      color: phaseInfoData[user.cycle.currentPhase].color.replace('33', '') 
                    }}
                  >
                    {phaseInfoData[user.cycle.currentPhase].displayName}
                  </div>
                  {selectedCategory && (
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      categories.find(c => c.id === selectedCategory)?.color
                    }`}>
                      {categories.find(c => c.id === selectedCategory)?.name}
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handlePost} 
                  disabled={!postContent.trim() || !selectedCategory}
                  icon={<Send size={16} />}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Category header */}
        {selectedCategory && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              View All Categories
            </button>
          </div>
        )}
        
        {/* Community posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <CommunityPost
              key={post.id}
              author={post.author}
              timeAgo={new Date(post.created_at).toLocaleDateString()}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              phase={post.phase}
              phaseColor={phaseInfoData[post.phase].color}
            />
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No posts yet in this category. Be the first to share!</p>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;