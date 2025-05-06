import api from './api';

interface idParam {
  id: number;
}

//게시글 좋아요 등록
export async function likePost({ id }: idParam) {
  try {
    const response = await api.post(`/posts/${id}/likes`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//게시글 좋아요 취소
export async function deletePostLike({ id }: idParam) {
  try {
    const response = await api.delete(`/posts/${id}/likes`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//댓글 좋아요 등록
export async function likeComment({ id }: idParam) {
  try {
    const response = await api.post(`/comments/${id}/likes`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//댓글 좋아요 취소
export async function deleteCommenttLike({ id }: idParam) {
  try {
    const response = await api.delete(`/comments/${id}/likes`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
