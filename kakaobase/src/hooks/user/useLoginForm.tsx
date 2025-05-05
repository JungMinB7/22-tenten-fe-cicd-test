import { z } from 'zod';
import { loginSchema } from '@/schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';

type LoginFormData = z.infer<typeof loginSchema>;
//로그인 스키마의 타입을 추론하여 로그인 폼 데이터 자료형을 정의하겠다는 뜻

export default function useLoginForm() {
  const router = useRouter();

  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const methods = useForm<LoginFormData>({
    //LoginFormData 자료형의 폼을 사용하겠다.
    resolver: zodResolver(loginSchema),
    mode: 'all', //첫 유효성 검사가 발생하는 시점
    reValidateMode: 'onChange', //유효성 재검사가 발생하는 시점 - 입력이 바뀔 때마다
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData, autoLogin: boolean) => {
    setUserInfo({
      userId: 'mock-id',
      email: data.email,
      nickname: 'mock-nick',
      profileImageUrl: '/default-profile.png',
      autoLogin: autoLogin,
    });
    router.push('/');
  };

  return {
    ...methods,
    onSubmit,
    goToSignup: () => {
      router.push('/signup/step1');
    },
  };
}
