import type { Metadata } from 'next';
import './globals.css';
import { pretendard } from './fonts';
import { Providers } from './providers';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Kakaobase',
  description: '카카오테크 부트캠프 커뮤니티',
  icons: {
    icon: '/logo_square.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`bg-animated-gradient sm:bg-animated-gradient ${pretendard.className}`}
      >
        <Providers>
          <div className="flex w-screen">
            <div className="hidden lg:flex flex-col items-center justify-center w-[48%] active:animate-bounce">
              <Image
                src="/logo_square.svg"
                alt="로고"
                width={0}
                height={0}
                className="w-[20rem] h-auto"
              />
              <Image
                src="/logo_title.svg"
                alt="로고"
                width={0}
                height={0}
                className="w-[24rem] h-auto"
              />
            </div>
            <div className="flex flex-col h-screen justify-center scrollbar-hide w-full max-w-[420px] mx-auto lg:ml-12 lg:self-start bg-bgColor text-textColor shadow-md">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
