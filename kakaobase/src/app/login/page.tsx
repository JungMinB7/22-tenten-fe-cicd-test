import Header from '@/components/common/header/Header';
import LoginForm from '@/components/user/LoginForm';

export default function Page() {
  return (
    <div>
      <Header label="로그인" />
      <LoginForm />
    </div>
  );
}
