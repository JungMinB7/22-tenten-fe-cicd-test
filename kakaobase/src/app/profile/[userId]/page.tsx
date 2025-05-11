import NavBar from '@/components/common/NavBar';

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">마이 페이지 / BASE페이지 입니다.</div>
      <NavBar />
    </div>
  );
}
