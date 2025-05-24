import { postComment } from '@/apis/comment';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function useCommentForm() {
  const [comment, setComment] = useState('');
  const path = usePathname();
  const param = useParams();
  const postId = Number(param.postId);
  const commentId = Number(param.commentId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    try {
      if (path.includes('comment')) {
        await postComment({
          postId,
          content: comment,
          parent_id: commentId,
        });
      } else {
        await postComment({ postId, content: comment });
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setComment('');
      window.location.reload(); // 나중에 바꿔야 함
    }
  };

  return { comment, handleChange, handleSubmit };
}
