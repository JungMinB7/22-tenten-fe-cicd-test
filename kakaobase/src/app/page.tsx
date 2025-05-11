import HeaderMain from '@/components/common/header/HeaderMain';
import NavBar from '@/components/common/NavBar';
import PostCourseSelector from '@/components/post/PostCourseSelector';
import PostList from '@/components/post/PostList';

export default function Home() {
  return (
    <main className="flex flex-col h-screen scroll-none ">
      <HeaderMain />
      {/* <PostCourseSelector /> */}
      <div className="flex overflow-y-auto flex-grow">
        <PostList />
      </div>
      <NavBar />
    </main>
  );
}
