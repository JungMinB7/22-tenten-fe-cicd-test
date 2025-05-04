'use client';
import { Heart, MessageCircle, ShieldAlert, User } from 'lucide-react';
import FollowButtonSmall from '../user/FollowButtonSmall';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PostCard() {
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);
  const youtubeId = 'GLSzQceXAbI';
  const profileUrl = '/test_profile.jpg';
  const imageUrl = '/test_profile.jpg';
  const content =
    '크리처보다는 도비죠. 아하하하하하하(아무튼 실성도비) 내용을 두 줄보다 길게 작성해 볼까나~~';
  const nickname = 'daisy.kim';
  const createdAt = '오전 11:24';

  function controlLike() {
    setLiked((prev) => !prev);
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
  }

  const router = useRouter();

  return (
    <div className="flex animate-slide-in">
      <div className="flex w-full bg-containerColor mx-8 my-4 p-4 gap-2 rounded-2xl">
        <div
          className="flex w-8 h-7 rounded-lg bg-innerContainerColor justify-center items-center cursor-pointer"
          onClick={() => router.push('/profile/1')}
        >
          {profileUrl ? (
            <Image
              src={profileUrl}
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
                className="cursor-pointer"
                onClick={() => router.push('/profile/1')}
              >
                {nickname}
              </div>
              <FollowButtonSmall />
            </div>
            <div className="flex gap-2 align-center justify-center">
              <div className="flex self-center text-xs">{createdAt}</div>
              <ShieldAlert
                width={16}
                height={16}
                className="self-center cursor-pointer"
                onClick={() => router.push('/report')}
              />
            </div>
          </div>
          <div
            className="w-full text-sm line-clamp-2 overflow-hidden text-ellipsis cursor-pointer"
            onClick={() => router.push('post/[id]')}
          >
            {content}
          </div>
          <div className="w-64 flex justify-center content-center">
            {youtubeId === null ? (
              <Image
                src={imageUrl}
                alt="이미지"
                height={144}
                width={152}
                className="rounded-lg"
              />
            ) : (
              <iframe
                width="256"
                height="144"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="유튜브 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            )}
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex gap-1 justify-center">
              <MessageCircle
                width={24}
                height={24}
                onClick={() => router.push('post/[id]')}
                className="cursor-pointer"
              />
              <div className="w-12 self-center">140.2k</div>
            </div>
            <div className="flex gap-1">
              <Heart
                width={24}
                height={24}
                onClick={controlLike}
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
