import { courseMapReverse } from '@/lib/courseMap';
import { useEffect, useState } from 'react';

export default function useCourseSelectHook() {
  const [course, setCourse] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('currCourse') || 'ALL';
    }
    return 'ALL';
  });
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
    const syncCourse = () => {
      const curr = localStorage.getItem('currCourse');
      setCourse(curr || 'ALL');
    };

    window.addEventListener('currCourseChange', syncCourse);
    return () => window.removeEventListener('currCourseChange', syncCourse);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourse = e.target.value;
    localStorage.setItem('currCourse', newCourse);
    window.dispatchEvent(new Event('currCourseChange'));
    setCourse(newCourse);
  };

  return { myCourseLabel, handleChange, course };
}
