'use client';
import { useState } from 'react';

export default function FollowButtonSmall() {
  const [isFollowed, setFollowed] = useState(false);

  function controlFollow() {
    setFollowed((prev) => !prev);
  }

  return (
    <button
      onClick={controlFollow}
      className={`h-4 w-12 align-center rounded-full flex justify-center ${
        !isFollowed
          ? 'bg-myLightBlue text-textOnLight'
          : 'bg-myBlue text-textOnBlue'
      }`}
    >
      <div className="flex justify-self-center text-[0.625rem]">
        {isFollowed ? '팔로우' : '언팔로우'}
      </div>
    </button>
  );
}
