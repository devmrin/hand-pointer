// content.js — injected into the active tab
(function () {
  const STYLE_ID = "hand-pointer-cursor-style";
  const CURSOR_URL = chrome.runtime.getURL("images/hand-cursor.png");

  function enableCustomCursor() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      *, *::before, *::after {
        cursor: url('${CURSOR_URL}') 64 10, auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  function disableCustomCursor() {
    const style = document.getElementById(STYLE_ID);
    if (style) style.remove();
  }

  // Listen for toggle messages from background
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "toggleCursor") {
      if (message.active) {
        enableCustomCursor();
      } else {
        disableCustomCursor();
      }
    }
  });
})();
