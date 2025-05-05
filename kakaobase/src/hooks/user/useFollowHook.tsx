import { useState } from 'react';

export function useFollowToggle(initial: boolean) {
  const [following, setFollowing] = useState(initial);

  const toggleFollow = async () => {
    try {
      if (following) {
        // 언팔로우 API 호출
      } else {
        // 팔로우 API 호출
      }
      setFollowing(!following);
    } catch (e) {
      console.error('팔로우 토글 실패', e);
    }
  };

  return {
    following,
    toggleFollow,
  };
}
