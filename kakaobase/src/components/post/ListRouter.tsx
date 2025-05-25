'use client';

import { usePathname } from 'next/navigation';
import RecommentList from './list/RecommentList';
import CommentList from './list/CommentList';
import PostList from './list/PostList';

export default function ListRouter() {
  const path = usePathname();
  if (path.includes('/comment/')) {
    return <RecommentList />;
  } else if (path.includes('/post/')) {
    return <CommentList />;
  } else {
    return <PostList />;
  }
}
