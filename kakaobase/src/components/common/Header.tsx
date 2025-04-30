'use client';
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header({ label }: { label: string }) {
  const router = useRouter();

  return (
    <div className="h-20 px-10 flex relative text-textColor z-50">
      <Undo2
        onClick={() => {
          router.back();
        }}
        className="cursor-pointer self-center"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">
        {label}
      </div>
    </div>
  );
}
