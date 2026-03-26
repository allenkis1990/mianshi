/**
 * Created by Allen Liu on 2026/3/11.
 */

// fetch('https://www.163.com/')

// 监听来自后台的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'changeBg') {
    document.body.style.backgroundColor = message.data;
  }
});

