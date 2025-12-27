let focusEndTime = null;

const blockedSites = [
  "netflix.com",
  "primevideo.com",
  "hotstar.com",
  "disneyplus.com",
  "hulu.com",
  "instagram.com",
  "facebook.com",
  "twitter.com",
  "x.com",
  "reddit.com",
  "9gag.com",
  "netmirror.com"
];


chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "START_FOCUS") {
    focusEndTime = Date.now() + msg.seconds * 1000;
    chrome.storage.local.set({ focusEndTime });
  }
});

// Restore focus after browser restart

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("focusEndTime", (data) => {
    focusEndTime = data.focusEndTime || null;
  });
});

// Check focus state

function isFocusActive() {
  return focusEndTime && Date.now() < focusEndTime;
}

// Block distracting sites

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url || !isFocusActive()) return;

  if (blockedSites.some(site => tab.url.includes(site))) {
    chrome.tabs.update(tabId, {
      url: chrome.runtime.getURL("html/block.html")
    });
  }
});
