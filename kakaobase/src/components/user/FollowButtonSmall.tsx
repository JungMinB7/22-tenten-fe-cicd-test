import { useFollowToggle } from '@/hooks/useFollowHook';

export default function FollowButtonSmall({
  isFollowing,
}: {
  isFollowing: boolean;
}) {
  const { following, toggleFollow } = useFollowToggle(isFollowing);
  return (
    <button
      onClick={toggleFollow}
      className={`h-4 w-12 align-center rounded-full flex justify-center ${
        !following
          ? 'bg-myLightBlue text-textOnLight'
          : 'bg-myBlue text-textOnBlue'
      }`}
    >
      <div className="flex justify-self-center text-[0.625rem]">
        {following ? '팔로우' : '언팔로우'}
      </div>
    </button>
  );
}
