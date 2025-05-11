import api from './api';

export default async function postToS3(
  file: File,
  type: 'profile_image' | 'post_image'
): Promise<string> {
  const response = await api.get(
    `/images/presigned-url?fileName=${file.name}&fileSize=${file.size}&mimeType=${file.type}&type=${type}`
  );
  const url = response.data.presigned_url;

  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  return response.data.image_url;
}
