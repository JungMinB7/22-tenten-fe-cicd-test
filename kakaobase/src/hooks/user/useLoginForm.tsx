import { z } from 'zod';
import { loginSchema } from '@/schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { login } from '@/apis/login';
import { useUserStore } from '@/stores/userStore';
import { v4 as uuidv4 } from 'uuid';

type LoginFormData = z.infer<typeof loginSchema>;

export default function useLoginForm() {
  const router = useRouter();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData, autoLogin: boolean) => {
    const deviceId = localStorage.getItem('deviceId') || uuidv4();
    localStorage.setItem('deviceId', deviceId);
    const userAgent = navigator.userAgent;

    const requestBody = {
      email: data.email,
      password: data.password,
      device_id: deviceId,
      user_agent: userAgent,
    };

    try {
      const response = await login(requestBody);
      document.cookie = `accessToken=${response.data.access_token}; path=/; secure; samesite=strict; max-age=3600`;
      document.cookie = `course=${response.data.class_name}; path=/; max-age=86400`; //refresh Token이랑 기간 동일하게 or 1일
      document.cookie = `course=${response.data.nickname}; path=/; max-age=86400`; //refresh Token이랑 기간 동일하게 하기 or 1일
      document.cookie = `course=${response.data.nickname}; path=/; max-age=86400`; //refresh Token이랑 기간 동일하게 하기 or 1일
      if (autoLogin) {
        document.cookie = `autoLogin=true; path=/; max-age=86400`; //refresh Token이랑 기간 동일하게 하기 or 1일
      } else {
        document.cookie = `autoLogin=false; path=/; max-age=0`; // 삭제
      }
      setUserInfo({
        course: response.data.class_name,
        nickname: response.data.nickname,
        autoLogin: autoLogin,
      });
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return {
    ...loginForm,
    onSubmit,
    goToSignup: () => {
      router.push('/signup/step1');
    },
  };
}
