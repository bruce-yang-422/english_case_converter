/* ─── Theme ─── */
const THEME_KEY = "theme";
const htmlEl    = document.documentElement;
const themeBtns = document.querySelectorAll(".theme-btn");

function applyTheme(val) {
  // val: "system" | "light" | "dark"
  if (val === "system") {
    htmlEl.removeAttribute("data-theme");
    localStorage.removeItem(THEME_KEY);
  } else {
    htmlEl.setAttribute("data-theme", val);
    localStorage.setItem(THEME_KEY, val);
  }
  themeBtns.forEach(btn => {
    const active = btn.dataset.themeVal === val;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active);
  });
}

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  return (saved === "light" || saved === "dark") ? saved : "system";
}

themeBtns.forEach(btn => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.themeVal));
});

applyTheme(getInitialTheme());

/* ─── App ─── */
const textInput          = document.getElementById("textInput");
const charCount          = document.getElementById("charCount");
const nonWhitespaceCount = document.getElementById("nonWhitespaceCount");
const wordCount          = document.getElementById("wordCount");
const lineCount          = document.getElementById("lineCount");
const halfWidthCount     = document.getElementById("halfWidthCount");
const fullWidthCount     = document.getElementById("fullWidthCount");
const weightedCount      = document.getElementById("weightedCount");
const limitInput         = document.getElementById("limitInput");
const limitDisplay       = document.getElementById("limitDisplay");
const limitStatus        = document.getElementById("limitStatus");
const statusText         = document.getElementById("statusText");
const statusIcon         = document.getElementById("statusIcon");
const clearBtn           = document.getElementById("clearBtn");
const copyBtn            = document.getElementById("copyBtn");
const toolbar            = document.querySelector(".toolbar");

function isFullWidthChar(char) {
  const cp = char.codePointAt(0);
  return (
    (cp >= 0x1100 && cp <= 0x115f) || (cp >= 0x2329 && cp <= 0x232a) ||
    (cp >= 0x2e80 && cp <= 0xa4cf) || (cp >= 0xac00 && cp <= 0xd7a3) ||
    (cp >= 0xf900 && cp <= 0xfaff) || (cp >= 0xfe10 && cp <= 0xfe19) ||
    (cp >= 0xfe30 && cp <= 0xfe6f) || (cp >= 0xff01 && cp <= 0xff60) ||
    (cp >= 0xffe0 && cp <= 0xffe6)
  );
}

function updateStats() {
  const text  = textInput.value;
  const chars = Array.from(text);
  const words = text.match(/[A-Za-z0-9]+/g) || [];
  const lines = text === "" ? 1 : text.split(/\r\n|\r|\n/).length;

  let fullWidth = 0, halfWidth = 0, weighted = 0;
  chars.forEach(c => {
    if (isFullWidthChar(c)) { fullWidth++; weighted += 2; }
    else                    { halfWidth++; weighted += 1; }
  });

  charCount.textContent          = chars.length;
  nonWhitespaceCount.textContent = chars.filter(c => !/\s/.test(c)).length;
  wordCount.textContent          = words.length;
  lineCount.textContent          = lines;
  halfWidthCount.textContent     = halfWidth;
  fullWidthCount.textContent     = fullWidth;
  weightedCount.textContent      = weighted;

  const wEl        = document.querySelector(".weighted-row .stat-value");
  const limitValue = Number(limitInput.value);
  const hasLimit   = limitInput.value !== "" && Number.isFinite(limitValue) && limitValue >= 0;
  const isOver     = hasLimit && weighted > limitValue;

  wEl.classList.toggle("is-over", isOver);
  limitDisplay.classList.toggle("is-over", isOver);

  if (!hasLimit) {
    limitDisplay.textContent = "—";
    limitStatus.textContent  = "未設定上限";
  } else if (isOver) {
    limitDisplay.textContent = `+${weighted - limitValue}`;
    limitStatus.textContent  = `超過 ${weighted - limitValue} 個加權字元`;
  } else {
    limitDisplay.textContent = `${limitValue - weighted}`;
    limitStatus.textContent  = `剩餘 ${limitValue - weighted} 個加權字元`;
  }
}

const statusMap = {
  ready: { icon: "🟢", text: "就緒" },
  edit:  { icon: "✏️",  text: "編輯中" },
  upper: { icon: "▲",  text: "已轉為大寫" },
  lower: { icon: "▼",  text: "已轉為小寫" },
  title: { icon: "Aa", text: "已轉為首字母大寫" },
  name:  { icon: "✦",  text: "已轉為名稱格式" },
  snake: { icon: "_",  text: "已轉為 snake_case" },
  clear: { icon: "✕",  text: "內容已清除" },
  copy:  { icon: "✓",  text: "已複製到剪貼簿" },
  limit: { icon: "🔢", text: "已更新上限" },
};

function setStatus(key) {
  const s = statusMap[key] || { icon: "·", text: key };
  statusIcon.textContent = s.icon;
  statusText.textContent = s.text;
}

function toTitleCase(t) { return t.toLowerCase().replace(/\b([a-z])/g, m => m.toUpperCase()); }

function toSnakeCase(t) {
  return t
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
    .toLowerCase();
}

function toNameCase(t) {
  return t.toLowerCase()
    .replace(/(^|[\s._-]+)([a-z])/g, (m, pre, l) => pre + l.toUpperCase());
}

function applyTransform(type) {
  const map = {
    upper: () => textInput.value.toUpperCase(),
    lower: () => textInput.value.toLowerCase(),
    title: () => toTitleCase(textInput.value),
    name:  () => toNameCase(textInput.value),
    snake: () => toSnakeCase(textInput.value),
  };
  if (map[type]) {
    textInput.value = map[type]();
    setStatus(type);
    updateStats();
    textInput.focus();
  }
}

toolbar.addEventListener("click", e => {
  const btn = e.target.closest("button[data-action]");
  if (btn) applyTransform(btn.dataset.action);
});

clearBtn.addEventListener("click", () => {
  textInput.value = "";
  updateStats();
  setStatus("clear");
  textInput.focus();
});

copyBtn.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(textInput.value); }
  catch { textInput.select(); document.execCommand("copy"); }
  setStatus("copy");
});

textInput.addEventListener("input", () => { updateStats(); setStatus("edit"); });
limitInput.addEventListener("input", () => { updateStats(); setStatus("limit"); });

updateStats();
