// 防閃爍：在頁面渲染前立即套用已儲存的主題設定
// 此檔案必須以同步方式載入（不加 defer / async）
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }
})();
