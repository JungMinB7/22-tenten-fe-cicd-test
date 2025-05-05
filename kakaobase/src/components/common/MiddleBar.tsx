import { Undo2 } from 'lucide-react';
import { useState } from 'react';

export default function MiddleBar() {
  const [recommentIsOpen, setOpen] = useState(false);
  return (
    <div className="py-4 px-6 border-y-[1px] border-textOpacity50 flex items-center">
      <div className="flex gap-4 text-textColor">
        {recommentIsOpen && <Undo2 onClick={() => setOpen(false)} />}
        <div className="font-bold text-lg">답글</div>
      </div>
    </div>
  );
}
