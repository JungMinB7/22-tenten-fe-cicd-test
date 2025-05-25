import getPosts from '@/apis/postList';
import { PostEntity } from '@/stores/postType';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useEffect } from 'react';

export default function usePostList(): UseInfiniteQueryResult<
  InfiniteData<PostEntity[]>,
  Error
> {
  const course =
    typeof window !== 'undefined'
      ? localStorage.getItem('currCourse') || 'ALL'
      : 'ALL';

  useEffect(() => {
    const targetId = sessionStorage.getItem('scrollToPostId');
    if (!targetId) return;

    const el = document.querySelector(`[data-post-id="${targetId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    sessionStorage.removeItem('scrollToPostId');
    sessionStorage.removeItem('scrollPosition');
  }, []);

  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getPosts({
        limit: 6,
        cursor: pageParam,
        course: course,
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    initialPageParam: undefined,
  });
}
