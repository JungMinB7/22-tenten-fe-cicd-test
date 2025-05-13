import { getAccessToken } from '@/lib/getClientCookie';
import api from './api';

export async function showYoutube(id: number) {
  try {
    const response = await api.get(`posts/${id}/summary`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response;
  } catch (e: unknown) {
    if (e instanceof Error) throw e;
  }
}
