import useCommentForm from '@/hooks/post/comment/useCommentForm';
import { Send } from 'lucide-react';

export default function CommentInput() {
  const { comment, handleSubmit, handleChange } = useCommentForm();

  return (
    <form
      className="flex fixed w-full max-w-[480px] border-t-[1px] border-textOpacity50 bottom-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-md"
      onSubmit={handleSubmit}
    >
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
    </form>
  );
}
