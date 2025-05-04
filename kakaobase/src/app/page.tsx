import HeaderMain from '@/components/common/header/HeaderMain';
import NavBar from '@/components/common/NavBar';
import PostCard from '@/components/post/PostCard';

export default function Home() {
  return (
    <main>
      <HeaderMain />
      <div className="flex flex-col bg-scroll">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <NavBar />
    </main>
  );
}
