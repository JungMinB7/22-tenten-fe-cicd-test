import { PostState } from '@/stores/postStore';
import api from './api';
import { getClientCookie } from '@/lib/getClientCookie';
import { mapToPostState } from '@/lib/mapPost';
import { GetPostsParams } from './postList';

export default async function getComments(
  id: number,
  { limit, cursor }: GetPostsParams
): Promise<PostState[]> {
  try {
    let postType = getClientCookie('course');
    if (!postType) postType = '기타 사용자';

    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;

    const response = await api.get(`/posts/${id}/comments`, {
      params,
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });

    const rawPosts = response.data.data.comments;
    return rawPosts.map(mapToPostState);
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}
