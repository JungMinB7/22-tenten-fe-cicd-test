import {
  deleteCommentLike,
  deletePostLike,
  deleteRecommentLike,
  likeComment,
  likePost,
  likeRecomment,
} from '@/apis/like';
import { useState } from 'react';

export function useLikeToggle(
  initial: boolean,
  likeCnt: number,
  id: number,
  type: string
) {
  const [isLiked, setLiked] = useState(initial);
  const [likeCount, setLikeCount] = useState(likeCnt);

  const toggleLike = async () => {
    try {
      if (type === 'post') {
        if (isLiked) {
          await deletePostLike({ id });
          setLikeCount((prev) => prev - 1);
        } else {
          await likePost({ id });
          setLikeCount((prev) => prev + 1);
        }
      } else if (type === 'comment') {
        if (isLiked) {
          await deleteCommentLike({ id });
          setLikeCount((prev) => prev - 1);
        } else {
          await likeComment({ id });
          setLikeCount((prev) => prev + 1);
        }
      } else {
        if (isLiked) {
          await deleteRecommentLike({ id });
          setLikeCount((prev) => prev - 1);
        } else {
          await likeRecomment({ id });
          setLikeCount((prev) => prev + 1);
        }
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
