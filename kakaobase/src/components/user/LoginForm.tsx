'use client';

import UserInput from '../inputs/UserInput';
import SubmitButton from '../common/SubmitButton';
import useLoginForm from '@/hooks/user/useLoginForm';
import { useState } from 'react';
import CheckBoxInput from './CheckBoxInput';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    onSubmit,
    goToSignup,
  } = useLoginForm();

  const [autoLogin, setAutoLogin] = useState(false);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, autoLogin))}
      className="min-h-[calc(100vh-10rem)] flex justify-center items-center animate-slide-in"
    >
      <div className="bg-containerColor m-8 px-8 py-12 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col gap-6 w-full">
          <UserInput
            label="이메일"
            placeholder="이메일을 입력하세요."
            type="text"
            errorMessage={errors.email?.message || ''}
            {...register('email')}
          />
          <UserInput
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            type="password"
            errorMessage={errors.password?.message || ''}
            {...register('password')}
          />
        </div>
        <CheckBoxInput
          checked={autoLogin}
          setCheckStatus={setAutoLogin}
          label="자동 로그인"
        />
        <div className="flex flex-col gap-[0.25rem] mt-4">
          <SubmitButton text="로그인" disabled={!isValid} type="submit" />
          <SubmitButton
            text="회원가입하러 가기"
            onClick={goToSignup}
            type="button"
          />
        </div>
      </div>
    </form>
  );
}
