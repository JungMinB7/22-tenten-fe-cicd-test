'use client';

import { useAuthStore } from '@/stores/emailAuthStore';
import SubmitButton from '../common/SubmitButton';
import EmailAuthStep from './EmailAuthStep';
import PasswordStep from './PasswordStep';
import { usePasswordStep } from '@/hooks/user/usePasswordStep';
import { useSignupStore } from '@/stores/signupStore';
import { useRouter } from 'next/navigation';

export default function SignupStep1Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = usePasswordStep();

  const isVerified = useAuthStore((state) => state.isVerified);
  const email = useAuthStore((state) => state.email);
  const setStep1 = useSignupStore((state) => state.setStep1);
  const router = useRouter();

  const onSubmit = (data: { password: string; confirm: string }) => {
    setStep1({ email, password: data.password });
    router.push('/signup/step2');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-[calc(100vh-10rem)] flex justify-center items-center animate-slide-in"
    >
      <div className="bg-containerColor m-8 px-8 py-12 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col gap-6 w-full">
          <EmailAuthStep />
          <PasswordStep register={register} errors={errors} />
        </div>
        <div className="flex flex-col gap-[0.25rem] mt-4">
          <SubmitButton
            text="다음"
            disabled={!isValid || !isVerified}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}
