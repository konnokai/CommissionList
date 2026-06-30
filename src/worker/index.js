import { artists } from '../data/artists.js'
import { twitterHandle } from '../data/twitterHandle.js'

const KV_KEY = 'avatars'

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/avatars') {
      const data = (await env.AVATARS.get(KV_KEY)) ?? '{}'
      return new Response(data, {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'public, max-age=3600',
        },
      })
    }
    return new Response('Not found', { status: 404 })
  },

  // 每天由 cron 觸發，從 FxEmbed 抓最新頭像寫進 KV
  async scheduled(event, env, ctx) {
    ctx.waitUntil(updateAvatars(env))
  },
}

async function updateAvatars(env) {
  const handles = [...new Set(artists.map(twitterHandle).filter(Boolean))]
  // 保留舊值：單一帳號抓失敗時不清掉原頭像，下次再試
  const avatars = JSON.parse((await env.AVATARS.get(KV_KEY)) ?? '{}')

  for (const handle of handles) {
    try {
      const res = await fetch(`https://api.fxtwitter.com/2/profile/${handle}`, {
        headers: { 'user-agent': 'CommissionList-AvatarBot/1.0' },
      })
      if (!res.ok) continue
      const avatar = (await res.json())?.user?.avatar_url
      if (avatar) avatars[handle.toLowerCase()] = avatar
    } catch {
      // ponytail: 略過這個帳號，保留舊頭像，下次 cron 重試
    }
  }

  await env.AVATARS.put(KV_KEY, JSON.stringify(avatars))
}
