import { PostState } from '@/stores/postStore';
import api from './api';
import { getClientCookie } from '@/lib/getClientCookie';
import { courseMap } from '@/lib/courseMap';
import { PostType } from '@/lib/postType';
import { mapToPostState } from '@/lib/mapPost';

export interface GetPostsParams {
  limit?: number;
  cursor?: number;
  id?: number;
}

export default async function getPosts({
  limit,
  cursor,
}: GetPostsParams): Promise<PostState[]> {
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
    const rawPosts = response.data.data;
    return rawPosts.map(mapToPostState);
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}
