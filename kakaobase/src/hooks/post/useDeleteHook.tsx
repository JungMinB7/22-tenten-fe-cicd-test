import { deletePost } from '@/apis/post';
import { getClientCookie } from '@/lib/getClientCookie';
import { PostType } from '@/lib/postType';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function useDeleteHook({ id }: { id: number }) {
  let postType = getClientCookie('course') as PostType;
  if (!postType) postType = 'ALL';

  const router = useRouter();
  const path = usePathname();
  const [isOpened, setOpen] = useState(false);
  async function deletePostExecute() {
    try {
      await deletePost({ postType, id });
      setOpen(false);
      if (path.includes('post')) router.push('/');
      else window.location.reload(); //얘도 나중에 바꿔야 함
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
