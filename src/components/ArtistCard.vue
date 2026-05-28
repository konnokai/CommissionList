<template>
  <article class="card">
    <!-- Status ribbon -->
    <div class="status-badge" :class="artist.commissionStatus">
      <span class="status-dot"></span>
      {{ statusConfig[artist.commissionStatus].label }}
    </div>

    <!-- Portfolio gallery -->
    <div class="gallery">
      <component
        v-for="(item, i) in artist.portfolio"
        :key="i"
        :is="item.url ? 'a' : 'div'"
        :href="item.url || undefined"
        :target="item.url ? '_blank' : undefined"
        :rel="item.url ? 'noopener noreferrer' : undefined"
        class="gallery-item"
        :class="{ featured: i === 0, 'has-link': !!item.url }"
      >
        <img :src="item.img" :alt="`${artist.name} 作品 ${i + 1}`" loading="lazy" />
        <div class="gallery-overlay">
          <i v-if="item.url" class="fa-solid fa-arrow-up-right-from-square gallery-link-icon"></i>
        </div>
      </component>
    </div>

    <!-- Card body -->
    <div class="card-body">
      <!-- Artist info -->
      <div class="artist-info">
        <img :src="artist.avatar" :alt="artist.name" class="avatar" loading="lazy" />
        <div class="artist-meta">
          <h2 class="artist-name">{{ artist.name }}</h2>
          <span class="artist-handle">{{ artist.handle }}</span>
        </div>
      </div>

      <p class="bio">{{ artist.bio }}</p>

      <!-- Languages -->
      <div v-if="artist.languages && artist.languages.length" class="tags languages">
        <span class="lang-prefix"><i class="fa-solid fa-language"></i></span>
        <span v-for="lang in artist.languages" :key="lang" class="tag tag-lang">{{ lang }}</span>
      </div>

      <!-- Tags -->
      <div class="tags">
        <span v-if="artist.r18" class="tag tag-r18">可委託 R18</span>
        <span v-for="tag in artist.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <!-- Details grid -->
      <div class="details">
        <div class="detail-item">
          <span class="detail-icon fa-solid fa-money-bill-wave"></span>
          <div>
            <div class="detail-label">價格範圍</div>
            <div class="detail-value">{{ artist.priceRange }}</div>
          </div>
        </div>
        <div class="detail-item">
          <span class="detail-icon fa-solid fa-clock"></span>
          <div>
            <div class="detail-label">交件時間</div>
            <div class="detail-value">{{ artist.turnaround }}</div>
          </div>
        </div>
      </div>

      <!-- Contact links -->
      <div class="contacts">
        <a
          v-for="contact in artist.contacts"
          :key="contact.type"
          :href="contact.url"
          class="contact-link"
          :class="`contact-${contact.type}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <template v-if="getIconInfo(contact.type).kind === 'fa'">
            <i class="contact-icon" :class="getIconInfo(contact.type).cls"></i>
          </template>
          <template v-else>
            <img
              class="contact-icon favicon-icon"
              :src="getIconInfo(contact.type).src"
              :alt="contact.type"
              width="14"
              height="14"
            />
          </template>
          {{ contact.label }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { statusConfig } from '../data/artists.js'

defineProps({
  artist: { type: Object, required: true },
})

function getIconInfo(type) {
  const faIcons = {
    twitter: 'fa-brands fa-x-twitter',
    pixiv: 'fa-brands fa-pixiv',
    instagram: 'fa-brands fa-instagram',
    artstation: 'fa-brands fa-artstation',
    patreon: 'fa-brands fa-patreon',
    youtube: 'fa-brands fa-youtube',
    email: 'fa-regular fa-envelope',
  }
  const faviconDomains = {
    skeb: 'skeb.jp',
    vgen: 'vgen.co',
    booth: 'booth.pm',
    kofi: 'ko-fi.com',
    gumroad: 'gumroad.com',
    clibo: 'clibo.tw'
  }

  if (faIcons[type]) return { kind: 'fa', cls: faIcons[type] }
  if (faviconDomains[type]) return {
    kind: 'img',
    src: `https://www.google.com/s2/favicons?domain=${faviconDomains[type]}&sz=32`,
  }
  return { kind: 'fa', cls: 'fa-solid fa-link' }
}
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #e9e9e7;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.15s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Status badge */
.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 500;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-badge.open {
  background: #ddedea;
  color: #0f7b6c;
}
.status-badge.open .status-dot { background: #0f7b6c; }

.status-badge.closed {
  background: #ffe2dd;
  color: #c4493a;
}
.status-badge.closed .status-dot { background: #c4493a; }

/* Gallery */
.gallery {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 120px 120px;
  gap: 3px;
  height: 243px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  display: block;
  text-decoration: none;
  color: inherit;
}

.gallery-item.has-link {
  cursor: pointer;
}

.gallery-item.featured {
  grid-row: 1 / 3;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .gallery-item img {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 6px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.gallery-item.has-link:hover .gallery-overlay {
  opacity: 1;
}

.gallery-link-icon {
  font-size: 0.75rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 4px;
  padding: 4px 5px;
  line-height: 1;
  width: auto;
  --fa-width: 1em;
}

/* Card body */
.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.artist-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.artist-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #37352f;
  margin: 0 0 2px;
  line-height: 1.3;
}

.artist-handle {
  font-size: 0.78rem;
  color: #9b9a97;
}

.bio {
  font-size: 0.85rem;
  color: #6b6b6b;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tags */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  padding: 2px 8px;
  background: #f1f1ef;
  border-radius: 3px;
  font-size: 0.74rem;
  color: #787774;
  white-space: nowrap;
}

.tag-r18 {
  background: #ffe2dd;
  color: #c4493a;
  font-weight: 600;
}

.languages {
  margin-top: -4px;
}

.lang-prefix {
  font-size: 0.82rem;
  color: #9b9a97;
  display: flex;
  align-items: center;
}

.tag-lang {
  background: #e8f4fd;
  color: #2b6cb0;
}

/* Details */
.details {
  display: flex;
  gap: 16px;
  padding-top: 4px;
  border-top: 1px solid #f1f1ef;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-icon {
  font-size: 0.85rem;
  line-height: 1;
  opacity: 0.6;
}

.detail-label {
  display: none;
}

.detail-value {
  font-size: 0.82rem;
  color: #6b6b6b;
}

/* Contacts */
.contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 4px;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 400;
  text-decoration: none;
  color: #787774;
  background: #f7f7f5;
  border: 1px solid #e9e9e7;
  transition: background 0.15s, color 0.15s;
}

.contact-link:hover {
  background: #f1f1ef;
  color: #37352f;
}

.contact-icon {
  font-size: 0.8rem;
  opacity: 0.7;
  width: 14px;
  text-align: center;
  flex-shrink: 0;
}

.favicon-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  border-radius: 2px;
  opacity: 0.75;
  vertical-align: middle;
}
</style>
