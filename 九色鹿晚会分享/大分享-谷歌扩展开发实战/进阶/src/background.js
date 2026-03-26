/**
 * Created by Allen Liu on 2026/3/20.
 */
chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("popup.html"),
    active: true
  });
});
/*
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [1],
  addRules: [
    {
      "id": 1,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "responseHeaders": [
          {
            "header": "haha",
            "operation": "set",
            "value": "1111"
          },
          {
            "header": "Access-Control-Allow-Origin",
            "operation": "set",
            "value": "https://pre-jsl-ae.thedeer.cn"
          },
          {
            "header": "Access-Control-Allow-Methods",
            "operation": "set",
            "value": "GET, POST, PUT, DELETE, OPTIONS, PATCH"
          },
          {
            "header": "Access-Control-Allow-Headers",
            "operation": "set",
            "value": "Content-Type, Authorization, X-Requested-With, Accept"
          },
          {
            "header": "Access-Control-Allow-Credentials",
            "operation": "set",
            "value": "true"
          },
          // 当你访问同一个 URL 时，浏览器会尝试使用缓存
          // 但缓存的响应可能不包含完整的 CORS 头
          // 或者缓存的是重定向前的响应（没有 CORS 头）
          // 所以要禁止缓存
          {
            "header": "Cache-Control",
            "operation": "set",
            "value": "no-store, no-cache, must-revalidate, proxy-revalidate"
          },
          {
            "header": "Pragma",
            "operation": "set",
            "value": "no-cache"
          },
          {
            "header": "Expires",
            "operation": "set",
            "value": "0"
          }
        ]
      },
      "condition": {
        "urlFilter": "https://www.163.com/!*",
        "resourceTypes": ["xmlhttprequest"]
      }
    }
  ]
});*/
