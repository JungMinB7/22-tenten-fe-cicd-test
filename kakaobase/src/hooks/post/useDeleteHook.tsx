import { deleteComment } from '@/apis/comment';
import { deletePost } from '@/apis/post';
import { deleteRecomment } from '@/apis/recomment';
import { getClientCookie } from '@/lib/getClientCookie';
import { PostType } from '@/lib/postType';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function useDeleteHook({ id, type }: { id: number; type: string }) {
  let postType = getClientCookie('course') as PostType;
  if (!postType) postType = 'ALL';

  const router = useRouter();
  const path = usePathname();
  const [isOpened, setOpen] = useState(false);
  async function deletePostExecute() {
    try {
      if (type === 'post') await deletePost({ postType, id });
      else if (type === 'comment') await deleteComment({ id });
      else await deleteRecomment({ id }); // 대댓글 삭제
      setOpen(false);
      if (path.includes('post') && type === 'post')
        router.push('/'); //게시글 상세에서 게시글 지우기
      else if (path.includes('comment') && type === 'comment')
        router.back(); //댓글 상세에서 댓글 지우기
      else window.location.reload(); //댓글 상세에서 대댓글 지우기
      //얘도 나중에 바꿔야 함
    } catch (e: any) {
      console.log(e);
    }
  }
  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }
  return { isOpened, deletePostExecute, closeModal, openModal };
}
