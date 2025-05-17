'use client';
import Header from '@/components/common/header/Header';
import Loading from '@/components/common/loading/Loading';
import MiddleBar from '@/components/common/MiddleBar';
import CommentInput from '@/components/inputs/CommentInput';
import PostCard from '@/components/post/PostCard';
import PostList from '@/components/post/PostList';
import usePostDetail from '@/hooks/post/usePostCardDetail';

export default function Page({ params }: { params: { postId: number } }) {
  const id = Number(params.postId);
  const { post, loading, error } = usePostDetail({ id });

  if (loading) return <Loading />;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;
  if (error) return <div>오류입니다.</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header label="게시글 상세" />
      <div
        className="overflow-y-auto flex flex-col min-h-0 my-20"
        data-scroll-area
      >
        <PostCard post={post} />
        <MiddleBar />
        <PostList />
      </div>
      <CommentInput />
    </div>
  );
}
