'use client';
import { Heart, MessageCircle, ShieldAlert, Trash2, User } from 'lucide-react';
import FollowButtonSmall from '../user/FollowButtonSmall';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PostState } from '@/stores/postStore';
import formatDate from '@/lib/formatDate';
import { useLikeToggle } from '@/hooks/useLikeHook';

export default function PostCard({ post }: { post: PostState }) {
  const router = useRouter();

  const { isLiked, likeCount, toggleLike } = useLikeToggle(
    post.isLiked,
    post.likeCount
  );

  const [isOpen, setOpen] = useState(false);
  const summary =
    '크리처보다는 도비죠. 아하하하하하하(아무튼 실성도비) 내용을 두 줄보다 길게 작성해 볼까나~~';
  const [summaryButton, setSummaryButton] = useState('요약 보기');

  function showSummary() {
    setOpen((prev) => !prev);
    if (isOpen) {
      setSummaryButton('요약 보기');
    } else {
      setSummaryButton('닫기');
    }
  }

  return (
    <div className="flex">
      <div className="flex w-full bg-containerColor mx-8 my-4 p-4 gap-2 rounded-2xl">
        <div
          className="flex w-8 h-7 rounded-lg bg-innerContainerColor justify-center items-center cursor-pointer"
          onClick={() => router.push(`/profile/${post.userId}`)}
        >
          {post.userProfileUrl ? (
            <Image
              src={post.userProfileUrl}
              width={32}
              height={32}
              alt="프로필"
              className="rounded-lg"
            />
          ) : (
            <User className="text-textColor" width={20} height={20} />
          )}
        </div>
        <div className="w-full flex flex-col gap-2 text-textColor">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div
                className="cursor-pointer font-bold text-sm"
                onClick={() => router.push(`/profile/${post.userId}`)}
              >
                {post.nickname}
              </div>
              {post.isMine ? null : (
                <FollowButtonSmall isFollowing={post.isFollowing} />
              )}
            </div>
            <div className="flex gap-2 align-center justify-center">
              <div className="flex self-center text-xs">
                {formatDate(post.createdAt)}
              </div>
              {post.isMine ? (
                <Trash2
                  width={16}
                  height={16}
                  className="self-center cursor-pointer"
                  onClick={() => router.push('/report')}
                />
              ) : (
                <ShieldAlert
                  width={16}
                  height={16}
                  className="self-center cursor-pointer"
                  onClick={() => router.push('/report')}
                />
              )}
            </div>
          </div>
          <div
            className="w-full text-sm line-clamp-2 overflow-hidden text-ellipsis cursor-pointer"
            onClick={() => router.push(`/post/${post.id}`)}
          >
            {post.content}
          </div>
          <div className="w-64 flex justify-center content-center">
            {!post.youtubeUrl ? (
              post.ImageUrl ? (
                <Image
                  src={post.ImageUrl}
                  alt="이미지"
                  height={144}
                  width={152}
                  className="rounded-lg"
                />
              ) : null
            ) : (
              <iframe
                width="256"
                height="144"
                loading="lazy"
                src={`https://www.youtube-nocookie.com/embed/${post.youtubeUrl}`}
                title="유튜브 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            )}
          </div>
          {post.youtubeUrl ? (
            <div className="text-xs text-textColor">
              <div
                className="font-semibold cursor-pointer"
                onClick={showSummary}
              >
                {summaryButton}
              </div>
              {isOpen ? <div>{summary}</div> : null}
            </div>
          ) : null}
          <div className="flex gap-4 text-sm">
            <div className="flex gap-1 justify-center">
              <MessageCircle
                width={24}
                height={24}
                onClick={() => router.push(`/post/${post.id}`)}
                className="cursor-pointer"
              />
              <div className="w-12 self-center">{post.commentCount}</div>
            </div>
            <div className="flex gap-1">
              <Heart
                width={24}
                height={24}
                onClick={toggleLike}
                fill={isLiked ? '#ff465c' : 'transparent'}
                strokeWidth={isLiked ? 0 : 2}
                className="cursor-pointer"
              />
              <div className="w-12 self-center">{likeCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
