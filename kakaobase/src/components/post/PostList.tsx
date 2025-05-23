'use client';

import { useEffect, useRef, useState } from 'react';
import usePosts from '@/hooks/post/usePostCardHook';
import PostCard from './PostCard';
import { usePathname } from 'next/navigation';
import Loading from '../common/loading/Loading';
import useCourseSelectHook from '@/hooks/post/useCourseSelectHook';
import clsx from 'clsx';

export default function PostList() {
  const path = usePathname();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { course } = useCourseSelectHook();

  // usePosts는 course를 deps로 사용
  const { posts, loading, hasMore, fetchPosts } = usePosts(6, course ?? '');

  useEffect(() => {
    fetchPosts(true); // course 변경 시 reset
  }, [course]);

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
        rootMargin: '0px 0px 80px 0px', //바닥에서 20px 위에 떨어진 스크롤 위치에서 추가 호출 발생
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

  return (
    <div className="flex flex-col py-4">
      {isRefreshing || (loading && <Loading />)}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore ? (
        <div ref={observerRef} className="h-px" /> // 바닥 1px로 sentinel 감지
      ) : (
        <div
          className={clsx(
            'text-center text-xs font-bold',
            path === '/' && 'mb-8'
          )}
        >
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
