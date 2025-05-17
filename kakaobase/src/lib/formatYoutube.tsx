export function extractYoutubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.pathname.startsWith('/shorts/')) {
      return parsedUrl.pathname.split('/')[2];
    } else if (parsedUrl.hostname.includes('youtube.com')) {
      return parsedUrl.searchParams.get('v');
    } else {
      return parsedUrl.pathname.split('/')[1];
    }
  } catch (e) {
    return null;
  }
}
