import type { Metadata } from 'next';
import './globals.css';
import { pretendard } from './fonts';
import { Providers } from './providers';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { refreshLogin } from '@/apis/login';

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
  // const cookieStore = cookies();
  // const accessToken = cookieStore.get('accessToken')?.value;
  // const autoLogin = cookieStore.get('autoLogin')?.value;

  // if (!accessToken && autoLogin === 'true') {
  //   try {
  //     await refreshLogin();
  //   } catch (e) {
  //     redirect('/login');
  //   }
  // }

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
