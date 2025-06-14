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
      localStorage.setItem('myCourse', response.data.class_name);
      localStorage.setItem('nickname', response.data.nickname);

      if (autoLogin) {
        localStorage.setItem('autoLogin', 'true');
      } else {
        localStorage.setItem('autoLogin', 'false');
      }
      setUserInfo({
        course: response.data.class_name,
        nickname: response.data.nickname,
        autoLogin: autoLogin,
      });
      router.push('/');
    } catch (e: any) {
      const errorCode = e?.response?.data?.error;
      if (errorCode === 'invalid_password') {
        setError('password', {
          type: 'manual',
          message: '이메일 또는 비밀번호를 확인해 주세요.',
        });
      } else {
        if (errorCode === undefined) alert(e);
        else alert(errorCode);
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
