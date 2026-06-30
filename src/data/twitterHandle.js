// 從繪師的 contacts 取出 Twitter/X 帳號（不含 @），找不到回傳 null
export function twitterHandle(artist) {
  const url = artist.contacts?.find((c) => c.type === 'twitter')?.url
  return url?.match(/(?:x|twitter)\.com\/([^/?#]+)/i)?.[1] ?? null
}
