'use client';
import Header from '@/components/common/header/Header';
import MiddleBar from '@/components/common/MiddleBar';
import CommentInput from '@/components/inputs/CommentInput';
import PostCard from '@/components/post/PostCard';
import PostList from '@/components/post/PostList';
import usePostDetail from '@/hooks/post/usePostCardDetail';
import { LoaderCircle } from 'lucide-react';

export default function Page({ params }: { params: { commentId: number } }) {
  const id = Number(params.commentId);
  const { post, loading, error } = usePostDetail({ id });

  if (loading)
    return (
      <div className="text-center text-xs font-bold mb-4 flex flex-col items-center my-10 gap-4">
        <LoaderCircle
          width={40}
          height={40}
          className="animate-spin text-textColor"
        />
        로딩 중...
      </div>
    );

  if (!post || error) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header label="답글 상세" />
      <PostCard post={post} />
      <MiddleBar />
      <div className="overflow-y-auto flex flex-grow">
        <PostList />
      </div>
      <CommentInput />
    </div>
  );
}
