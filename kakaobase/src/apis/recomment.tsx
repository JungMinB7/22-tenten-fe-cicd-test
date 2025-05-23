import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';
import { GetPostsParams } from './postList';
import { Post } from '@/stores/postType';
import { mapToPostEntity } from '@/lib/mapPost';

//대댓글 목록 조회
export async function getRecomments(
  commentId: number,
  { limit, cursor }: GetPostsParams
): Promise<Post[]> {
  try {
    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;
    const response = await api.get(`/comments/${commentId}/recomments`, {
      params,
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    return response.data.data.recomments.map((p: any) =>
      mapToPostEntity(p, 'recomment')
    );
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
    return [];
  }
}

//대댓글 삭제
export async function deleteRecomment({ id }: { id: number }) {
  try {
    const response = await api.delete(`recomments/${id}`, {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
