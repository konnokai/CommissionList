# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture reference

`AGENTS.md` is the canonical, detailed architecture doc (in Chinese): component Props/Emits tables, the `artists.js` data structure, page list, and global state in `App.vue`. Read it before making structural changes — and **keep it in sync** when you add/modify/remove components, pages, data fields, or filters (its header mandates this).

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # production build → dist/
npm run preview  # build, then serve via `wrangler dev` (Cloudflare Workers runtime, not `vite preview`)
npm run deploy   # build, then `wrangler deploy` to Cloudflare Workers
```

No test or lint setup exists.

## Key facts not obvious from the file tree

- **Single-page app, no router library.** Page switching is a `currentPage` ref in `App.vue` (`'home'` | `'about'` | `'format'`), not vue-router. Add pages by extending that switch + the nav in `HeroSection.vue`.
- **Static data.** All artist data is a hardcoded array in `src/data/artists.js` — there is no backend or API. Content edits happen there.
- **Theming via CSS variables.** Light/dark colors are defined once in `App.vue`'s global `<style>` (`:root` and `html.dark`); `toggleDark()` adds/removes `.dark` on `<html>` and persists to `localStorage` key `theme`. Use these CSS vars in component styles rather than hardcoding colors.
- **Deploy target is Cloudflare Workers** (`wrangler.jsonc`), configured for SPA fallback (`not_found_handling: single-page-application`). The Vite build uses `@cloudflare/vite-plugin`.
- Components use Vue 3 `<script setup>` with scoped CSS; no CSS framework.
