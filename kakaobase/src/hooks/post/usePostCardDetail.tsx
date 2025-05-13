import { useEffect, useState } from 'react';
import { getPost } from '@/apis/post';
import { getClientCookie } from '@/lib/getClientCookie';
import { PostType } from '@/lib/postType';
import { mapToPostEntity } from '@/lib/mapPost';
import { usePathname } from 'next/navigation';
import { getComment } from '@/apis/comment';
import { PostEntity } from '@/stores/postType';

export default function usePostDetail({ id }: { id: number }) {
  const [post, setPost] = useState<PostEntity>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const path = usePathname();

  const fetchPost = async () => {
    let postType = getClientCookie('course') as PostType;
    if (!postType) postType = 'ALL';
    let response = [];
    try {
      setLoading(true);
      if (path.includes('comment')) {
        response = await getComment({ id });
        setPost(mapToPostEntity(response.data.data, 'comment'));
      } else {
        response = await getPost({ postType, id });
        setPost(mapToPostEntity(response, 'post'));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return {
    post,
    loading,
    error,
  };
}
