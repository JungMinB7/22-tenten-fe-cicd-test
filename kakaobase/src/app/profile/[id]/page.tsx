import NotFound from '@/app/not-found';
import NavBar from '@/components/common/NavBar';

const mockUser = {
  isLoggined: false,
  profileImg: '/test_profile.jpg',
};

export default function Page() {
  if (mockUser.isLoggined) {
    return (
      <div>
        <div>마이 페이지 / BASE페이지 입니다.</div>
        <NavBar />
      </div>
    );
  } else {
    return <NotFound />;
  }
}
