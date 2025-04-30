'use client';
import { useRouter, usePathname } from 'next/navigation';
import {
  House,
  MessageCircle,
  Plus,
  Bell,
  User,
  LucideIcon,
} from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

const mockUser = {
  isLoggined: true,
  profileImg: '/test_profile.jpg',
};

function NavItem({ icon: Icon, path }: { icon: LucideIcon; path: string }) {
  const pathName = usePathname();
  const router = useRouter();

  const isActive = pathName === path;
  //하위 페이지에 따른 색상 설정은 나중에 진행

  return (
    <button onClick={() => router.push(path)}>
      <Icon
        className={clsx(
          'w-6 h-6 transition-colors cursor-pointer',
          isActive ? 'text-myBlue' : 'text-iconColor'
        )}
      />
    </button>
  );
}

export default function NavBar() {
  const router = useRouter();

  return (
    <div className="flex justify-between pb-6 px-6 items-end fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] z-100">
      <NavItem icon={House} path="/" />
      <NavItem icon={MessageCircle} path="/chat" />
      <button
        onClick={() => {
          router.push('/post/new');
        }}
        className="flex w-12 h-12 rounded-full items-center justify-center bg-myBlue cursor-pointer"
      >
        <Plus className="w-6 h-12 text-textOnBlue align-middle" />
      </button>
      <NavItem icon={Bell} path="/alarm" />
      {mockUser.isLoggined ? (
        <Image
          src={mockUser.profileImg}
          width={12}
          height={12}
          alt="profile"
          className="w-6 h-6 rounded-md transition-colors cursor-pointer"
        />
      ) : (
        <NavItem icon={User} path="/profile/[id]" />
      )}
    </div>
  );
}
