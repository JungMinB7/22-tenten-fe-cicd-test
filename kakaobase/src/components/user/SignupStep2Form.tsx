'use client';

import SubmitButton from '../common/SubmitButton';
import CourseSelector from '../inputs/CourseSelector';
import UserInput from '../inputs/UserInput';
import { useSignupForm } from '@/hooks/user/useSingupStep2';

export default function SignupStep2Form() {
  const {
    register,
    handleSubmit,
    onSubmitStep2,
    formState: { errors, isValid },
  } = useSignupForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmitStep2)}
      className="min-h-[calc(100vh-10rem)] flex justify-center items-center animate-slide-in"
    >
      <div className="bg-containerColor m-8 px-8 py-12 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col gap-6 w-full">
          <UserInput
            label="한글 이름"
            placeholder="한글 이름을 입력하세요. (연시완)"
            errorMessage={errors.name?.message || ''}
            {...register('name')}
          />
          <UserInput
            label="닉네임"
            placeholder="닉네임을 입력하세요. (void.yeon)"
            errorMessage={errors.nickname?.message || ''}
            {...register('nickname')}
          />
          <CourseSelector
            label="과정명"
            errorMessage={errors.course?.message || ''}
            {...register('course')}
          />
          <UserInput
            label="깃허브 링크"
            placeholder="깃허브 링크를 입력하세요."
            errorMessage={errors.githubUrl?.message || ''}
            {...register('githubUrl')}
          />
        </div>
        <div className="flex flex-col gap-[0.25rem] mt-4">
          <SubmitButton text="회원가입" disabled={!isValid} type="submit" />
        </div>
      </div>
    </form>
  );
}
