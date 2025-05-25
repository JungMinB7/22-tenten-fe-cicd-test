'use client';

import { usePasswordStep } from '@/hooks/user/usePasswordStep';
import SubmitButton from '../common/button/SubmitButton';
import EmailAuthStep from './EmailAuthStep';
import PasswordStep from './PasswordStep';
import { useSignupStep1 } from '@/hooks/user/useSignupStep1';
import { useState } from 'react';
import CheckBoxInput from './CheckBoxInput';

export default function SignupStep1Form() {
  const {
    register,
    formState: { errors, isValid },
    trigger,
    getValues,
  } = usePasswordStep();
  const { isVerified, onSubmitStep1 } = useSignupStep1();
  const [agree, setAgree] = useState(false);

  return (
    <div className="flex justify-center items-center animate-slide-in">
      <div className="bg-containerColor m-8 px-8 py-12 rounded-xl flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col gap-6 w-full">
          <EmailAuthStep />
          <PasswordStep register={register} errors={errors} trigger={trigger} />
        </div>
        <div>
          <CheckBoxInput
            checked={agree}
            setCheckStatus={setAgree}
            label="개인 정보 수집에 동의합니다."
          />
          <div className="text-[0.625em]">
            ※ 수집 항목 : 이메일, 이름, 닉네임, 소속, 깃허브 링크 <br />
            해당 정보는 본인 확인 및 식별을 위해 사용됩니다. 1년 이상 미접속 시,
            최대 3년까지 보관합니다. 이는 동의하지 않을 경우, 회원가입이
            불가능합니다.
          </div>
        </div>
        <div className="flex flex-col gap-[0.25rem] mt-4">
          <SubmitButton
            text="다음"
            type="button"
            disabled={!isValid || !isVerified || !agree}
            onClick={() => onSubmitStep1(getValues('password'))}
          />
        </div>
      </div>
    </div>
  );
}
