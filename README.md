# 英文命名與大小寫轉換工具

[![GitHub Repo](https://img.shields.io/badge/GitHub-bruce--yang--422%2Fenglish__case__converter-181717?logo=github)](https://github.com/bruce-yang-422/english_case_converter)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-0f766e?logo=githubpages)](https://bruce-yang-422.github.io/english_case_converter/)
[![Static Site](https://img.shields.io/badge/Static%20Site-HTML%2FCSS%2FJS-2563eb)](https://bruce-yang-422.github.io/english_case_converter/)
[![Theme](https://img.shields.io/badge/Theme-Light%20%2F%20Dark%20%2F%20System-7c3aed)](https://bruce-yang-422.github.io/english_case_converter/)

一個可直接在瀏覽器使用的英文文字工具，整合大小寫轉換、英文命名格式轉換、字元統計與上限判定，適合用在程式命名、人名整理、欄位命名與一般英文文字調整。

## 線上使用

- 線上工具：<https://bruce-yang-422.github.io/english_case_converter/>
- GitHub 倉庫：<https://github.com/bruce-yang-422/english_case_converter>

## 主要功能

### 文字格式轉換

- 轉大寫
- 轉小寫
- 首字母大寫
- 名稱格式轉換
- 轉為 `snake_case`

### 統計與限制判定

- 顯示總字元、非空白、英文單字、行數
- 統計全形與半形字元
- 計算加權字元數
- 可設定自訂字元上限
- 超過上限時提供即時提示

### 介面體驗

- 支援跟隨系統、淺色、深色主題
- 純前端靜態頁面
- 不需安裝即可直接使用

## 適合用途

- 英文變數命名整理
- 欄位命名與資料清洗
- 人名或專有名詞格式整理
- 檢查字元限制與全形半形差異

## 專案結構

```text
.
├─ index.html
├─ style.css
├─ app.js
├─ theme-init.js
├─ README.md
└─ .gitignore
```

- `index.html`：主頁面
- `style.css`：介面樣式
- `app.js`：互動邏輯、格式轉換、字元統計
- `theme-init.js`：頁面初始主題設定，避免閃爍

## 使用方式

### 本機開啟

直接用瀏覽器開啟 `index.html` 即可使用。

### GitHub Pages

若已啟用 GitHub Pages，專案首頁網址為：

<https://bruce-yang-422.github.io/english_case_converter/>

## 技術說明

- 純 HTML / CSS / JavaScript
- 無建置流程
- 無後端依賴
- 所有功能皆在瀏覽器本機執行

## 備註

- 目前 `README.md` 已加入 GitHub 與 GitHub Pages badge。
- 若要顯示 `MIT License` badge，建議先補上正式 `LICENSE` 檔案後再加入。
