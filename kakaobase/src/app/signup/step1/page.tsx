import Header from '@/components/common/header/Header';
import SignupStep1Form from '@/components/user/SignupStep1Form';

export default function Page() {
  return (
    <div>
      <Header label="회원가입" />
      <SignupStep1Form />
    </div>
  );
}
