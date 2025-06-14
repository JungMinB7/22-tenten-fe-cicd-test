import { useAuthStore } from '@/stores/emailAuthStore';
import { useSignupStore } from '@/stores/signupStore';
import { useRouter } from 'next/navigation';

export const useSignupStep1 = () => {
  const { isVerified, email } = useAuthStore();
  const { setStep1 } = useSignupStore();
  const router = useRouter();

  const onSubmitStep1 = (password: string) => {
    setStep1({ email, password });
    router.push('signup/step2');
  };

  return {
    isVerified,
    onSubmitStep1,
  };
};
