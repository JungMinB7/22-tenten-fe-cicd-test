'use client';
import usePosts from '@/hooks/usePostCardHook';
import PostCard from './PostCard';

export default function PostList() {
  const { posts, loading, error } = usePosts({ limits: 5 });

  return (
    <div className="flex flex-col overflow-y-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
