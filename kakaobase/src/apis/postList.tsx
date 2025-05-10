import { PostState } from '@/stores/postStore';
import api from './api';

interface GetPostsParams {
  limits?: number;
  cursor?: number;
}

export default async function getPosts({
  limits,
  cursor,
}: GetPostsParams): Promise<PostState[]> {
  try {
    const postType = 'pangyo_2';
    const response = await api.get(
      `/posts/${postType}?limits=${limits}&cursor=${cursor}`
    );
    return response.data.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}
