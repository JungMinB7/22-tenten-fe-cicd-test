'use client';

import { useEffect, useRef, useState } from 'react';
import usePosts from '@/hooks/post/usePostCardHook';
import PostCard from './PostCard';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '../common/loading/Loading';

export default function PostList() {
  const path = usePathname();
  const { posts, loading, error, hasMore, fetchPosts } = usePosts(6);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
        root: document.querySelector('[data-scroll-area]'),
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

  useEffect(() => {
    const scrollArea = document.querySelector('[data-scroll-area]');
    if (!scrollArea) return;

    const onTouchStart: EventListener = (e) => {
      if (!(e instanceof TouchEvent)) return;
      setTouchStartY(e.touches[0].clientY);
    };

    const onTouchEnd: EventListener = async (e) => {
      if (!(e instanceof TouchEvent)) return;
      const endY = e.changedTouches[0].clientY;
      const scrollTop = scrollArea.scrollTop;

      const isPullDown = endY - touchStartY > 10 && scrollTop === 0;
      if (isPullDown) {
        setIsRefreshing(true);
        await fetchPosts(true);
        setIsRefreshing(false);
      }
    };

    scrollArea.addEventListener('touchstart', onTouchStart);
    scrollArea.addEventListener('touchend', onTouchEnd);
    return () => {
      scrollArea.removeEventListener('touchstart', onTouchStart);
      scrollArea.removeEventListener('touchend', onTouchEnd);
    };
  }, [touchStartY, fetchPosts]);

  if (error) router.push('/login');

  return (
    <div className="flex flex-col">
      {isRefreshing || (loading && <Loading />)}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore ? (
        <div ref={observerRef} className="h-px" /> // 바닥 1px로 sentinel 감지
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
    </div>
  );
}
