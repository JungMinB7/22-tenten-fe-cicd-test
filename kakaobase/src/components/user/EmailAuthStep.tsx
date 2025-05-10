import { useEmailAuth } from '@/hooks/auth/useEmailAuth';
import SubmitButtonSmall from '../common/SubmitButtonSmall';
import UserInput from '../inputs/UserInput';

export default function EmailAuthStep() {
  const {
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
  } = useEmailAuth();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <UserInput
          label="이메일"
          placeholder="이메일을 입력하세요."
          type="text"
          errorMessage={timer.isRunning ? timer.formatted : error}
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
            validateEmail(e.target.value);
          }}
        />
        <SubmitButtonSmall
          label="전송"
          disabled={!isEmailValid}
          onClick={sendCode}
          type="button"
        />
      </div>
      <div className="flex items-center gap-4">
        <UserInput
          label="인증번호"
          placeholder="인증번호를 입력하세요.(6자리)"
          type="number"
          value={codeInput}
          errorMessage={codeError}
          maxLength={6}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, '');
            if (onlyNumbers.length <= 6) setCodeInput(onlyNumbers);
          }}
        />
        <SubmitButtonSmall
          label={codeButtonLabel}
          onClick={verifyCode}
          disabled={!isCodeValid}
          type="button"
        />
      </div>
    </div>
  );
}
