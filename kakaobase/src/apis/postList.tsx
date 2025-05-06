import { dummyPosts } from '@/data/dummyPosts';
import { PostState } from '@/stores/postStore';

interface GetPostParams {
  limits?: number;
  cursor?: number;
  createdAt?: string;
}

export default async function getPosts({
  limits,
  cursor,
  createdAt,
}: GetPostParams): Promise<PostState[]> {
  try {
    let filtered = [...dummyPosts];

    if (cursor !== undefined) {
      filtered = filtered.filter((post) => post.id < cursor);
    }

    if (createdAt !== undefined) {
      filtered = filtered.filter((post) => post.createdAt < createdAt);
    }

    if (limits !== undefined) {
      filtered = filtered.slice(0, limits);
    }

    return await new Promise((resolve) => {
      setTimeout(() => resolve(filtered), 300); // 300ms 지연
    });

    // const response = await api.get(
    //   `/posts?limits=${limits}&cursor=${cursor}&created_at=${createdAt}`
    // );
    // return response.data;
  } catch (e) {
    console.log('getPosts() error:', e);
    return [];
  }
}
