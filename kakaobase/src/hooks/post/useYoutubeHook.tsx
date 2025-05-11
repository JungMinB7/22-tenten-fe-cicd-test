import { useState } from 'react';

export function useYoutubeHook() {
  const [isOpen, setOpen] = useState(false);
  const summary =
    '크리처보다는 도비죠. 아하하하하하하(아무튼 실성도비) 내용을 두 줄보다 길게 작성해 볼까나~~';
  const [summaryButton, setSummaryButton] = useState('요약 보기');

  function showSummary() {
    setOpen((prev) => !prev);
    if (isOpen) {
      setSummaryButton('요약 보기');
    } else {
      setSummaryButton('닫기');
    }
  }

  return {
    isOpen,
    summary,
    summaryButton,
    showSummary,
  };
}
