'use client';

import { useEffect, useRef } from 'react';
import usePosts from '@/hooks/post/usePostCardHook';
import PostCard from './PostCard';
import { LoaderCircle } from 'lucide-react';

export default function PostList() {
  const { posts, loading, error, hasMore, fetchPosts } = usePosts(6);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 마운트 시 한 번만 호출
  useEffect(() => {
    fetchPosts();
  }, []);

  // 무한 스크롤 옵저버
  useEffect(() => {
    if (loading || !hasMore) return;

    const container = containerRef.current;
    const sentinel = observerRef.current;
    if (!container || !sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchPosts();
        }
      },
      {
        root: container,
        rootMargin: '0px 0px 10px 0px', //바닥에서 100px 위에 떨어진 스크롤 위치에서 추가 호출 발생
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => {
      observer.unobserve(sentinel);
      observer.disconnect();
    };
  }, [loading, hasMore, fetchPosts]);

  if (error) return <div>게시글을 불러올 수 없습니다.</div>;

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 min-h-0 overflow-y-auto"
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore ? (
        <div ref={observerRef} className="h-px" /> // 바닥 1px로 sentinel 감지
      ) : (
        <div className="text-center text-xs font-bold mb-8">
          게시글이 더이상 존재하지 않습니다.
        </div>
      )}

      {loading && (
        <div className="text-center text-xs font-bold mb-4 flex flex-col items-center my-10 gap-4">
          <LoaderCircle
            width={40}
            height={40}
            className="animate-spin text-textColor"
          />
          로딩 중...
        </div>
      )}
    </div>
  );
}
