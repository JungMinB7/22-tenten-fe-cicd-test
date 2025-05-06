import api from './api';

//팔로우 요청 api
export async function postFollow({ id }: { id: number }) {
  try {
    const response = await api.post(`/users/${id}/follows`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

//팔로우 취소 api
export async function deleteFollow({ id }: { id: number }) {
  try {
    const response = await api.delete(`/users/${id}/follows`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
