'use client';

import useCourseSelectHook from '@/hooks/post/useCourseSelectHook';

export default function PostCourseSelector() {
  const { course, myCourseLabel, handleChange } = useCourseSelectHook();

  return (
    <div className="border-b-[1px] shadow-sm px-6 py-6 mt-20 bg-bgColor text-textColor">
      <select
        name="post-course"
        className="bg-transparent focus:outline-none font-bold"
        value={course}
        onChange={handleChange}
        defaultValue={course}
      >
        <option value="ALL">기타 사용자</option>
        {localStorage.getItem('myCourse') !== 'ALL' && (
          <option value={localStorage.getItem('myCourse') || 'ALL'}>
            {myCourseLabel}
          </option>
        )}
      </select>
    </div>
  );
}
