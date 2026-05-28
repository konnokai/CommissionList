<template>
  <div class="app">
    <HeroSection v-model:current-page="currentPage" />

    <AboutView v-if="currentPage === 'about'" />

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
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { artists } from './data/artists.js'
import HeroSection from './components/HeroSection.vue'
import FilterBar from './components/FilterBar.vue'
import ArtistCard from './components/ArtistCard.vue'
import AboutView from './views/AboutView.vue'

const currentPage = ref('home')

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
      a.tags.some(t => t.toLowerCase().includes(q)) ||
      a.bio.toLowerCase().includes(q)
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

body {
  background: #fff;
  color: #37352f;
  font-family: 'Inter', 'Noto Sans TC', ui-sans-serif, system-ui, sans-serif;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
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
  color: #9b9a97;
}

.results-count strong {
  color: #37352f;
  font-weight: 600;
}

.reset-btn {
  background: none;
  border: none;
  color: #9b9a97;
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
  color: #37352f;
  background: #f1f1ef;
}

.reset-btn.primary {
  text-decoration: none;
  background: #f1f1ef;
  color: #37352f;
  padding: 8px 18px;
  font-size: 0.88rem;
  border-radius: 6px;
}

.reset-btn.primary:hover {
  background: #e9e9e7;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
  color: #37352f;
  font-weight: 600;
}

.empty p {
  font-size: 0.88rem;
  color: #9b9a97;
  margin-bottom: 8px;
}

.footer {
  border-top: 1px solid #e9e9e7;
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
  color: #c4c2bf;
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
  border: 1px solid #e9e9e7;
  border-radius: 6px;
  background: #fff;
  color: #37352f;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled):not(.active) {
  background: #f1f1ef;
  border-color: #d3d1ce;
}

.page-btn.active {
  background: #37352f;
  color: #fff;
  border-color: #37352f;
  cursor: default;
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-ellipsis {
  padding: 0 4px;
  color: #9b9a97;
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
  .grid { grid-template-columns: 1fr; gap: 12px; }
}

.results-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.results-count {
  font-size: 0.85rem;
  color: #9b9a97;
}

.results-count strong {
  color: #37352f;
  font-weight: 600;
}

.reset-btn {
  background: none;
  border: none;
  color: #9b9a97;
  font-size: 0.82rem;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.reset-btn:hover {
  color: #37352f;
  background: #f1f1ef;
}

.reset-btn.primary {
  text-decoration: none;
  background: #f1f1ef;
  color: #37352f;
  padding: 8px 18px;
  font-size: 0.88rem;
  border-radius: 6px;
}

.reset-btn.primary:hover {
  background: #e9e9e7;
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
  color: #37352f;
  font-weight: 600;
}

.empty p {
  font-size: 0.88rem;
  color: #9b9a97;
  margin-bottom: 8px;
}

.footer {
  border-top: 1px solid #e9e9e7;
  padding: 20px 0;
  text-align: center;
}

.footer-text {
  font-size: 0.82rem;
  color: #c4c2bf;
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
  .main { padding: 24px 0 48px; }
  .grid { grid-template-columns: 1fr; gap: 12px; }
  .container { padding: 0 16px; }
}
</style>

