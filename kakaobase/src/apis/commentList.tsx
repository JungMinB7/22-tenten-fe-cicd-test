import { PostState } from '@/stores/postStore';
import api from './api';
import { getClientCookie } from '@/lib/getClientCookie';
import { courseMap } from '@/lib/courseMap';
import { PostType } from '@/lib/postType';
import { mapToPostState } from '@/lib/mapPost';
import { GetPostsParams } from './postList';

export default async function getComments(
  id: number,
  { limit, cursor }: GetPostsParams
): Promise<PostState[]> {
  try {
    // let course = getClientCookie('course');
    // if (!course) course = '기타 사용자';
    // const postType = courseMap[course] as PostType;
    const postType = 'PANGYO_2';

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
