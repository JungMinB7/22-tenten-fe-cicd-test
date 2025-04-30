import Image from 'next/image';

export default function HeaderMain() {
  return (
    <div className="flex px-6 gap-2 py-2 items-center bg-bgColor border-b-[1px] border-textOpacity50">
      <Image src="/logo_square.svg" width={64} height={64} alt="로고" />
      <div className="text-textColor flex flex-col">
        <div className="text-lg font-bold">KakaoBase</div>
        <div className="text-[0.5rem]">for Kakaotech Bootcamp Students</div>
      </div>
    </div>
  );
}
