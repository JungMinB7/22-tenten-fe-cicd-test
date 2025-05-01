import { useState } from 'react';
import { useAuthStore } from '@/stores/emailAuthStore';
import { useAuthTimer } from './useAuthTimer';
import { loginSchema } from '@/schemas/loginSchema';

export const useEmailAuth = () => {
  const [code, setCode] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
  const [isCodeValid, setCodeValid] = useState(false);
  const [codeButtonLabel, setCodeButtonLabel] = useState('인증');

  const {
    email,
    setEmail,
    setVerified,
    verificationAttempts,
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

  const sendCode = () => {
    setEmail(emailInput);
    setCodeValid(true);
    timer.start();
    // await api.post('/auth/email-verification', { email: emailInput });
  };

  const verifyCode = () => {
    if (code.length !== 6) return;

    if (code !== '123456') {
      if (verificationAttempts >= 2) {
        setCodeError(`*인증에 실패하였습니다. 잠시 후 시도해 주세요.`);
        setCodeValid(false);
      } else {
        incrementAttempt();
        setCodeError(
          `*인증에 실패하였습니다. (시도 ${verificationAttempts + 1}/3)`
        );
      }
      return;
    }

    setVerified(true);
    setCodeError('');
    setCodeValid(false);
    setEmailValid(false);
    setCodeButtonLabel('완료');
    timer.stop();
  };

  return {
    code,
    setCode,
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
