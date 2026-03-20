/* ─── Theme ─── */
const html      = document.documentElement;
const themeBtns = document.querySelectorAll(".theme-btn");

function applyTheme(val) {
  if (val === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.setAttribute("data-mode", isDark ? "dark" : "light");
    localStorage.removeItem("ct");
  } else {
    html.setAttribute("data-mode", val);
    localStorage.setItem("ct", val);
  }
  themeBtns.forEach(btn => {
    const active = btn.dataset.themeVal === val;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active);
  });
}

function getInitialTheme() {
  const s = localStorage.getItem("ct");
  return (s === "light" || s === "dark") ? s : "system";
}

themeBtns.forEach(btn => btn.addEventListener("click", () => applyTheme(btn.dataset.themeVal)));
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
const statusHint         = document.querySelector(".status-hint");
const statusIcon         = document.getElementById("statusIcon");
const clearBtn           = document.getElementById("clearBtn");
const copyBtn            = document.getElementById("copyBtn");
const toolbar            = document.getElementById("toolbar");
const fileNameInput      = document.getElementById("fileNameInput");
const downloadBtn        = document.getElementById("downloadBtn");
const seoSection         = document.querySelector(".seo-section");
const seoBody            = document.getElementById("seoBody");
const seoToggle          = document.getElementById("seoToggle");
const seoHint            = document.getElementById("seoHint");


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

function flash(el) {
  el.classList.remove("flash");
  void el.offsetWidth;
  el.classList.add("flash");
}

function updateStats() {
  const text  = textInput.value;
  const chars = Array.from(text);
  const words = text.match(/[A-Za-z0-9]+/g) || [];
  const lines = text === "" ? 1 : text.split(/\r\n|\r|\n/).length;

  let fw = 0, hw = 0, wt = 0;
  chars.forEach(c => {
    if (isFullWidthChar(c)) { fw++; wt += 2; } else { hw++; wt += 1; }
  });

  const set = (el, val) => {
    const s = String(val);
    if (el.textContent !== s) { el.textContent = s; flash(el); }
  };

  set(charCount,          chars.length);
  set(nonWhitespaceCount, chars.filter(c => !/\s/.test(c)).length);
  set(wordCount,          words.length);
  set(lineCount,          lines);
  set(halfWidthCount,     hw);
  set(fullWidthCount,     fw);
  set(weightedCount,      wt);

  const limitValue = Number(limitInput.value);
  const hasLimit   = limitInput.value !== "" && Number.isFinite(limitValue) && limitValue >= 0;
  const isOver     = hasLimit && wt > limitValue;

  weightedCount.classList.toggle("over", isOver);
  limitDisplay.classList.toggle("over",  isOver);

  if (!hasLimit) {
    limitDisplay.textContent = "—";
    limitStatus.textContent  = "未設定上限";
  } else if (isOver) {
    limitDisplay.textContent = `+${wt - limitValue}`;
    limitStatus.textContent  = `超出 ${wt - limitValue} 個加權字元`;
  } else {
    limitDisplay.textContent = `${limitValue - wt}`;
    limitStatus.textContent  = `剩餘 ${limitValue - wt} 個加權字元`;
  }
}

const statusMap = {
  ready: { icon: "🟢", text: "就緒",       hint: "等待輸入..." },
  edit:  { icon: "✏️",  text: "編輯中",     hint: "正在輸入..." },
  upper: { icon: "▲",  text: "已轉為大寫", hint: "UPPERCASE applied" },
  lower: { icon: "▼",  text: "已轉為小寫", hint: "lowercase applied" },
  title: { icon: "Aa", text: "首字母大寫", hint: "Title Case applied" },
  name:  { icon: "✦",  text: "名稱格式",   hint: "Name Case applied" },
  snake: { icon: "_",  text: "snake_case", hint: "snake_case applied" },
  clear: { icon: "✕",  text: "已清除",     hint: "內容已清空" },
  copy:  { icon: "✓",  text: "已複製",     hint: "複製到剪貼簿" },
  limit: { icon: "🔢", text: "已設上限",   hint: "即時判定中..." },
};

function setStatus(key) {
  const s = statusMap[key] || { icon: "·", text: key, hint: "" };
  statusIcon.textContent = s.icon;
  statusText.textContent = s.text;
  if (statusHint) statusHint.textContent = s.hint;
}

function toTitleCase(t) { return t.toLowerCase().replace(/\b([a-z])/g, m => m.toUpperCase()); }
function toSnakeCase(t) {
  return t
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "").replace(/_+/g, "_").toLowerCase();
}
function toNameCase(t) {
  return t.toLowerCase().replace(/(^|[\s._-]+)([a-z])/g, (_, p, l) => p + l.toUpperCase());
}

function applyTransform(type) {
  const map = {
    upper: () => textInput.value.toUpperCase(),
    lower: () => textInput.value.toLowerCase(),
    title: () => toTitleCase(textInput.value),
    name:  () => toNameCase(textInput.value),
    snake: () => toSnakeCase(textInput.value),
  };
  if (map[type]) { textInput.value = map[type](); setStatus(type); updateStats(); textInput.focus(); }
}

toolbar.addEventListener("click", e => {
  const btn = e.target.closest("button[data-action]");
  if (btn) applyTransform(btn.dataset.action);
});

clearBtn.addEventListener("click", () => {
  textInput.value = ""; updateStats(); setStatus("clear"); textInput.focus();
});

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(textInput.value);
  setStatus("copy");
});

textInput.addEventListener("input", () => { updateStats(); setStatus("edit"); });
limitInput.addEventListener("input", () => { updateStats(); setStatus("limit"); });

/* ─── Download ─── */
downloadBtn.addEventListener("click", () => {
  const name = (fileNameInput.value.trim() || "untitled") + ".txt";
  const blob = new Blob([textInput.value], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
  setStatus("copy");
});

/* ─── SEO Toggle（首次展開，之後記憶狀態） ─── */
const SEO_KEY = "seo-open";

function setSeoOpen(open) {
  seoSection.classList.toggle("collapsed", !open);
  seoToggle.setAttribute("aria-expanded", open);
  seoHint.textContent = open ? "點擊收合" : "點擊展開";
  localStorage.setItem(SEO_KEY, open ? "1" : "0");
}

setSeoOpen(localStorage.getItem(SEO_KEY) !== "0");

seoToggle.addEventListener("click", () => {
  setSeoOpen(seoSection.classList.contains("collapsed"));
});

updateStats();
