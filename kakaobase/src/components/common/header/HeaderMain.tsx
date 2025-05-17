import Image from 'next/image';

export default function HeaderMain() {
  return (
    <div className="flex fixed py-2 gap-2 px-6 items-center w-full max-w-[420px] border-b-[1px] top-0 mx-auto lg:self-start bg-bgColor text-textColor shadow-sm">
      <Image src="/logo_square.svg" width={64} height={64} alt="로고" />
      <div className="text-textColor flex flex-col">
        <div className="text-lg font-bold">KakaoBase</div>
        <div className="text-[0.5rem]">for Kakaotech Bootcamp Students</div>
      </div>
    </div>
  );
}
