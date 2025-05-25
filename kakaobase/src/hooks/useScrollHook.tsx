import { useEffect, useRef, useState } from 'react';

export default function useScrollHook({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  refetch,
}: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean | undefined;
  fetchNextPage: () => void;
  refetch: () => void;
}) {
  const observerRef = useRef(null);
  const scrollAreaRef = useRef<HTMLElement | null>(null);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const scrollArea = document.querySelector(
      '[data-scroll-area]'
    ) as HTMLElement;
    if (!scrollArea) return;

    scrollAreaRef.current = scrollArea;

    const onTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const onTouchEnd = async (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const scrollTop = scrollArea.scrollTop;
      const isPullDown = endY - touchStartY > 10 && scrollTop === 0;
      if (isPullDown) {
        await refetch();
      }
    };

    scrollArea.addEventListener('touchstart', onTouchStart);
    scrollArea.addEventListener('touchend', onTouchEnd);

    return () => {
      scrollArea.removeEventListener('touchstart', onTouchStart);
      scrollArea.removeEventListener('touchend', onTouchEnd);
    };
  }, [touchStartY, refetch]);

  return { observerRef };
}
