import { courseMapReverse } from '@/lib/courseMap';
import { useEffect, useState } from 'react';

export default function useCourseSelectHook() {
  const initialCourse =
    typeof window !== 'undefined'
      ? localStorage.getItem('currCourse') || 'ALL'
      : 'ALL'; // SSR 환경 보호

  const [course, setCourse] = useState<string>(initialCourse);
  const [myCourseLabel, setMyCourseLabel] = useState('전체');

  useEffect(() => {
    const curr = localStorage.getItem('currCourse');
    const myCourse = localStorage.getItem('myCourse');

    if (curr) setCourse(curr);

    if (myCourse) {
      setMyCourseLabel(courseMapReverse[myCourse]); //한국어로 매핑
    } else {
      setMyCourseLabel('전체');
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
