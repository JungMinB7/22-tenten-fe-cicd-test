'use client';

import PostCard from '../PostCard';
import LoadingSmall from '../../common/loading/LoadingSmall';
import useScrollHook from '@/hooks/useScrollHook';
import useRecommentList from '@/hooks/post/list/useRecommentList';
import { useParams } from 'next/navigation';

export default function RecommentList() {
  const params = useParams();
  const commentId = Number(params.commentId);
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useRecommentList({ commentId });
  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  return (
    <div className="flex flex-col py-4">
      {data?.pages.flat().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1px" />}

      {!hasNextPage && status === 'pending' ? (
        <LoadingSmall />
      ) : (
        <div className="text-center text-xs font-bold mb-8">
          마지막 대댓글입니다.
        </div>
      )}
    </div>
  );
}
