// 成績單資料。目前為「示意數據」，之後由 BigQuery 每日產生覆蓋這個檔案。
// 結構：一個網站一筆，key 為 site_id。
window.SCORECARD = {
  isDemo: true,
  updated: '2026-10-31',
  period: '2026 年 10 月（10/1–10/31）・與 9 月比較',
  sites: {
    'global-affairs': {
      name: '全球處網站',
      score: {
        total: 72, delta: 6, status: 'warn', statusLabel: '注意',
        summary: '表現中上。訪客持續成長，主要扣分在 Google 搜尋點擊率偏低。',
        parts: [
          { name: '觸及', score: 22, max: 25, status: 'good' },
          { name: '搜尋能見度', score: 13, max: 25, status: 'warn' },
          { name: '申請行動', score: 15, max: 20, status: 'good' },
          { name: '內容健康', score: 10, max: 15, status: 'warn' },
          { name: '技術品質', score: 12, max: 15, status: 'good' }
        ]
      },
      kpis: [
        {
          question: '有多少校外的人來看？',
          value: '4,820', unit: '位訪客',
          delta: '▲ 比 9 月 +18%', trend: 'up',
          compare: '全校中位數 1,950 位・全校第 6 名',
          verdict: '改版後連續 3 個月成長，是全校成長最快的網站之一。',
          source: '資料：mart_site_daily（users，校外）'
        },
        {
          question: '有多少人從 Google 搜尋點進來？',
          value: '2,140', unit: '次點擊',
          delta: '▲ 比 9 月 +9%', trend: 'up',
          compare: '點擊率 2.1%・全校中位數 3.4%',
          verdict: '被看見的次數變多，但看到後點進來的人偏少，見待辦第 1 件。',
          source: '資料：mart_gsc_page_daily（clicks、impressions）'
        },
        {
          question: '有多少人完成申請相關行動？',
          value: '186', unit: '次',
          delta: '▼ 比 9 月 −6%', trend: 'down',
          compare: '線上申請 92・簡章下載 61・聯絡我們 33',
          verdict: '訪客變多，申請點擊卻減少，「線上申請」按鈕值得檢查，見待辦第 3 件。',
          source: '資料：ls_ga4_click_task_v1（task_category）'
        },
        {
          question: '網站有沒有出錯的地方？',
          value: '3', unit: '個問題頁面',
          delta: '▲ 比 9 月多 1 個', trend: 'down',
          compare: '找不到頁面 2・標題寫錯單位 1',
          verdict: '有訪客點到失效連結，修好就能直接加分，見待辦第 2 件。',
          source: '資料：mart_ga4_page_daily（page_title 比對）'
        }
      ],
      todos: [
        {
          title: '改寫「國際學生入學」頁的 Google 標題與摘要',
          tag: '影響最大', tagStatus: 'bad',
          found: '這頁上個月在 Google 搜尋出現 3,200 次，只有 0.9% 的人點進來（全校中位數 3.4%）。',
          why: '這是外籍學生最常搜尋到的頁面。點擊率拉到中位數，每月可多約 80 位潛在申請者進站。',
          how: '頁面標題寫明「慈濟大學 國際學生入學申請」，摘要第一句寫出申請期限與學程，送出後約 2–4 週見效。',
          rule: 'GSC 曝光 ≥ 1,000 且點擊率 < 全校中位數的一半'
        },
        {
          title: '修正 2 個失效連結',
          tag: '容易處理', tagStatus: 'good',
          found: '「交換計畫」與「獎學金」頁上的連結指向已刪除的頁面，本月有 64 次瀏覽停在「找不到頁面」。',
          why: '點到錯誤頁的訪客多半直接離開，也會降低 Google 對網站的評價。',
          how: '把連結改到新網址，或在舊網址設定轉址。完成後下個月這一項會歸零。',
          rule: 'page_title 含「找不到」或「404」的瀏覽，回推來源頁面'
        },
        {
          title: '檢查「線上申請」按鈕',
          tag: '需確認', tagStatus: 'warn',
          found: '訪客增加 18%，點「線上申請」的次數卻少了 12%，集中在手機版。',
          why: '這是最接近「真的要申請」的行動，下滑可能代表按鈕在手機上不好找，或申請期限已過。',
          how: '用手機打開申請頁確認按鈕位置；若是申請已截止，改成顯示「下一梯次開放日期」。',
          rule: '申請類點擊與訪客數變化方向相反，且差距 > 15 個百分點'
        }
      ],
      trend: {
        launchIndex: 4,
        note: '深色長條為改版上線後。改版日期為示意，實際日期待確認。',
        weeks: [
          ['8/11', 780], ['8/18', 810], ['8/25', 795], ['9/1', 860],
          ['9/8', 1020], ['9/15', 1080], ['9/22', 1150], ['9/29', 1110],
          ['10/6', 1190], ['10/13', 1240], ['10/20', 1180], ['10/27', 1260]
        ]
      }
    }
  }
};
