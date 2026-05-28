<template>
  <div class="format-wrapper">
    <div class="format-container">

      <section class="format-section">
        <h2 class="section-title">委託格式範例</h2>
        <p class="section-text">以下提供一份建議的委託格式，方便委託人在聯繫繪師時能清楚表達需求，減少來回溝通的時間。</p>
        <p class="section-text">不同繪師可能有各自的委託表單或要求，請以繪師公告的說明為準。</p>
      </section>

      <section class="format-section">
        <h2 class="section-title">基本資訊</h2>
        <div class="format-block">
          <pre class="format-code">【委託人稱呼】 
【委託類型】立繪 / 半身圖 / 全身圖 / 頭像 / 插圖 / 其他
【用途】個人使用 / 商業用途 / 周邊製作
【預算】約 XXX TWD / USD（可接受範圍）
【截止日期】YYYY/MM/DD 前 / 無特定期限
【付款方式】匯款 / PayPal / 其他
【是否可公開繪製】是 / 否
【是否可公開分享】是 / 否
【是否需要延後發布】是 / 否 / 可發布時間
【收件方式】電子郵件 / 雲端硬碟 / 其他（通常以繪師方便為主）
【備註】(尺寸規格、DPI、需要的檔案格式、其他需求...)</pre>
        </div>
      </section>

      <section class="format-section">
        <h2 class="section-title">角色描述</h2>
        <div class="format-block">
          <pre class="format-code">【角色名稱】
【性別 / 體型】
【髮色 / 髮型】
【瞳色】
【服裝描述】請盡量詳細描述，或提供參考圖
【特徵說明】例：獸耳、翅膀、特殊標記等
【參考圖片】（URL 或附件）</pre>
        </div>
      </section>

      <section class="format-section">
        <h2 class="section-title">構圖需求</h2>
        <div class="format-block">
          <pre class="format-code">【姿勢 / 動作】例：站立、坐姿、戰鬥姿勢等
【表情】例：微笑、嚴肅、開心等
【背景】無背景 / 簡單背景 / 詳細背景（請描述）
【構圖參考】（URL 或附件，可選）
【其他需求】任何補充說明</pre>
        </div>
      </section>

      <section class="format-section">
        <h2 class="section-title">範例（完整填寫）</h2>
        <div class="format-block example">
          <pre class="format-code">【委託人稱呼】孤之界
【委託類型】半身圖
【用途】個人使用 / 周邊製作
【預算】3000–5000 TWD
【截止日期】無
【付款方式】銀行匯款
【是否可公開繪製】是
【是否可公開分享】是
【是否需要延後發布】否
【收件方式】電子郵件 contact[at]konnokai.me
【備註】尺寸 3000×4000px，DPI 300，需要 PNG（含透明背景）及 PSD 分層檔

【角色名稱】皎朧
【性別 / 體型】女性，嬌小纖細
【髮色 / 髮型】淡藍白色超長直髮，兩側各有一條細辮子，辮尾綁白色絨球，頭頂別有金色圓環髮飾
【瞳色】淡紫藍色，眼下有淡紅色腮紅妝感
【服裝描述】白色廣袖和風上衣（類白羽織），胸前以紅色繩結固定，肩部綴有紅白相間的絨球流蘇飾品；腰間繫紅色腰帶（細帶），下身為酒紅色短裙（類緋袴），穿白色過膝長筒襪，赤腳無鞋
【特徵說明】頭頂有白色龍角；背後有一條白色長尾，尾端為藍色，呈龍尾造型
【參考圖片】https://oc.konnokai.me

【姿勢 / 動作】雙手合十，身體微微前傾如迎賓狀
【表情】開心微笑，眼神充滿活力
【背景】無背景，或簡單的淺色漸層背景
【構圖參考】https://example.com/pose_ref.jpg
【其他需求】無</pre>
        </div>
      </section>

      <section class="format-section">
        <h2 class="section-title">注意事項</h2>
        <ul class="guide-list">
          <li>
            <span class="guide-icon"><i class="fas fa-check-circle"></i></span>
            <div>委託前請先閱讀繪師的委託規定，確認是否開放接單及可接受的內容類型。</div>
          </li>
          <li>
            <span class="guide-icon"><i class="fas fa-check-circle"></i></span>
            <div>商業用途委託價格通常與個人用途不同。</div>
          </li>
          <li>
            <span class="guide-icon"><i class="fas fa-check-circle"></i></span>
            <div>提供越詳細的描述與參考圖，越能幫助繪師理解你的需求。</div>
          </li>
          <li>
            <span class="guide-icon"><i class="fas fa-exclamation-circle"></i></span>
            <div>付款方式、修改次數等條件請依繪師規定，避免糾紛。</div>
          </li>
        </ul>
      </section>

      <section class="format-section">
        <h2 class="section-title">其他委託可用範本 & 注意事項</h2>
        <a href="https://docs.google.com/document/d/1xGRW41OulL7kN-h4rbjX3OdsS6WZZ_WV/view" target="_blank" class="section-text">設計合約書</a>
        <a href="https://x.com/zzTajuhn/status/1918967530896687524" target="_blank" class="section-text">繪製曲繪給 PV 師前，可以注意的地方</a>
      </section>
    </div>
  </div>
</template>

<style scoped>
.format-wrapper {
  flex: 1;
  padding: 40px 24px 80px;
}

.format-container {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.format-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.section-text {
  font-size: 0.95rem;
  color: var(--text-desc);
  line-height: 1.7;
  margin: 0;
}

.format-block {
  background: var(--format-block-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 20px;
}

.format-block.example {
  background: var(--format-example-bg);
  border-color: var(--format-example-border);
}

.format-code {
  font-family: 'Noto Sans TC', 'Courier New', monospace;
  font-size: 0.88rem;
  color: var(--text-primary);
  line-height: 1.9;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
}

.guide-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.guide-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.93rem;
  color: var(--text-desc);
  line-height: 1.6;
}

.guide-icon {
  color: #6c9bd1;
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 2px;
}

@media (max-width: 480px) {
  .format-wrapper {
    padding: 24px 16px 60px;
  }
  .format-code {
    font-size: 0.8rem;
  }
}
</style>
