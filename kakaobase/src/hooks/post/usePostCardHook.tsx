import { useCallback, useState } from 'react';
import getPosts from '@/apis/postList';
import { useParams, usePathname } from 'next/navigation';
import getComments from '@/apis/commentList';
import getRecomments from '@/apis/recomment';
import type { PostEntity } from '@/stores/postType';

export default function usePosts(limit: number) {
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const path = usePathname();
  const param = useParams();

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    const id = Number(param.postId);

    try {
      setLoading(true);
      let data: PostEntity[] = [];

      if (path.includes('comment')) {
        data = await getRecomments(id, { limit, cursor });
      } else if (path.includes('post')) {
        data = await getComments(id, { limit, cursor });
      } else {
        data = await getPosts({ limit, cursor });
      }

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => {
          const newPosts = data.filter(
            (newPost) => !prev.some((p) => p.id === newPost.id)
          );
          return [...prev, ...newPosts];
        });

        const lastId = data[data.length - 1].id;
        setCursor(lastId);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, limit, cursor, path, param]);

  return {
    posts,
    loading,
    error,
    hasMore,
    fetchPosts,
  };
}
