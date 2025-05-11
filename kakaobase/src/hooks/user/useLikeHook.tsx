import {
  deleteCommentLike,
  deletePostLike,
  likeComment,
  likePost,
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
      let reponse = {};
      if (type === 'post') {
        if (isLiked) {
          reponse = await deletePostLike({ id });
          setLikeCount((prev) => prev - 1);
        } else {
          reponse = await likePost({ id });
          setLikeCount((prev) => prev + 1);
        }
      } else if (type === 'comment') {
        if (isLiked) {
          const reponse = await deleteCommentLike({ id });
          setLikeCount((prev) => prev - 1);
        } else {
          const reponse = await likeComment({ id });
          setLikeCount((prev) => prev + 1);
        }
      }
      setLiked(!isLiked);
      console.log(reponse);
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
