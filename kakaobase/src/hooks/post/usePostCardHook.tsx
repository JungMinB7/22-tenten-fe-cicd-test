import { useCallback, useEffect, useState } from 'react';
import getPosts from '@/apis/postList';
import { PostState } from '@/stores/postStore';

interface UsePostsOptions {
  limits?: number;
  cursor?: number;
  createdAt?: string;
}

export default function usePosts(options?: UsePostsOptions) {
  const [posts, setPosts] = useState<PostState[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(0);

  const fetchPosts = useCallback(async () => {
    //로딩 중이거나 더이상 데이터가 없으면 관두기
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const data = await getPosts({ ...options, cursor: cursor ?? undefined });
      console.log(data);
      //커서는 숫자이거나 undefined

      //데이터가 없으면 더이상 데이터가 없다고 표시하기
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => {
          const newPosts = data.filter(
            (newPost) => !prev.some((p) => p.id === newPost.id)
            // 이전 데이터의 id와 동일한 id의 게시글이 하나라도 있는가? ㄴㄴ인 경우 new로 정의
          );
          return [...prev, ...newPosts];
        });

        const lastId = data[data.length - 1].id; //데이터의 마지막 게시글의 id를 lastId로 정의
        setCursor(lastId); // 커서 업데이트
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, options]);

  return {
    posts,
    loading,
    error,
    hasMore,
    fetchPosts,
  };
}
