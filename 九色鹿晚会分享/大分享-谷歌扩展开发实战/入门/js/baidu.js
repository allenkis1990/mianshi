/**
 * Created by Allen Liu on 2026/3/11.
 */
// 监听来自后台的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'alertMsg') {
    alert('hello world')
  }
});