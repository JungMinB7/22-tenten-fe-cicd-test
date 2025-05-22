import Header from '@/components/common/header/Header';
import SignupStep2Form from '@/components/user/SignupStep2Form';

export default function Page() {
  return (
    <div className="overflow-y-auto">
      <Header label="회원가입" />
      <div className="overflow-y-auto">
        <SignupStep2Form />
      </div>
    </div>
  );
}
