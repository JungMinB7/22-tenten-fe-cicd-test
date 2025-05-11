import { useEffect, useState } from 'react';

export default function formatDate(createdAt: string): string {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth < 340);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const date = new Date(createdAt);
  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const isAM = hours < 12;
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const period = isAM ? '오전' : '오후';

    return `${period} ${displayHour}:${minutes}`;
  } else {
    const year = String(date.getFullYear()).slice(2);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (isNarrow) return `${month}월 ${day}일`;
    else return `${year}년 ${month}월 ${day}일`;
  }
}
