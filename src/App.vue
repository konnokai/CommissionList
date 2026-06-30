<template>
  <div class="app">
    <HeroSection v-model:current-page="currentPage" :is-dark="isDark" @toggle-dark="toggleDark" />

    <AboutView v-if="currentPage === 'about'" />

    <CommissionFormatView v-else-if="currentPage === 'format'" />

    <div v-else class="layout">
      <FilterBar
        v-model="searchQuery"
        v-model:activeTags="activeTags"
        v-model:activeR18="activeR18"
        v-model:activeLanguages="activeLanguages"
        :all-tags="allTags"
        :all-languages="allLanguages"
      />

      <main class="main">
        <!-- Results info -->
        <div v-if="isFiltered" class="results-info">
          <span class="results-count">找到 <strong>{{ filteredArtists.length }}</strong> 位繪師</span>
          <button class="reset-btn" @click="resetFilters">清除篩選</button>
        </div>

        <!-- Artist grid -->
        <TransitionGroup
          v-if="filteredArtists.length > 0"
          name="cards"
          tag="div"
          class="grid"
        >
          <ArtistCard
            v-for="artist in pagedArtists"
            :key="artist.id"
            :artist="artist"
            :avatars="avatars"
          />
        </TransitionGroup>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            class="page-btn"
            :disabled="currentPageNum === 1"
            @click="goToPage(1)"
            aria-label="第一頁"
          ><i class="fa-solid fa-angles-left"></i></button>
          <button
            class="page-btn"
            :disabled="currentPageNum === 1"
            @click="goToPage(currentPageNum - 1)"
            aria-label="上一頁"
          ><i class="fa-solid fa-angle-left"></i></button>

          <template v-for="p in pageNumbers" :key="p">
            <span v-if="p === '...'" class="page-ellipsis">…</span>
            <button
              v-else
              class="page-btn"
              :class="{ active: p === currentPageNum }"
              @click="goToPage(p)"
            >{{ p }}</button>
          </template>

          <button
            class="page-btn"
            :disabled="currentPageNum === totalPages"
            @click="goToPage(currentPageNum + 1)"
            aria-label="下一頁"
          ><i class="fa-solid fa-angle-right"></i></button>
          <button
            class="page-btn"
            :disabled="currentPageNum === totalPages"
            @click="goToPage(totalPages)"
            aria-label="最後一頁"
          ><i class="fa-solid fa-angles-right"></i></button>
        </div>

        <!-- Empty state -->
        <div v-else-if="filteredArtists.length === 0" class="empty">
          <div class="empty-icon">🎨</div>
          <h3>找不到符合條件的繪師</h3>
          <p>試著調整搜尋關鍵字或篩選條件</p>
          <button class="reset-btn primary" @click="resetFilters">查看所有繪師</button>
        </div>
      </main>
    </div>

    <footer class="footer">
      <div class="footer-inner">
        <p class="footer-text">資料僅供參考，委託前請直接聯繫繪師確認最新狀態</p>
        <p class="footer-text">作品圖片版權皆屬原繪師所有，如為作品當事人並希望調整或移除，請至 <a href="https://github.com/konnokai/CommissionList/issues" target="_blank" rel="noopener noreferrer">GitHub Issues</a> 告知</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { artists } from './data/artists.js'
import HeroSection from './components/HeroSection.vue'
import FilterBar from './components/FilterBar.vue'
import ArtistCard from './components/ArtistCard.vue'
import AboutView from './views/AboutView.vue'
import CommissionFormatView from './views/CommissionFormatView.vue'

const currentPage = ref('home')

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = saved ? saved === 'dark' : prefersDark
  document.documentElement.classList.toggle('dark', isDark.value)
})

// 從 worker 取每日更新的頭像表，失敗就維持空表（ArtistCard 退回 artist.avatar）
const avatars = ref({})
onMounted(async () => {
  try {
    const res = await fetch('/api/avatars')
    if (res.ok) avatars.value = await res.json()
  } catch { /* ignore，用內建 avatar */ }
})

const searchQuery = ref('')
const activeTags = ref([])
const activeR18 = ref('all')
const activeLanguages = ref([])

const allTags = computed(() => {
  const set = new Set()
  artists.forEach(a => a.tags.forEach(t => set.add(t)))
  return [...set].sort()
})

const allLanguages = computed(() => {
  const set = new Set()
  artists.forEach(a => (a.languages || []).forEach(l => set.add(l)))
  return [...set].sort()
})

const isFiltered = computed(() =>
  searchQuery.value.trim() || activeTags.value.length > 0 || activeR18.value !== 'all' || activeLanguages.value.length > 0
)

const filteredArtists = computed(() => {
  let list = artists

  if (activeR18.value === 'sfw') {
    list = list.filter(a => !a.r18)
  } else if (activeR18.value === 'r18') {
    list = list.filter(a => a.r18)
  }

  if (activeTags.value.length > 0) {
    list = list.filter(a => activeTags.value.every(t => a.tags.includes(t)))
  }

  if (activeLanguages.value.length > 0) {
    list = list.filter(a => activeLanguages.value.some(l => (a.languages || []).includes(l)))
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.handle.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  return list
})

const PAGE_SIZE = 10
const currentPageNum = ref(1)

const totalPages = computed(() => Math.ceil(filteredArtists.value.length / PAGE_SIZE))

const pagedArtists = computed(() => {
  if (totalPages.value <= 1) return filteredArtists.value
  const start = (currentPageNum.value - 1) * PAGE_SIZE
  return filteredArtists.value.slice(start, start + PAGE_SIZE)
})

const pageNumbers = computed(() => {
  const total = totalPages.value
  const cur = currentPageNum.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = []
  pages.push(1)
  if (cur > 3) pages.push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i)
  if (cur < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

watch(filteredArtists, () => { currentPageNum.value = 1 })

function goToPage(page) {
  currentPageNum.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function resetFilters() {
  searchQuery.value = ''
  activeTags.value = []
  activeR18.value = 'all'
  activeLanguages.value = []
}
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

:root {
  --bg: #fff;
  --bg-subtle: #f7f7f5;
  --bg-hover: #f1f1ef;
  --bg-hover2: #e9e9e7;
  --border: #e9e9e7;
  --border-hover: #d3d1ce;
  --text-primary: #37352f;
  --text-secondary: #9b9a97;
  --text-tertiary: #c4c2bf;
  --text-muted: #787774;
  --text-desc: #6b6b6b;
  --tag-bg: #f1f1ef;
  --tag-lang-bg: #e8f4fd;
  --tag-lang-color: #2b6cb0;
  --tag-r18-bg: #ffe2dd;
  --tag-r18-color: #c4493a;
  --format-block-bg: #f7f6f3;
  --format-example-bg: #f0f7ff;
  --format-example-border: #c8dff7;
  --shadow-card: rgba(0, 0, 0, 0.08);
}

html.dark {
  --bg: #1a1a1a;
  --bg-subtle: #222;
  --bg-hover: #2a2a2a;
  --bg-hover2: #333;
  --border: #333;
  --border-hover: #4a4948;
  --text-primary: #e8e8e5;
  --text-secondary: #888;
  --text-tertiary: #555;
  --text-muted: #a0a09d;
  --text-desc: #999;
  --tag-bg: #2a2a2a;
  --tag-lang-bg: #1a2d3d;
  --tag-lang-color: #6ab0e8;
  --tag-r18-bg: #3d1515;
  --tag-r18-color: #f08080;
  --format-block-bg: #222;
  --format-example-bg: #162030;
  --format-example-border: #1e3a52;
  --shadow-card: rgba(0, 0, 0, 0.3);
}

body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: 'Inter', 'Noto Sans TC', ui-sans-serif, system-ui, sans-serif;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  transition: background 0.2s ease, color 0.2s ease;
}

#app {
  min-height: 100vh;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout {
  flex: 1;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 32px 24px 64px;
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.main {
  flex: 1;
  min-width: 0;
}

.results-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.results-count {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.results-count strong {
  color: var(--text-primary);
  font-weight: 600;
}

.reset-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.82rem;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-family: inherit;
}

.reset-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.reset-btn.primary {
  text-decoration: none;
  background: var(--bg-hover);
  color: var(--text-primary);
  padding: 8px 18px;
  font-size: 0.88rem;
  border-radius: 6px;
}

.reset-btn.primary:hover {
  background: var(--bg-hover2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.empty {
  text-align: center;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 4px;
}

.empty h3 {
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 600;
}

.empty p {
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.footer {
  border-top: 1px solid var(--border);
  padding: 20px 0;
  text-align: center;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-text {
  font-size: 0.82rem;
  color: var(--text-tertiary);
}

.footer-text a {
  color: var(--text-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.footer-text a:hover {
  color: var(--text-primary);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.page-btn {
  min-width: 34px;
  height: 34px;
  padding: 0 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text-primary);
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled):not(.active) {
  background: var(--bg-hover);
  border-color: var(--border-hover);
}

.page-btn.active {
  background: var(--text-primary);
  color: var(--bg);
  border-color: var(--text-primary);
  cursor: default;
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-ellipsis {
  padding: 0 4px;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 34px;
}

.cards-enter-active,
.cards-leave-active {
  transition: opacity 0.2s ease;
}

.cards-enter-from,
.cards-leave-to {
  opacity: 0;
}

.cards-move {
  transition: transform 0.2s ease;
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
    padding: 20px 16px 48px;
    gap: 20px;
  }
  .main { padding: 24px 0 48px; }
  .grid { grid-template-columns: 1fr; gap: 12px; }
}
</style>

