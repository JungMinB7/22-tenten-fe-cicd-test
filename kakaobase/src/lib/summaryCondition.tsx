export default function summaryCondition({ summary }: { summary: string }) {
  if (summary === 'AI_SERVER_FAILED' || summary === 'INTERNAL_SERVER_ERROR') {
    return '서버에 문제가 생겨 요약이 생성되지 않았습니다.';
  } else if (summary === 'INVALID_FORMAT') {
    return '유튜브 링크 형식이 올바르지 않아 요약이 생성되지 않았습니다.';
  } else if (summary === 'YOUTUBE_SUBTITLE_NOT_FOUND') {
    return '자막이 존재하지 않아 요약이 생성되지 않았습니다.';
  } else if (summary === 'VIDEO_PRIVATE') {
    return '비공개 동영상은 요약을 제공하지 않습니다.';
  } else if (summary === 'UNSUPPORTED_SUBTITLE_LANGUAGE') {
    return '영어, 한글 자막이 없는 영상은 요약을 제공하지 않습니다.';
  } else if (summary === 'INVALID_YOUTUBE_URL') {
    return '영상이 존재하지 않습니다.';
  } else if (summary === null || summary === '') {
    return '해당 영상의 요약이 없습니다.';
  } else {
    return summary;
  }
}
