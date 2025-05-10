'use client';

import { usePasswordStep } from '@/hooks/user/usePasswordStep';
import SubmitButton from '../common/SubmitButton';
import EmailAuthStep from './EmailAuthStep';
import PasswordStep from './PasswordStep';
import { useSignupStep1 } from '@/hooks/user/useSignupStep1';

export default function SignupStep1Form() {
  const {
    register,
    formState: { errors, isValid },
    trigger,
    getValues,
  } = usePasswordStep();
  const { isVerified, onSubmitStep1 } = useSignupStep1();

  return (
    <div className="min-h-[calc(100vh-10rem)] flex justify-center items-center animate-slide-in">
      <div className="bg-containerColor m-8 px-8 py-12 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col gap-6 w-full">
          <EmailAuthStep />
          <PasswordStep register={register} errors={errors} trigger={trigger} />
        </div>
        <div className="flex flex-col gap-[0.25rem] mt-4">
          <SubmitButton
            text="다음"
            type="button"
            disabled={!isValid || !isVerified}
            onClick={() => onSubmitStep1(getValues('password'))}
          />
        </div>
      </div>
    </div>
  );
}
