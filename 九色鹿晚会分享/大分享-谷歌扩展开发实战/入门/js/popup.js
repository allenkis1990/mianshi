const btn = document.getElementById('btn');
btn.addEventListener('click', async function() {
  // 获取当前活动标签
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.sidePanel.open({ tabId: tab.id });
  window.close();
});