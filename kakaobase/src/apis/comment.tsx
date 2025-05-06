import api from './api';

//댓글 삭제
export async function deleteComment({ id }: { id: number }) {
  try {
    const response = await api.delete(`comments/${id}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
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
    const response = await api.post(`/posts/${postId}/comments`, { content });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//게시글 목록 조회
export async function getComment({
  postId,
  limits,
  cursor,
  createdAt,
}: {
  postId: number;
  limits: number;
  cursor: number;
  createdAt: string;
}) {
  try {
    const response = await api.get(
      `/posts/${postId}/comments?limits=${limits}&cursor=${cursor}&created_at=${createdAt}`
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
