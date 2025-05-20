import { courseMapReverse } from '@/lib/courseMap';
import { useEffect, useState } from 'react';

export default function useCourseSelectHook() {
  const [course, setCourse] = useState<string>(
    localStorage.getItem('currCourse') || 'ALL'
  );
  const [myCourseLabel, setMyCourseLabel] = useState('기타 사용자');

  useEffect(() => {
    const curr = localStorage.getItem('currCourse');
    const myCourse = localStorage.getItem('myCourse');

    if (curr) setCourse(curr);

    if (myCourse) {
      setMyCourseLabel(courseMapReverse[myCourse]); //한국어로 매핑
    } else {
      setMyCourseLabel('기타 사용자');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored =
        localStorage.getItem('currCourse') ||
        localStorage.getItem('myCourse') ||
        'ALL';
      setCourse((prev) => (prev !== stored ? stored : prev));
    }, 0);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourse = e.target.value;
    setCourse(newCourse);
    localStorage.setItem('currCourse', newCourse);
  };

  return { myCourseLabel, handleChange, course };
}
