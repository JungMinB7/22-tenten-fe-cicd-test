import api from './api';

interface postParams {
  postType: 'all' | 'pangyo_1' | 'jeju_1' | 'pangyo_2' | 'jeju_2';
  id?: number;
}

//게시글 삭제
export async function deletePost({ postType, id }: postParams) {
  try {
    const response = await api.delete(`posts/${postType}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

interface postBody {
  content?: string;
  imageUrl?: string;
  youtubeUrl?: string;
}

//게시글 생성
export async function postPost(
  { postType }: postParams,
  { content, imageUrl, youtubeUrl }: postBody
) {
  try {
    const response = await api.post(`/posts/${postType}`, {
      content,
      imageUrl,
      youtubeUrl,
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//게시글 상세 조회
export async function getPost({ postType, id }: postParams) {
  try {
    const response = await api.get(`/posts/${postType}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
