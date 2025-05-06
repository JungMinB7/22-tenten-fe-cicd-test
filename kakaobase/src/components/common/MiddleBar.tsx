import { Undo2 } from 'lucide-react';

export default function MiddleBar() {
  return (
    <div className="py-4 px-6 border-y-[1px] border-textOpacity50 flex items-center">
      <div className="flex gap-4 text-textColor">
        <Undo2 />
        <div className="font-bold text-lg">답글</div>
      </div>
    </div>
  );
}
