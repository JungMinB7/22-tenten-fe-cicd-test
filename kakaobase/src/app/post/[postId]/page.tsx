'use client';
import Header from '@/components/common/header/Header';
import Loading from '@/components/common/loading/Loading';
import MiddleBar from '@/components/common/MiddleBar';
import CommentInput from '@/components/inputs/CommentInput';
import ListRouter from '@/components/post/ListRouter';
import PostCard from '@/components/post/PostCard';
import PostList from '@/components/post/list/PostList';
import usePostDetail from '@/hooks/post/usePostCardDetail';
import { getClientCookie } from '@/lib/getClientCookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params }: { params: { postId: number } }) {
  const router = useRouter();
  useEffect(() => {
    const accessToken = getClientCookie('accessToken');
    if (!accessToken) router.push('/login');
  }, []);

  const id = Number(params.postId);
  const { post, loading } = usePostDetail({ id });

  if (loading) return <Loading />;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header label="게시글 상세" />
      <div
        className="overflow-y-auto flex flex-col min-h-0 my-[4.5rem]"
        data-scroll-area
      >
        <div className="my-4">
          <PostCard post={post} />
        </div>
        <MiddleBar />
        <ListRouter />
      </div>
      <CommentInput />
    </div>
  );
}
