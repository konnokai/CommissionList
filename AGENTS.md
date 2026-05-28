# AGENTS.md

> **重要：** 每次新增、修改或刪除任何功能、元件、資料結構或頁面時，**必須同步更新本文件**，確保架構描述與實際程式碼保持一致。

---

## 專案概覽

**CommissionList** 是一個以 Vue 3 + Vite 建構的靜態前端應用，用於整理與展示目前開放委託的繪師資訊，支援搜尋、篩選、分頁切換等功能。

- **框架**：Vue 3（Composition API + `<script setup>`）
- **建構工具**：Vite
- **樣式**：Scoped CSS（無外部 CSS 框架）
- **圖示**：Font Awesome Free（`@fortawesome/fontawesome-free`）
- **無路由函式庫**：頁面切換以 `currentPage` ref 狀態實作

---

## 目錄結構

```
CommissionList/
├── index.html               # 應用入口 HTML
├── vite.config.js           # Vite 設定
├── package.json
├── public/                  # 靜態資源（直接複製至 dist）
└── src/
    ├── main.js              # 應用程式進入點，掛載 Vue App
    ├── App.vue              # 根元件，負責頁面狀態管理與佈局
    ├── assets/              # 全域靜態資源（圖片、全域 CSS 等）
    ├── components/          # 共用 UI 元件
    │   ├── HeroSection.vue  # 頁首 Hero 區塊 + 頁面導覽列
    │   ├── FilterBar.vue    # 左側篩選列（搜尋、狀態、分級、標籤）
    │   └── ArtistCard.vue   # 繪師卡片（作品集、資訊、聯絡連結）
    └── views/               # 頁面級元件
        ├── AboutView.vue    # 關於本站頁面
        └── CommissionFormatView.vue  # 委託格式範例頁面
    └── data/
        └── artists.js       # 繪師靜態資料陣列
```

---

## 元件說明

### `App.vue`
根元件，管理全域狀態並決定渲染哪個頁面。

| 狀態 / computed | 類型 | 說明 |
|---|---|---|
| `currentPage` | `ref<string>` | 目前所在頁面（`'home'` \| `'about'`） |
| `isDark` | `ref<boolean>` | 是否啟用深色主題（從 `localStorage` 或 `prefers-color-scheme` 初始化） |
| `searchQuery` | `ref<string>` | 搜尋關鍵字 |
| `activeTags` | `ref<string[]>` | 已選取的標籤陣列 |
| `activeR18` | `ref<string>` | R18 分級篩選（`'all'` \| `'sfw'` \| `'r18'`） |
| `activeLanguages` | `ref<string[]>` | 已選取的語系陣列 |
| `currentPageNum` | `ref<number>` | 目前分頁頁碼（預設 `1`，篩選條件變動時自動重置） |
| `allTags` | `computed` | 從所有繪師資料中彙整出的不重複標籤清單 |
| `allLanguages` | `computed` | 從所有繪師資料中彙整出的不重複接單語系清單 |
| `isFiltered` | `computed` | 是否有任何篩選條件啟用中 |
| `filteredArtists` | `computed` | 依所有篩選條件過濾後的繪師清單 |
| `totalPages` | `computed` | 總頁數（每頁 10 筆，超過 10 筆才啟用分頁） |
| `pagedArtists` | `computed` | 目前分頁對應的繪師清單切片 |
| `pageNumbers` | `computed` | 分頁按鈕顯示陣列（含省略號 `'...'`） |

**頁面切換邏輯：**
- `currentPage === 'about'` → 渲染 `<AboutView />`
- 其他 → 渲染繪師清單佈局（`FilterBar` + 卡片 Grid）

**深色主題：**
- `toggleDark()` 切換 `isDark`，並在 `<html>` 加上 / 移除 `.dark` class
- 偏好儲存於 `localStorage`（key: `theme`），初次載入時讀取系統 `prefers-color-scheme`
- 所有元件顏色以 CSS 自訂屬性（CSS Variables）實作，定義於 `App.vue` 全域 `<style>` 的 `:root` 與 `html.dark`

---

### `HeroSection.vue`
頁首區塊，顯示標題、開放委託數量，以及頁面導覽按鈕。

| Props | 類型 | 說明 |
|---|---|---|
| `openCount` | `Number` | 開放委託繪師數（由 `App.vue` 傳入） |
| `currentPage` | `String` | 目前頁面，用於 active 樣式判斷 |
| `isDark` | `Boolean` | 是否深色主題，用於切換按鈕圖示 |

| Emits | 說明 |
|---|---|
| `update:currentPage` | 切換頁面時觸發，配合 `v-model:current-page` 使用 |
| `toggle-dark` | 點擊主題切換按鈕時觸發 |

---

### `FilterBar.vue`
左側篩選列，以 `v-model` 系列 props 與父元件雙向綁定。

| Props（v-model） | 說明 |
|---|---|
| `modelValue` | 搜尋關鍵字 |
| `activeTags` | 已選標籤陣列 |
| `activeR18` | R18 分級篩選值 |
| `allLanguages` | 所有可用語系陣列 |
| `activeLanguages` | 已選語系陣列 |
| `statuses` | 狀態選項陣列（`{ key, label, color }`） |
| `allTags` | 所有可用標籤陣列 |

---

### `ArtistCard.vue`
單一繪師卡片元件，展示作品集圖片、個人資訊、標籤、價格、交件時間與聯絡連結。

| Props | 類型 | 說明 |
|---|---|---|
| `artist` | `Object` | 單一繪師資料物件（結構見下方） |

---

### `AboutView.vue`（views）
關於本站靜態頁面，包含以下段落：
- 關於本站
- 使用說明
- 聯絡方式
- 免責聲明

---

### `CommissionFormatView.vue`（views）
委託格式範例靜態頁面，包含以下段落：
- 委託格式範例（說明）
- 基本資訊
- 角色描述
- 構圖需求
- 範例（完整填寫）
- 注意事項

---

## 資料結構

### `src/data/artists.js`

```js
{
  name: String,             // 繪師顯示名稱
  handle: String,           // 社群帳號（如 @name）
  avatar: String,           // 頭像圖片 URL
  tags: String[],           // 風格 / 類型標籤陣列
  languages: String[],      // 接單語系陣列（如 ['中文', '日文', '英文']）
  r18: Boolean,             // 是否接受 R18 委託
  portfolio: [               // 作品集陣列
    {
      img: String,          // 圖片 URL
      url: String,          // 來源頁面 URL（空字串表示無連結）
    }
  ],
  contacts: [               // 聯絡方式陣列
    {
      type: String,         // 平台識別（'twitter' | 'pixiv' | 'instagram' | 'email' | ...）
      label: String,        // 顯示文字
      url: String,          // 連結 URL
      icon: String,         // 圖示識別
    }
  ]
}
```

---

## 頁面清單

| 頁面 key | 元件 | 說明 |
|---|---|---|
| `home` | `App.vue`（主佈局） | 繪師清單，含篩選列與卡片 Grid |
| `about` | `AboutView.vue` | 關於本站 |
| `format` | `CommissionFormatView.vue` | 委託格式範例 |

---

## 開發指令

```bash
npm run dev      # 啟動開發伺服器
npm run build    # 建構正式版本
npm run preview  # 預覽建構結果
```

---

## AGENTS.md 維護規範

每次對專案進行以下操作時，**必須同步更新本文件**：

- **新增元件**：在「元件說明」加入對應的 Props / Emits 說明表
- **新增頁面**：在「頁面清單」加入新頁面，並在「目錄結構」補充對應檔案路徑
- **修改資料結構**：更新「資料結構」段落中的欄位定義
- **新增或移除篩選條件**：更新 `FilterBar.vue` 及 `App.vue` 的說明表
- **新增路由或導覽項目**：更新 `HeroSection.vue` 說明及「頁面清單」
- **新增依賴套件**：更新「專案概覽」中的技術說明
- **修改目錄結構**：更新「目錄結構」區塊
