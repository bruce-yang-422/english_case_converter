# 英文命名與大小寫轉換工具

[![Live Demo](https://img.shields.io/badge/Live%20Demo-tool--a01.stack--base.com-00d2aa?logo=cloudflare&logoColor=white)](https://tool-a01.stack-base.com/)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/bruce-yang-422/english_case_converter)](https://github.com/bruce-yang-422/english_case_converter/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/bruce-yang-422/english_case_converter)](https://github.com/bruce-yang-422/english_case_converter)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

瀏覽器直用的英文文字轉換工具，整合命名格式轉換、字元統計與上限判定，適合開發者處理變數命名、欄位整理或有長度限制的英文欄位，無需安裝即可使用。

## 功能

### 格式轉換

- 全大寫 / 全小寫
- 首字母大寫（Title Case）
- 名稱格式（保留分隔符號：`hello_world` → `Hello_World`）
- snake_case

### 字元統計

- 總字元、非空白字元、英文單字數、行數
- 半形 / 全形字元個別計算
- 加權字元數（全形 × 2）並支援自訂上限即時判定

### 編輯器

- 可自訂檔名，一鍵下載為 `.txt`
- 清除與複製內容

### 介面設計

- 系統 / 淺色 / 深色主題切換，防閃爍初始化
- 工具說明可收合，狀態透過 `localStorage` 記憶
- macOS 風格 UI 設計

## 技術

純 HTML / CSS / JavaScript，無框架、無建置流程、無後端依賴。

## 本機執行

```bash
git clone https://github.com/bruce-yang-422/english_case_converter.git
open index.html
```

## 授權

MIT
