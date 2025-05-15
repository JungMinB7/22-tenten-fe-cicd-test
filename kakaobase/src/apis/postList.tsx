import api from './api';
import type { Post } from '@/stores/postType';
import { getClientCookie } from '@/lib/getClientCookie';
import { mapToPostEntity } from '@/lib/mapPost';

export interface GetPostsParams {
  limit?: number;
  cursor?: number;
  id?: number;
}

export default async function getPosts({
  limit,
  cursor,
}: GetPostsParams): Promise<Post[]> {
  try {
    let postType = getClientCookie('course');
    if (!postType) postType = 'ALL';

    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;
    const response = await api.get(`/posts/${postType}`, {
      params,
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    return response.data.data.map((p: any) => mapToPostEntity(p, 'post'));
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}
