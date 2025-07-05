/*
  # Create Community Posts Schema

  1. New Tables
    - `community_posts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `category` (text)
      - `content` (text)
      - `phase` (text)
      - `created_at` (timestamp)
      - `likes` (integer)
      - `comments` (integer)

  2. Security
    - Enable RLS on `community_posts` table
    - Add policies for authenticated users to:
      - Read all posts
      - Create their own posts
      - Update/delete their own posts
*/

CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  category text NOT NULL,
  content text NOT NULL,
  phase text NOT NULL,
  created_at timestamptz DEFAULT now(),
  likes integer DEFAULT 0,
  comments integer DEFAULT 0
);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read all posts
CREATE POLICY "Users can read all posts"
  ON community_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy to allow users to create their own posts
CREATE POLICY "Users can create their own posts"
  ON community_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own posts
CREATE POLICY "Users can update their own posts"
  ON community_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own posts
CREATE POLICY "Users can delete their own posts"
  ON community_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);