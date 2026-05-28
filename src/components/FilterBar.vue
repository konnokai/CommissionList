<template>
  <aside class="sidebar">
    <!-- Search -->
    <div class="section">
      <div class="search-wrap">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          class="search-input"
          placeholder="搜尋繪師、標籤..."
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <button v-if="modelValue" class="clear-btn" @click="$emit('update:modelValue', '')">✕</button>
      </div>
    </div>

    <!-- R18 filter -->
    <div class="section">
      <div class="section-label">委託內容分級</div>
      <div class="filter-list">
        <button
          class="filter-btn"
          :class="{ active: activeR18 === 'all' }"
          @click="$emit('update:activeR18', 'all')"
        >
          <span class="dot" style="background: #9b9a97"></span>
          全部
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeR18 === 'sfw' }"
          @click="$emit('update:activeR18', 'sfw')"
        >
          <span class="dot" style="background: #0f7b6c"></span>
          不接 R18
        </button>
        <button
          class="filter-btn r18-btn"
          :class="{ active: activeR18 === 'r18' }"
          @click="$emit('update:activeR18', 'r18')"
        >
          <span class="dot" style="background: #c4493a"></span>
          可委託 R18
        </button>
      </div>
    </div>

    <!-- Language filter -->
    <div class="section" v-if="allLanguages.length">
      <div class="section-label">
        接單語系
        <button v-if="activeLanguages.length" class="clear-tags" @click="$emit('update:activeLanguages', [])">清除</button>
      </div>
      <div class="tag-list">
        <button
          v-for="lang in allLanguages"
          :key="lang"
          class="tag-btn lang-btn"
          :class="{ active: activeLanguages.includes(lang) }"
          @click="toggleLanguage(lang)"
        >
          {{ lang }}
        </button>
      </div>
    </div>

    <!-- Tag filter -->
    <div class="section">
      <div class="section-label">
        標籤
        <button v-if="activeTags.length" class="clear-tags" @click="$emit('update:activeTags', [])">清除</button>
      </div>
      <div class="tag-list">
        <button
          v-for="tag in allTags"
          :key="tag"
          class="tag-btn"
          :class="{ active: activeTags.includes(tag) }"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  allTags: { type: Array, default: () => [] },
  activeTags: { type: Array, default: () => [] },
  activeR18: { type: String, default: 'all' },
  allLanguages: { type: Array, default: () => [] },
  activeLanguages: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue', 'update:activeTags', 'update:activeR18', 'update:activeLanguages'])

function toggleTag(tag) {
  const current = [...props.activeTags]
  const idx = current.indexOf(tag)
  if (idx === -1) current.push(tag)
  else current.splice(idx, 1)
  emit('update:activeTags', current)
}

function toggleLanguage(lang) {
  const current = [...props.activeLanguages]
  const idx = current.indexOf(lang)
  if (idx === -1) current.push(lang)
  else current.splice(idx, 1)
  emit('update:activeLanguages', current)
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 4px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #9b9a97;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
}

.clear-tags {
  background: none;
  border: none;
  font-size: 0.72rem;
  color: #9b9a97;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-family: inherit;
  text-transform: none;
  letter-spacing: 0;
  padding: 0;
}

.clear-tags:hover {
  color: #37352f;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f7f7f5;
  border: 1px solid #e9e9e7;
  border-radius: 6px;
  padding: 0 10px;
  transition: border-color 0.15s, background 0.15s;
}

.search-wrap:focus-within {
  background: #fff;
  border-color: #c4c2bf;
}

.search-icon {
  font-size: 0.78rem;
  opacity: 0.4;
  flex-shrink: 0;
}

.search-input {
  background: none;
  border: none;
  outline: none;
  color: #37352f;
  font-size: 0.85rem;
  padding: 7px 0;
  flex: 1;
  min-width: 0;
  font-family: inherit;
}

.search-input::placeholder {
  color: #c4c2bf;
}

.clear-btn {
  background: none;
  border: none;
  color: #c4c2bf;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 2px 3px;
  line-height: 1;
  border-radius: 3px;
  transition: color 0.15s, background 0.15s;
  font-family: inherit;
}

.clear-btn:hover {
  color: #37352f;
  background: #e9e9e7;
}

.filter-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 5px;
  border: none;
  background: none;
  color: #6b6b6b;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  text-align: left;
  font-family: inherit;
}

.filter-btn:hover {
  background: #f1f1ef;
  color: #37352f;
}

.filter-btn.active {
  background: #f1f1ef;
  color: #37352f;
  font-weight: 500;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.tag-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.tag-btn {
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  background: none;
  color: #6b6b6b;
  font-size: 0.83rem;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
}

.tag-btn:hover {
  background: #f1f1ef;
  color: #37352f;
}

.tag-btn.active {
  background: #e8f3f1;
  color: #0f7b6c;
  font-weight: 500;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 0;
  }
  .section {
    min-width: 0;
  }
  .section:first-child {
    width: 100%;
  }
  .filter-list {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .tag-list {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
