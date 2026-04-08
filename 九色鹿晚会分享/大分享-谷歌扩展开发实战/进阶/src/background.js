/**
 * Created by Allen Liu on 2026/3/20.
 */

//默认是打开弹窗，想要新tab打开需要去掉manifest.json里的 "default_popup": "popup.html"配置
chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("popup.html"),
    active: true
  });
});
