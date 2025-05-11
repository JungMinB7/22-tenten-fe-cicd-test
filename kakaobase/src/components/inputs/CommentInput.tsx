import { postComment } from '@/apis/comment';
import { Send } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function CommentInput() {
  const [comment, setComment] = useState('');
  const param = useParams();
  const id = Number(param.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    try {
      const response = await postComment({ postId: id, content: comment });
      console.log(response);
    } catch (e: any) {
      console.log(e);
    } finally {
      setComment('');
    }
  };

  return (
    <div className="flex border-t-[1px] border-textOpacity50">
      <div className="rounded-full mx-6 my-4 px-4 py-2 bg-containerColor w-full">
        <div className="w-full flex justify-between gap-2">
          <input
            className="focus:outline-none w-full bg-transparent text-sm"
            placeholder="댓글 내용을 작성하세요."
            value={comment}
            onChange={handleChange}
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
