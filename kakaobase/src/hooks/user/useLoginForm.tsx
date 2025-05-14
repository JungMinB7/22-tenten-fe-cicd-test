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
  const { setError } = loginForm;

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
      document.cookie = `accessToken=${response.data.access_token}; path=/; secure; samesite=strict; max-age=1800`; //30분
      document.cookie = `course=${response.data.class_name}; path=/; max-age=1209600`; //refresh Token이랑 기간 동일하게 14일
      document.cookie = `nickname=${response.data.nickname}; path=/; max-age=1209600`;

      if (autoLogin) {
        document.cookie = `autoLogin=true; path=/; max-age=1209600`;
      } else {
        document.cookie = `autoLogin=false; path=/; max-age=0`; // 삭제
      }
      setUserInfo({
        course: response.data.class_name,
        nickname: response.data.nickname,
        autoLogin: autoLogin,
      });
      router.push('/');
    } catch (e: any) {
      console.log(e.response.data);
      if (e.response.data.error === 'invalid_password') {
        setError('password', {
          type: 'manual',
          message: '이메일 또는 비밀번호를 확인해 주세요.',
        });
      }
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
