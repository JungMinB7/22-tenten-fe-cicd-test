import HeaderMain from '@/components/common/header/HeaderMain';
import NavBar from '@/components/common/NavBar';
import PostCard from '@/components/post/PostCard';

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <HeaderMain />
      <div className="flex flex-col overflow-y-auto">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <NavBar />
    </main>
  );
}
