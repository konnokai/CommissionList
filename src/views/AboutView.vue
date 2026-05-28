<template>
  <div class="about-wrapper">
    <div class="about-container">
      <section class="about-section">
        <h2 class="section-title">關於本站</h2>
        <p class="section-text">本站整理了一些目前有在接受委託的繪師資訊，方便有委託需求的人快速找到合適的繪師。</p>
        <p class="section-text">資料由孤之界蒐集與維護，若有錯誤或需要更新，歡迎透過下方聯絡方式回報。</p>
      </section>

      <section class="about-section">
        <h2 class="section-title">使用說明</h2>
        <ul class="guide-list">
          <li>
            <span class="guide-icon"><i class="fas fa-search"></i></span>
            <div>
              <strong>搜尋</strong>：可依繪師名稱、帳號或標籤關鍵字搜尋。
            </div>
          </li>
          <li>
            <span class="guide-icon"><i class="fas fa-filter"></i></span>
            <div>
              <strong>篩選</strong>：可依委託狀態（開放／暫停）或風格標籤篩選。
            </div>
          </li>
          <li>
            <span class="guide-icon"><i class="fas fa-exclamation-circle"></i></span>
            <div>
              <strong>注意</strong>：資料僅供參考，委託前請直接聯繫繪師確認最新狀態與價格。
            </div>
          </li>
        </ul>
      </section>

      <section class="about-section">
        <h2 class="section-title">聯絡方式</h2>
        <p class="section-text">
          若有資料錯誤、想新增繪師或其他建議，歡迎透過以下方式聯絡：
        </p>
        <div class="contact-links">
          <a
            href="https://github.com/konnokai/CommissionList/issues"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-btn"
          >
            <i class="fab fa-github"></i>
            GitHub Issues
          </a>
        </div>
      </section>

      <section class="about-section">
        <h2 class="section-title">免責聲明</h2>
        <p class="section-text">本站所有資訊皆來自公開資料，不代表任何商業立場。</p>
        <p class="section-text">繪師的委託狀態、價格與條件可能隨時變動，一切以繪師本人公告為準。</p>
      </section>
      
      <section class="about-section">
        <h2 class="section-title">Credits</h2>
        <p class="section-text">
          <a href="https://www.flaticon.com/free-icons/list" title="list icons">List icons created by Kiranshastry - Flaticon</a>
        </p>
      </section>
      
      <section class="about-section">
        <h2 class="section-title">抖內</h2>
        <p class="section-text">
          若喜歡本站的整理，歡迎透過以下方式支持：
        </p>
        <div class="contact-links">
          <a
            href="https://paypal.me/jun112561"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-btn"
          >
            <img src="https://paypal.com/favicon.ico" alt="綠界" style="width:1em;height:1em;object-fit:contain;" />
            PayPal
          </a>
        </div>
        
        <div class="contact-links">
          <a
            href="https://p.ecpay.com.tw/B8CCC"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-btn"
          >
            <img src="https://www.ecpay.com.tw/favicon.ico" alt="綠界" style="width:1em;height:1em;object-fit:contain;" />
            綠界
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-wrapper {
  flex: 1;
  padding: 40px 24px 80px;
}

.about-container {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.about-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.section-text {
  font-size: 0.92rem;
  color: var(--text-desc);
  line-height: 1.8;
}

.guide-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.guide-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.92rem;
  color: var(--text-desc);
  line-height: 1.7;
}

.guide-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--bg-hover);
  border-radius: 6px;
  flex-shrink: 0;
  font-size: 0.8rem;
  color: var(--text-primary);
  margin-top: 2px;
}

.contact-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration: none;
  background: var(--bg-hover);
  color: var(--text-primary);
  transition: background 0.15s, color 0.15s;
}

.contact-btn:hover {
  background: var(--bg-hover2);
}

@media (max-width: 480px) {
  .about-wrapper {
    padding: 28px 16px 60px;
  }
}
</style>
