import HeaderMain from '@/components/common/header/HeaderMain';
import NavBar from '@/components/common/NavBar';
import ListRouter from '@/components/post/ListRouter';
import PostCourseSelector from '@/components/post/PostCourseSelector';
import PostList from '@/components/post/list/PostList';

export default function Home() {
  return (
    <main className="flex flex-col h-screen scroll-none">
      <HeaderMain />
      <PostCourseSelector />
      <div
        className="flex overflow-y-auto flex-grow flex-col mb-12"
        data-scroll-area
      >
        <ListRouter />
      </div>
      <NavBar />
    </main>
  );
}
