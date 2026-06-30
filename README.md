# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

Before deploy — create the KV namespace and paste the id:

```bash
npx wrangler login
npx wrangler kv namespace create AVATARS
# copy the printed id into wrangler.jsonc → kv_namespaces[0].id (replace REPLACE_WITH_KV_NAMESPACE_ID)
npm run deploy
# first run: trigger the cron once so KV isn't empty
npx wrangler kv key put --binding AVATARS avatars '{}'   # optional, /api/avatars returns {} until first cron anyway
```