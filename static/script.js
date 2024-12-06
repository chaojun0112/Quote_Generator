document.addEventListener("DOMContentLoaded", () => {
  // 註冊 Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker Registered'))
      .catch(err => console.error('Service Worker Registration Failed', err));
  }

  // 名言生成功能
  const generateQuoteButton = document.getElementById("generateQuote");
  const quoteDisplay = document.getElementById("quote");

  generateQuoteButton.addEventListener("click", () => {
    fetch("/api/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.text && data.author) {
          // 使用中文引號「」
          quoteDisplay.innerHTML = `「${data.text}」 —— ${data.author}`;
        } else {
          quoteDisplay.innerHTML = "未能獲取名言，請稍後再試。";
        }
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
        quoteDisplay.innerHTML = "發生錯誤，請檢查後端是否運行正常。";
      });
  });

  // 主題切換功能
  const themeSelect = document.getElementById("theme");
  const savedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    document.body.classList.remove("theme-green", "theme-brown", "theme-dark");
    if (theme !== "default") {
      document.body.classList.add(`theme-${theme}`);
    }
    localStorage.setItem("theme", theme);
  }

  if (savedTheme) {
    applyTheme(savedTheme);
    themeSelect.value = savedTheme;
  }

  themeSelect.addEventListener("change", (e) => {
    applyTheme(e.target.value);
  });
});
