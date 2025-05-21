'use client';

import useCourseSelectHook from '@/hooks/post/useCourseSelectHook';
import { useEffect, useState } from 'react';

export default function PostCourseSelector() {
  const { course, myCourseLabel, handleChange } = useCourseSelectHook();
  const [myCourse, setMyCourse] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMyCourse(localStorage.getItem('myCourse'));
    }
  }, []);

  return (
    <div className="border-b-[1px] border-textOpacity50 shadow-sm px-6 py-6 mt-20 bg-bgColor text-textColor">
      <select
        name="post-course"
        className="bg-transparent focus:outline-none font-bold"
        value={course}
        onChange={handleChange}
        defaultValue={course}
      >
        <option value="ALL">전체</option>
        {myCourse !== 'ALL' && (
          <option value={myCourse || 'ALL'}>{myCourseLabel}</option>
        )}
      </select>
    </div>
  );
}
