'use client';

import { useEffect, useRef } from 'react';
import usePosts from '@/hooks/post/usePostCardHook';
import PostCard from './PostCard';
import { LoaderCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function PostList() {
  const path = usePathname();
  const { posts, loading, error, hasMore, fetchPosts } = usePosts(6);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // 마운트 시 한 번만 호출
  useEffect(() => {
    fetchPosts();
  }, []);

  // 무한 스크롤 옵저버
  useEffect(() => {
    if (loading || !hasMore) return;

    const sentinel = observerRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchPosts();
        }
      },
      {
        root: document.querySelector('#scroll-area'),
        rootMargin: '0px 0px 20px 0px', //바닥에서 20px 위에 떨어진 스크롤 위치에서 추가 호출 발생
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => {
      observer.unobserve(sentinel);
      observer.disconnect();
    };
  }, [loading, hasMore, fetchPosts]);

  if (error) router.push('/login');

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore ? (
        <div ref={observerRef} className="h-100" /> // 바닥 1px로 sentinel 감지
      ) : (
        <div className="text-center text-xs font-bold mb-8">
          마지막&nbsp;
          {path.includes('comment')
            ? '대댓글'
            : path.includes('post')
            ? '댓글'
            : '게시글'}
          입니다.
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
