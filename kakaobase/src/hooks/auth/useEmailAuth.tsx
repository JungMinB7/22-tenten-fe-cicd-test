import { useState } from 'react';
import { useAuthStore } from '@/stores/emailAuthStore';
import { useAuthTimer } from './useAuthTimer';
import { loginSchema } from '@/schemas/loginSchema';
import sendEmail from '@/apis/sendEmail';
import { usePathname } from 'next/navigation';
import postCodeVerification from '@/apis/verifyCode';

export const useEmailAuth = () => {
  const pathName = usePathname();
  const [codeInput, setCodeInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
  const [isCodeValid, setCodeValid] = useState(false);
  const [codeButtonLabel, setCodeButtonLabel] = useState('인증');
  const [purpose, setPurpose] = useState<'sign-up' | 'password-reset'>(
    'sign-up'
  );

  const {
    verificationAttempts,
    setCode,
    setEmail,
    setVerified,
    incrementAttempt,
  } = useAuthStore();

  const timer = useAuthTimer(() => {
    setCodeValid(false);
  });

  const validateEmail = (email: string) => {
    const result = loginSchema.shape.email.safeParse(email);
    setEmailValid(result.success);
    setError(result.success ? '' : result.error.issues[0].message);
    return result.success;
  };

  const sendCode = async () => {
    setEmail(emailInput);
    if (pathName.includes('signup')) {
      setPurpose('sign-up');
      try {
        timer.start();
        await sendEmail({ email: emailInput, purpose });
        setCodeValid(true);
      } catch (e: any) {
        console.log(e.response.data);
      }
    }
    // } else {
    //   setPurpose('password-reset');
    //   try {
    //     await sendEmail({ email, purpose });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  };

  const verifyCode = async () => {
    if (codeInput.length !== 6) return;

    try {
      await postCodeVerification({ email: emailInput, code: codeInput });
      setCode(codeInput);
      setVerified(true);
      setCodeError('');
      setCodeValid(false);
      setEmailValid(false);
      setCodeButtonLabel('완료');
      timer.stop();
    } catch (e: any) {
      console.log(e.response);
      if (e.response.data.error === 'email_code_invalid') {
        incrementAttempt();
        setCodeError(
          `*인증에 실패하였습니다. (시도 ${verificationAttempts + 1}/3)`
        );
        return;
      } else if (e.response.data.error === 'email_code_fail_logout') {
        setCodeError(`*인증에 실패하였습니다. 잠시 후 시도해 주세요.`);
        setCodeValid(false);
      }
    }
  };

  return {
    codeInput,
    setCodeInput,
    emailInput,
    setEmailInput,
    error,
    isEmailValid,
    validateEmail,
    sendCode,
    verifyCode,
    codeError,
    timer,
    isCodeValid,
    codeButtonLabel,
  };
};
