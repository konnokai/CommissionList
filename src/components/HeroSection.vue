<template>
  <header class="hero">
    <div class="hero-content">
      <div class="hero-top">
        <div>
          <h1 class="hero-title">委託繪師清單</h1>
          <p class="hero-desc">
            整理了一些目前有在接稿的繪師。目前有 <strong>{{ openCount }}</strong> 位開放委託中。
          </p>
        </div>
      </div>
      <nav class="hero-nav">
        <button
          class="nav-btn"
          :class="{ active: currentPage === 'home' }"
          @click="$emit('update:currentPage', 'home')"
        >
          <i class="fas fa-list"></i>
          繪師清單
        </button>
        <button
          class="nav-btn"
          :class="{ active: currentPage === 'about' }"
          @click="$emit('update:currentPage', 'about')"
        >
          <i class="fas fa-info-circle"></i>
          關於本站
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
defineProps({
  openCount: { type: Number, default: 0 },
  currentPage: { type: String, default: 'home' },
})
defineEmits(['update:currentPage'])
</script>

<style scoped>
.hero {
  border-bottom: 1px solid #e9e9e7;
  padding: 48px 24px 0;
}

.hero-content {
  max-width: 1100px;
  margin: 0 auto;
}

.hero-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #37352f;
  line-height: 1.3;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.hero-desc {
  font-size: 0.95rem;
  color: #9b9a97;
  line-height: 1.6;
}

.hero-desc strong {
  color: #37352f;
  font-weight: 600;
}

.hero-top {
  padding-bottom: 24px;
}

.hero-nav {
  display: flex;
  gap: 4px;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 500;
  color: #9b9a97;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  border-radius: 0;
  margin-bottom: -1px;
}

.nav-btn:hover {
  color: #37352f;
}

.nav-btn.active {
  color: #37352f;
  border-bottom-color: #37352f;
}

@media (max-width: 480px) {
  .hero {
    padding: 32px 16px 0;
  }
  .hero-top {
    padding-bottom: 20px;
  }
  .hero-title {
    font-size: 1.4rem;
  }
}
</style>
