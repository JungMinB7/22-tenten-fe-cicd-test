// src/hooks/usePosts.ts
import { useEffect, useState } from 'react';
import getPost from '@/apis/postList';
import { PostState } from '@/stores/postStore';

interface UsePostsOptions {
  limits?: number;
  cursor?: number;
  createdAt?: string;
}

export default function usePosts(options?: UsePostsOptions) {
  const [posts, setPosts] = useState<PostState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPost(options ?? {});
        setPosts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [options?.cursor, options?.createdAt, options?.limits]);

  return {
    posts,
    loading,
    error,
  };
}
