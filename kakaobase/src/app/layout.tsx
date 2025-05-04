import type { Metadata } from 'next';
import './globals.css';
import { pretendard } from './fonts';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Kakaobase',
  description: '카카오테크 부트캠프 커뮤니티',
  icons: {
    icon: '/logo_square.svg',
  },
};

export default function RootLayout({
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
          <div className="flex flex-col mx-auto h-screen scrollbar-hide max-w-[390px] bg-bgColor text-textColor shadow-md">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
