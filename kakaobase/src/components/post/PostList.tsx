'use client';
import usePosts from '@/hooks/post/usePostCardHook';
import PostCard from './PostCard';

export default function PostList() {
  const { posts } = usePosts({ limits: 5 });

  return (
    <div className="flex flex-col overflow-y-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
