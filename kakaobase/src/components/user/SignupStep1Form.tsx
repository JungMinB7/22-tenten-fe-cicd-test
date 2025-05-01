'use client';

import UserInput from '../inputs/UserInput';
import SubmitButton from '../common/SubmitButton';
import useLoginForm from '@/hooks/useLoginForm';
import EmailAuthStep from './EmailAuthStep';

export default function SignupStep1Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    onSubmit,
  } = useLoginForm();

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit)}
      className="min-h-[calc(100vh-10rem)] flex justify-center items-center animate-slide-in"
    >
      <div className="bg-containerColor m-8 px-8 py-12 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col gap-6 w-full">
          <EmailAuthStep />

          <UserInput
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            type="password"
            errorMessage="임시 메시지"
          />
          <UserInput
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더입력하세요."
            type="password"
            errorMessage="임시 메시지"
          />
        </div>
        <div className="flex flex-col gap-[0.25rem] mt-4">
          <SubmitButton text="다음" disabled={!isValid} type="submit" />
        </div>
      </div>
    </form>
  );
}
