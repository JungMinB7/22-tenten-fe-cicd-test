import { LoaderCircle } from 'lucide-react';

export default function LoadingSmall() {
  return (
    <div className="text-xs flex justify-center text-center items-center gap-4 text-textColor">
      <LoaderCircle width={12} height={12} className="animate-spin" /> 로딩
      중...
    </div>
  );
}
