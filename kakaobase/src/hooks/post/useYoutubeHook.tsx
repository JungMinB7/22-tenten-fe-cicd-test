import { showYoutube } from '@/apis/youtubeSummary';
import { useState } from 'react';

export function useYoutubeHook(id: number) {
  const [isOpen, setOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [summaryButton, setSummaryButton] = useState('요약 보기');
  const [loading, setLoading] = useState(false);

  async function showSummary() {
    if (!isOpen) {
      try {
        setLoading(true);

        const response = await showYoutube(id);
        setOpen((prev) => !prev);
        setSummaryButton('닫기');

        if (response?.data.data.summary === null) setSummary('요약 없음');
        else setSummary(response?.data.data.summary);

        console.log(response?.data.data.summary);
      } catch (e: any) {
        console.log(e);
        setSummaryButton('요약 보기');
      } finally {
        setLoading(false);
      }
    } else {
      setOpen((prev) => !prev);
      setSummaryButton('요약 보기');
    }
  }

  return {
    loading,
    isOpen,
    summary,
    summaryButton,
    showSummary,
  };
}
