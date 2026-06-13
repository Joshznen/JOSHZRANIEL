export function assetUrl(url: string): string {
  if (!url.startsWith('/')) return url;

  return url
    .split('/')
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(decodeURIComponent(segment))))
    .join('/');
}
