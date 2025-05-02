import { useEffect, useState } from 'react';

export const useAuthTimer = (onExpire?: () => void) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onExpire]);

  //타이머 시작
  const start = () => {
    setTimeLeft(180); //3분
    setIsRunning(true);
  };

  //타이머 중지
  const stop = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  //시간 180초 -> 0:00 형식으로 변경
  const formatted = `${Math.floor(timeLeft / 60)}:${String(
    timeLeft % 60
  ).padStart(2, '0')}`;

  return { timeLeft, isRunning, formatted, start, stop };
};
