import { usePostStore } from '@/stores/postStore';
import { useRouter } from 'next/navigation';

export const usePostCardHook = () => {
  const router = useRouter();
  const setPostInfo = usePostStore((state) => state.setPostCardInfo);
};
