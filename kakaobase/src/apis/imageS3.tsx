import { getClientCookie } from '@/lib/getClientCookie';
import api from './api';

export default async function postToS3(
  file: File,
  type: 'profile_image' | 'post_image'
): Promise<string> {
  const response = await api.get(
    `/images/presigned-url?fileName=${file.name}&fileSize=${file.size}&mimeType=${file.type}&type=${type}`,
    {
      headers: {
        Authorization: `Bearer ${getClientCookie('accessToken')}`,
      },
    }
  );

  const url = response.data.data.presingedUrl;

  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: file,
    mode: 'cors',
  }).catch((error) => {
    console.error('이미지 업로드 실패:', error);
    throw error;
  });

  return response.data.data.imageUrl;
}
