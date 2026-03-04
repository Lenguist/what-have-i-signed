// Background service worker
// Handles auth token delivery from the web app

// When the web app sends us a token after login, store it
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type === "SET_AUTH_TOKEN" && message.token) {
    chrome.storage.local.set({ authToken: message.token }, () => {
      sendResponse({ ok: true });
    });
    return true;
  }
});

// On install: open the onboarding page
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: "http://localhost:3000/login?from=extension",
    });
  }
});
