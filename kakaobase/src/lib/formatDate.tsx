export default function formatDate(createdAt: string): string {
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

    return `${year}년 ${month}월 ${day}일`;
  }
}
