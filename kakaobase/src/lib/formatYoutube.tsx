export function extractYoutubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get('v');
  } catch (e) {
    return null;
  }
}
