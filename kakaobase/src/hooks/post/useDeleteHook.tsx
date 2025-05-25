import { deleteComment } from '@/apis/comment';
import { deletePost } from '@/apis/post';
import { deleteRecomment } from '@/apis/recomment';
import { queryClient } from '@/app/providers';
import { PostType } from '@/lib/postType';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function useDeleteHook({ id, type }: { id: number; type: string }) {
  const router = useRouter();
  const path = usePathname();
  const [isOpened, setOpen] = useState(false);
  async function deletePostExecute() {
    const postType =
      typeof window !== 'undefined'
        ? (localStorage.getItem('currCourse') as PostType) || 'ALL'
        : 'ALL';
    try {
      if (type === 'post') {
        await deletePost({ postType, id });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      } else if (type === 'comment') {
        await deleteComment({ id });
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      } else {
        await deleteRecomment({ id });
        queryClient.invalidateQueries({ queryKey: ['recomments'] });
      }
      setOpen(false);
      if (path.includes('post') && type === 'post')
        router.push('/'); //게시글 상세에서 게시글 지우기
      else if (path.includes('comment') && type === 'comment') router.back(); //댓글 상세에서 댓글 지우기
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
