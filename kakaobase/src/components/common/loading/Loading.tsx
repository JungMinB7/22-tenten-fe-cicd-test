import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="text-center text-xs font-bold mb-4 flex flex-col items-center my-10 gap-4">
      <LoaderCircle
        width={40}
        height={40}
        className="animate-spin text-textColor"
      />
      로딩 중...
    </div>
  );
}
