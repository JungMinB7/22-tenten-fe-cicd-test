import api from './api';
import { getClientCookie } from '@/lib/getClientCookie';

//댓글 삭제
export async function deleteComment({ id }: { id: number }) {
  try {
    const response = await api.delete(`comments/${id}`, {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

export async function getComment({ id }: { id: number }) {
  try {
    const response = await api.get(`/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//댓글 생성
export async function postComment({
  postId,
  content,
  parent_id,
}: {
  postId: number;
  content: string;
  parent_id?: number;
}) {
  try {
    const response = await api.post(
      `/posts/${postId}/comments`,
      {
        content,
        parent_id,
      },
      {
        headers: {
          Authorization: `Bearer ${getClientCookie('accessToken')}`,
        },
      }
    );
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
