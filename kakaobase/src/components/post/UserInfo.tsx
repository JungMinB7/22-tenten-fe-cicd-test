import { ShieldAlert, Trash2, User } from 'lucide-react';
import FollowButtonSmall from '../user/FollowButtonSmall';
import formatDate from '@/lib/formatDate';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDeleteHook } from '@/hooks/post/useDeleteHook';
import DeleteModal from './DeleteModal';
import { useEffect, useState } from 'react';
import { PostEntity } from '@/stores/postType';

export function UserProfile({ post }: { post: PostEntity }) {
  const router = useRouter();
  function navProfile() {
    router.push(`/profile/${post.userId}`);
  }
  return (
    <div
      className="flex w-8 h-7 rounded-lg bg-innerContainerColor justify-center items-center cursor-pointer"
      onClick={(e) => e.stopPropagation()}
      //onClick={navProfile}
    >
      {post.userProfileUrl ? (
        <Image
          src={post.userProfileUrl}
          width={32}
          height={32}
          alt="프로필"
          className="rounded-lg"
          priority
        />
      ) : (
        <User className="text-textColor" width={20} height={20} />
      )}
    </div>
  );
}

export function UserInfo({ post }: { post: PostEntity }) {
  const id = Number(post.id);
  const type = post.type;
  const router = useRouter();
  function navProfile() {
    router.push(`/profile/${post.userId}`);
  }
  const { isOpened, openModal, closeModal, deletePostExecute } = useDeleteHook({
    id,
    type,
  });

  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth < 340);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-2 items-center min-w-0">
        <div
          className="cursor-pointer font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap"
          // onClick={navProfile}
        >
          {post.nickname}
        </div>
        {/* {post.isMine ? null : (
          <FollowButtonSmall isFollowing={post.isFollowing} />
        )} */}
      </div>
      <div
        className="flex gap-2 align-center justify-center flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex self-center text-xs">
          {formatDate(post.createdAt, isNarrow)}
        </div>
        {post.isMine ? (
          !isOpened ? (
            <Trash2
              width={16}
              height={16}
              className="self-center cursor-pointer"
              onClick={openModal}
            />
          ) : (
            <DeleteModal
              closeFunction={closeModal}
              okFunction={deletePostExecute}
            />
          )
        ) : // <ShieldAlert
        //   width={16}
        //   height={16}
        //   className="self-center cursor-pointer"
        //   onClick={() => router.push('/report')}
        // />
        //mvp 때 신고 페이지를 구현하지 않아 주석 처리
        null}
      </div>
    </div>
  );
}
