import { useLikeToggle } from '@/hooks/user/useLikeHook';
import { PostState } from '@/stores/postStore';
import { Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

function CommentInfo({
  commentCount,
  onClickFunction,
}: {
  commentCount: number;
  onClickFunction: () => void;
}) {
  return (
    <div className="flex gap-1 justify-center">
      <MessageCircle
        width={24}
        height={24}
        onClick={onClickFunction}
        className="cursor-pointer"
      />
      <div className="w-12 self-center">{commentCount}</div>
    </div>
  );
}

function LikeInfo({
  likeCount,
  condition,
  onClickFunction,
}: {
  likeCount: number;
  condition: boolean;
  onClickFunction: () => void;
}) {
  return (
    <div className="flex gap-1">
      <Heart
        width={24}
        height={24}
        onClick={onClickFunction}
        fill={condition ? '#ff465c' : 'transparent'}
        strokeWidth={condition ? 0 : 2}
        className="cursor-pointer"
      />
      <div className="w-12 self-center">{likeCount}</div>
    </div>
  );
}

export default function CountsInfo({ post }: { post: PostState }) {
  const router = useRouter();

  const { isLiked, likeCount, toggleLike } = useLikeToggle(
    post.isLiked,
    post.likeCount,
    post.id,
    post.type
  );

  function navDetail() {
    router.push(`/post/${post.id}`);
  }

  return (
    <div className="flex gap-4 text-sm">
      {post.type !== 'recomment' && (
        <CommentInfo
          onClickFunction={navDetail}
          commentCount={post.commentCount}
        />
      )}
      <LikeInfo
        likeCount={likeCount}
        condition={isLiked}
        onClickFunction={toggleLike}
      />
    </div>
  );
}
