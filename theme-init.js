// 防閃爍：在頁面渲染前立即套用已儲存的主題設定
// 此檔案必須以同步方式載入（不加 defer / async）
(function () {
  var s = localStorage.getItem("ct");
  if (s === "light" || s === "dark") {
    document.documentElement.setAttribute("data-mode", s);
  } else {
    var isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-mode", isDark ? "dark" : "light");
  }
})();
