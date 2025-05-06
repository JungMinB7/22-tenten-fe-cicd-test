import { useEffect, useState } from 'react';
import getPosts from '@/apis/postList';
import { PostState } from '@/stores/postStore';
import { newDummyPost } from '@/data/newDummyPost';

export default function usePostDetail({ id }: { id: number }) {
  const [post, setPost] = useState<PostState>();
  //const postType = 'pangyo_2';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      if (id == 100) {
        setPost(newDummyPost);
        return;
      }
      const data = await getPosts({});
      setPost(data.find((post) => post.id === id));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

  return {
    post,
    loading,
    error,
  };
}
