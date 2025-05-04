'use client';
import { Heart, MessageCircle, ShieldAlert, User } from 'lucide-react';
import FollowButtonSmall from '../user/FollowButtonSmall';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostCard() {
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);

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
    <div className="flex">
      <div className="flex w-full bg-containerColor mx-8 my-4 p-4 gap-2 rounded-2xl">
        <div
          className="flex w-8 h-8 rounded-lg bg-innerContainerColor justify-center items-center cursor-pointer"
          onClick={() => router.push('/profile/1')}
        >
          <User className="text-textColor" />
        </div>
        <div className="w-full flex flex-col gap-2 text-textColor">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div
                className="cursor-pointer"
                onClick={() => router.push('/profile/1')}
              >
                daisy.kim
              </div>
              <FollowButtonSmall />
            </div>
            <div className="flex gap-2 align-center justify-center">
              <div className="flex self-center text-xs">오전 11:24</div>
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
            크리처보다는 도비죠. 아하하하하하하(아무튼 실성도비) 내용을 두
            줄보다 길게 작성해 볼까나~~
          </div>
          <div className="w-full h-40 bg-innerContainerColor rounded-lg text-center content-center">
            image or youtube
            <br />
            [full x 160]
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
