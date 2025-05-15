import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';

export async function showYoutube(id: number) {
  try {
    const response = await api.get(`posts/${id}/summary`, {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    });
    return response;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
