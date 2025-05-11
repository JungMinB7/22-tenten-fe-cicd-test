import { usePathname } from 'next/navigation';

export default function MiddleBar() {
  const path = usePathname();
  return (
    <div className="py-4 px-6 border-y-[1px] border-textOpacity50 flex items-center">
      <div className="flex gap-4 text-textColor">
        <div className="font-bold text-lg">
          {path.includes('comment') ? '대댓글' : '답글'}
        </div>
      </div>
    </div>
  );
}
