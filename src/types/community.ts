export interface CommunityPost {
  id: string;
  user_id: string;
  category: string;
  content: string;
  phase: string;
  created_at: string;
  likes: number;
  comments: number;
  author?: {
    name: string;
    avatar: string;
  };
}

export interface CreatePostData {
  category: string;
  content: string;
  phase: string;
}