# 網站成績單（原型）

慈濟大學各單位網站的行銷成效成績單。純靜態網站（HTML + CSS + JS），可直接用 GitHub Pages 發布。

> 目前 `data/sites.js` 裡是**示意數據**，僅供討論版面與用詞。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 頁面結構 |
| `style.css` | 樣式（含深色模式、手機版） |
| `app.js` | 讀取資料並畫出頁面 |
| `data/sites.js` | 成績單資料，一個網站一筆；之後由 BigQuery 產生 |

## 本機預覽

直接用瀏覽器打開 `index.html` 即可。

切換網站：`index.html?site=global-affairs`

## 發布到 GitHub Pages

1. 在 GitHub 建立新的 repository（Public）。
2. 上傳檔案（不需安裝 git）：repo 頁面 → **Add file → Upload files**，把這個資料夾裡的
   `index.html`、`style.css`、`app.js`、`README.md` 和整個 `data` 資料夾一起拖進去 → Commit changes。
   （有安裝 git 的話也可以用 `git push`。）
3. GitHub repo → Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main`、資料夾 `/ (root)`，儲存。
4. 約 1 分鐘後，網址為 `https://<帳號>.github.io/<repo名稱>/`。

## ⚠ 發布前注意

- **GitHub Pages 網站是公開的**（免費方案的 repo 也必須公開），任何人都看得到內容。
- 示意數據可以公開；**換成真實數據前，請先確認學校是否同意公開各單位網站的流量數字**。
- 若不能公開：改用 Looker Studio（限學校帳號檢視），或使用支援私有存取的託管方式。
