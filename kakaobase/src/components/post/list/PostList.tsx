'use client';

import PostCard from '../PostCard';
import usePostList from '@/hooks/post/list/usePostList';
import useScrollHook from '@/hooks/useScrollHook';
import LoadingSmall from '../../common/loading/LoadingSmall';

export default function PostList() {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = usePostList();
  const { observerRef } = useScrollHook({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  });

  return (
    <div className="flex flex-col py-4">
      {status === 'pending' && <LoadingSmall />}
      {data?.pages.flat().map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage && <div ref={observerRef} className="h-1px" />}
      {!hasNextPage && status !== 'pending' && (
        <div className="text-center text-xs font-bold mb-8">
          마지막 게시글입니다.
        </div>
      )}
    </div>
  );
}
