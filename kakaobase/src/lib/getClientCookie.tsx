export function getClientCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift()!;
  return null;
}

export function getAccessToken(): string | undefined {
  const match = document.cookie.match(/accessToken=([^;]+)/);
  return match?.[1];
}
