import { dummyPosts } from '@/data/dummyPosts';
import { PostState } from '@/stores/postStore';

interface GetPostsParams {
  limits?: number;
  cursor?: number;
}

export default async function getPosts({
  limits,
  cursor,
}: GetPostsParams): Promise<PostState[]> {
  try {
    let filtered = [...dummyPosts].sort((a, b) => b.id - a.id); // 내림차순 정렬

    if (cursor !== undefined) {
      filtered = filtered.filter((post) => post.id < cursor); // 이전보다 작은 ID만 가져옴
    }

    if (limits !== undefined) {
      filtered = filtered.slice(0, limits);
    }

    return await new Promise((resolve) => {
      setTimeout(() => resolve(filtered), 300); // 300ms 지연 로딩 테스트하려고 일부러 함
    });

    // const response = await api.get(
    //   `/posts?limits=${limits}&cursor=${cursor}`
    // );
    // return response.data;
  } catch (e) {
    console.log('getPosts() error:', e);
    return [];
  }
}
