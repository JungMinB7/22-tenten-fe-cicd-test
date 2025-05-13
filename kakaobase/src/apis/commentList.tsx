import { Post } from '@/stores/postType';
import api from './api';
import { getAccessToken, getClientCookie } from '@/lib/getClientCookie';
import { mapToPostEntity } from '@/lib/mapPost';
import { GetPostsParams } from './postList';

export default async function getComments(
  id: number,
  { limit, cursor }: GetPostsParams
): Promise<Post[]> {
  try {
    let postType = getClientCookie('course');
    if (!postType) postType = '기타 사용자';

    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;

    const response = await api.get(`/posts/${id}/comments`, {
      params,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.data.data.comments.map((p: any) =>
      mapToPostEntity(p, 'comment')
    );
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}
