/**
 * Created by Allen Liu on 2026/3/20.
 */
chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("popup.html"),
    active: true
  });
});

