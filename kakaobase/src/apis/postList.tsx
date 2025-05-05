import api from './api';

export default async function getPost({
  limits,
  cursor,
  createdAt,
}: {
  limits: number;
  cursor: number;
  createdAt: string;
}) {
  try {
    const response = await api.get(
      `/posts/{postType}?limits=${limits}&cursor=${cursor}&created_at=${createdAt}`
    );
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
}
