import signup from '@/apis/signup';
import { courseMap } from '@/lib/courseMap';
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

  const onSubmitStep2 = async (data: SignupStep2Data) => {
    setStep2Info({
      name: data.name,
      nickname: data.nickname,
      course: data.course,
      githubUrl: data.githubUrl,
    });
    try {
      if (!step1Info || !step2Info) return;
      const request = {
        email: step1Info.email,
        password: step1Info.password,
        name: step2Info.name,
        nickname: step2Info.nickname,
        class_name: courseMap[step2Info.course],
        github_url: step2Info.githubUrl,
      };

      const response = await signup(request);
      console.log(response);

      router.push('login');
    } catch (e: any) {
      console.log(e.response);
    }
  };

  return { ...methods, onSubmitStep2, step1Info, step2Info };
};
