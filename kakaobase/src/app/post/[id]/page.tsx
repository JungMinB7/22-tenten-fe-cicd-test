'use client';
import Header from '@/components/common/header/Header';
import MiddleBar from '@/components/common/MiddleBar';
import CommentInput from '@/components/inputs/CommentInput';
import PostCard from '@/components/post/PostCard';
import PostList from '@/components/post/PostList';
import usePostDetail from '@/hooks/post/usePostCardDetail';

export default function Page({ params }: { params: { id: number } }) {
  const id = Number(params.id);
  const { post, loading, error } = usePostDetail({ id });

  if (loading) return <div>로딩 중...</div>;
  if (!post || error) return <div>게시글을 찾을 수 없습니다.</div>;
  return (
    <div className="flex flex-col h-screen">
      <Header label="게시글 상세" />
      <PostCard post={post} />
      <MiddleBar />
      <div className="overflow-y-auto flex flex-grow">
        <PostList />
      </div>
      <CommentInput />
    </div>
  );
}
