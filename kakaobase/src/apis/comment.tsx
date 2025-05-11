import api from './api';
import { getClientCookie } from '@/lib/getClientCookie';

//댓글 삭제
export async function deleteComment({ id }: { id: number }) {
  try {
    const response = await api.delete(`comments/${id}`);
    console.log(response.data);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}

//댓글 생성
export async function postComment({
  postId,
  content,
}: {
  postId: number;
  content: string;
}) {
  try {
    const response = await api.post(
      `/posts/${postId}/comments`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${getClientCookie('accessToken')}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
