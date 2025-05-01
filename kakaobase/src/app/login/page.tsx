import Header from '@/components/common/Header';
import LoginForm from '@/components/user/LoginForm';

export default function Page() {
  return (
    <div>
      <Header label="로그인" />
      <LoginForm />
    </div>
  );
}
