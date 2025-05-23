import { postComment } from '@/apis/comment';
import { Send } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function CommentInput() {
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
    let response = {};
    try {
      if (path.includes('comment')) {
        response = await postComment({
          postId,
          content: comment,
          parent_id: commentId,
        });
        console.log(response);
      } else {
        response = await postComment({ postId, content: comment });
      }
      console.log(response);
    } catch (e: any) {
      console.log(e);
    } finally {
      setComment('');
      window.location.reload(); // 나중에 바꿔야 함
    }
  };

  return (
    <div className="flex fixed w-full max-w-[480px] border-t-[1px] border-textOpacity50 bottom-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-md">
      <div className="rounded-full mx-6 my-4 px-4 py-2 bg-containerColor w-full">
        <div className="w-full flex justify-between gap-2">
          <input
            className="focus:outline-none w-full bg-transparent text-sm"
            placeholder="댓글 내용을 작성하세요."
            value={comment}
            onChange={handleChange}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === 'Enter' && handleSubmit()
            }
          />
          <Send
            className={`cursor-pointer transition ${
              comment.trim()
                ? 'text-myBlue'
                : 'text-innerContainerColor cursor-default'
            }`}
            onClick={comment.trim() ? handleSubmit : undefined}
          />
        </div>
      </div>
    </div>
  );
}
