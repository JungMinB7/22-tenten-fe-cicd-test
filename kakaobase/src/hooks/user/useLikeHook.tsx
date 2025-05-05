import { useState } from 'react';

export function useLikeToggle(initial: boolean, likeCnt: number) {
  const [isLiked, setLiked] = useState(initial);
  const [likeCount, setLikeCount] = useState(likeCnt);

  const toggleLike = async () => {
    try {
      if (isLiked) {
        // 좋아요 취소 api
        setLikeCount((prev) => prev - 1);
      } else {
        // 좋아요 등록 api
        setLikeCount((prev) => prev + 1);
      }
      setLiked(!isLiked);
    } catch (e) {
      console.error('팔로우 토글 실패', e);
    }
  };

  return {
    likeCount,
    isLiked,
    toggleLike,
  };
}
