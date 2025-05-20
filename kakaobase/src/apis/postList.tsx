import api from './api';
import type { Post } from '@/stores/postType';
import { getClientCookie } from '@/lib/getClientCookie';
import { mapToPostEntity } from '@/lib/mapPost';

export interface GetPostsParams {
  limit?: number;
  cursor?: number;
  course?: string;
}

export default async function getPosts({
  limit,
  cursor,
  course,
}: GetPostsParams): Promise<Post[]> {
  try {
    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;

    const response = await api.get(`/posts/${course}`, {
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
