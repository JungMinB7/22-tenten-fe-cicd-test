import { useEffect, useState } from 'react';
import { PostState } from '@/stores/postStore';
import { getPost } from '@/apis/post';
import { getClientCookie } from '@/lib/getClientCookie';
import { PostType } from '@/lib/postType';
import { mapToPostState } from '@/lib/mapPost';

export default function usePostDetail({ id }: { id: number }) {
  const [post, setPost] = useState<PostState>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPost = async () => {
    let postType = getClientCookie('course') as PostType;
    if (!postType) postType = 'ALL';

    try {
      setLoading(true);
      const response = await getPost({ postType, id });
      setPost(mapToPostState(response));
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
