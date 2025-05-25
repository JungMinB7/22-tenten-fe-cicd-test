import getComments from '@/apis/commentList';
import { PostEntity } from '@/stores/postType';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

export default function useCommentList({
  postId,
}: {
  postId: number;
}): UseInfiniteQueryResult<InfiniteData<PostEntity[]>, Error> {
  return useInfiniteQuery<
    PostEntity[],
    Error,
    InfiniteData<PostEntity[]>,
    ['comments', number],
    number | undefined
  >({
    queryKey: ['comments', postId],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const response = await getComments(postId, {
        limit: 6,
        cursor: pageParam,
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
    initialPageParam: undefined,
  });
}
