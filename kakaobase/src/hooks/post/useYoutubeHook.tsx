import { showYoutube } from '@/apis/youtubeSummary';
import { useEffect, useState } from 'react';

export function useYoutubeHook(id: number) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  async function showSummary() {
    try {
      setLoading(true);
      const response = await showYoutube(id);

      if (response?.data.data.summary === null) setSummary('요약 없음');
      else setSummary(response?.data.data.summary);
    } catch (e: any) {
      const err = e.response.data.error;
      const msg = e.response.data.message;
      if (
        err === 'youtube_subtitle_not_found' ||
        err === 'video_not_found' ||
        err === 'unsupported_subtitle_language' ||
        err === 'video_private' ||
        err === 'video_not_found'
      ) {
        setSummary(msg);
      } else {
        setSummary(
          '유튜브 요약에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    showSummary();
  }, []);

  return {
    loading,
    summary,
    showSummary,
  };
}
