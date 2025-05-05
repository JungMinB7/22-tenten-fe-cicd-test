import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useDeleteHook() {
  const router = useRouter();
  const [isOpened, setOpen] = useState(false);
  function deletePost() {
    //삭제 api 호출
    setOpen(false);
    router.push('/');
  }
  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }
  return { isOpened, deletePost, closeModal, openModal };
}
