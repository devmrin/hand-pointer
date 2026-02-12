// Track toggle state per tab
const tabStates = {};

chrome.action.onClicked.addListener(async (tab) => {
  const isActive = tabStates[tab.id] || false;
  const newState = !isActive;
  tabStates[tab.id] = newState;

  // Inject the content script if not already injected
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  } catch (e) {
    // Script may already be injected, that's fine
  }

  // Send toggle message to the content script
  chrome.tabs.sendMessage(tab.id, { action: "toggleCursor", active: newState });

  // Update the badge to show state
  chrome.action.setBadgeText({
    tabId: tab.id,
    text: newState ? "ON" : "",
  });
  chrome.action.setBadgeBackgroundColor({
    tabId: tab.id,
    color: "#4CAF50",
  });
});

// Clean up when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabStates[tabId];
});
