import { signupStep2Schema } from '@/schemas/signupStep2Schema';
import { useSignupStore } from '@/stores/signupStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type SignupStep2Data = z.infer<typeof signupStep2Schema>;

export const useSignupForm = () => {
  const router = useRouter();
  const step1Info = useSignupStore((state) => state.step1);
  const step2Info = useSignupStore((state) => state.step2);
  const setStep2Info = useSignupStore((state) => state.setStep2);

  const methods = useForm<SignupStep2Data>({
    resolver: zodResolver(signupStep2Schema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      nickname: '',
      course: '' as unknown as SignupStep2Data['course'],
      githubUrl: '',
    },
  });

  const onSubmitStep2 = (data: SignupStep2Data) => {
    setStep2Info({
      name: data.name,
      nickname: data.nickname,
      course: data.course,
      githubUrl: data.githubUrl,
    });
    router.push('/login');
  };

  return { ...methods, onSubmitStep2, step1Info, step2Info };
};
