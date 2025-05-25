import { getRecomments } from '@/apis/recomment';
import { PostEntity } from '@/stores/postType';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

export default function useRecommentList({
  commentId,
}: {
  commentId: number;
}): UseInfiniteQueryResult<InfiniteData<PostEntity[]>, Error> {
  return useInfiniteQuery<
    PostEntity[],
    Error,
    InfiniteData<PostEntity[]>,
    ['recomments', number],
    number | undefined
  >({
    queryKey: ['recomments', commentId],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getRecomments(commentId, {
        limit: 6,
        cursor: pageParam,
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    initialPageParam: undefined,
  });
}
