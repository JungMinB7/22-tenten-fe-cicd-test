'use client';
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeaderLeft() {
  const router = useRouter();

  return (
    <Undo2
      onClick={() => {
        router.back();
      }}
      className="cursor-pointer self-center"
    />
  );
}
