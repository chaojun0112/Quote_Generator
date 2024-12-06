// 註冊 Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/static/sw.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}