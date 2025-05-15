import { useLikeToggle } from '@/hooks/user/useLikeHook';
import { PostEntity } from '@/stores/postType';
import { Heart, MessageCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

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

export default function CountsInfo({ post }: { post: PostEntity }) {
  const router = useRouter();
  const params = useParams();
  const postId = params.postId;

  const { isLiked, likeCount, toggleLike } = useLikeToggle(
    post.isLiked,
    post.likeCount,
    post.id,
    post.type
  );

  function navDetail() {
    if (post.type === 'comment') {
      router.push(`/post/${postId}/comment/${post.id}`);
    } else {
      router.push(`/post/${post.id}`);
    }
  }

  return (
    <div className="flex gap-4 text-sm">
      {(post.type === 'post' || post.type === 'comment') && (
        <CommentInfo
          onClickFunction={navDetail}
          commentCount={'commentCount' in post ? post.commentCount : 0}
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
