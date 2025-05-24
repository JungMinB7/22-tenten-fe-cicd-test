import { useLikeToggle } from '@/hooks/user/useLikeHook';
import { PostEntity } from '@/stores/postType';
import { Heart, MessageCircle } from 'lucide-react';
import React from 'react';

function CommentInfo({ commentCount }: { commentCount: number }) {
  return (
    <div className="flex gap-1 justify-center">
      <MessageCircle width={24} height={24} className="cursor-pointer" />
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
  onClickFunction: (e: React.MouseEvent<SVGElement>) => void;
}) {
  return (
    <div className="flex gap-1">
      <Heart
        width={24}
        height={24}
        onClick={(e) => {
          e.stopPropagation();
          onClickFunction(e);
        }}
        fill={condition ? '#ff465c' : 'transparent'}
        strokeWidth={condition ? 0 : 2}
        className="cursor-pointer"
      />
      <div className="w-12 self-center">{likeCount}</div>
    </div>
  );
}

export default function CountsInfo({ post }: { post: PostEntity }) {
  const { isLiked, likeCount, toggleLike } = useLikeToggle(
    post.isLiked,
    post.likeCount,
    post.id,
    post.type
  );

  return (
    <div className="flex gap-2 text-sm">
      <LikeInfo
        likeCount={likeCount}
        condition={isLiked}
        onClickFunction={toggleLike}
      />
      {(post.type === 'post' || post.type === 'comment') && (
        <CommentInfo
          commentCount={'commentCount' in post ? post.commentCount : 0}
        />
      )}
    </div>
  );
}
