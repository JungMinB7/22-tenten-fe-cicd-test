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
  isLoggined: false,
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

function LoginProfile({ path }: { path: string }) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(path)}>
      <Image
        src={mockUser.profileImg}
        width={12}
        height={12}
        alt="profile"
        className="w-6 h-6 rounded-md transition-colors cursor-pointer"
      />
    </button>
  );
}

export default function NavBar() {
  const router = useRouter();

  return (
    <div className="h-16 bg-bgColor flex justify-between items-end px-8 py-5 w-full z-50">
      <div className="flex gap-12">
        <NavItem icon={House} path="/" />
        <NavItem icon={MessageCircle} path="/chat" />
      </div>
      <button
        onClick={() => {
          router.push('/post/new');
        }}
        className="mb-2 w-16 h-16 rounded-full flex items-center justify-center bg-myBlue shadow-[0_4px_16px_rgba(44,102,255,0.6)]"
      >
        <Plus className="w-8 h-16 text-textOnBlue align-middle" />
      </button>
      <div className="flex gap-12">
        <NavItem icon={Bell} path="/alarm" />
        {mockUser.isLoggined ? (
          <LoginProfile path="/profile/[id]" />
        ) : (
          <NavItem icon={User} path="/login" />
        )}
      </div>
    </div>
  );
}
