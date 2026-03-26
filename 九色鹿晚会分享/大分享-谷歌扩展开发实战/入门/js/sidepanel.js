const btn = document.getElementById('btn');
btn.addEventListener('click', async function() {
  // chrome.runtime.sendMessage({
  //   action: 'changeBg'
  // });
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    if (tabs.length > 0) {
      //发送给content_script的页面要具体到某个tab
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'alertMsg'
      });
    }
  });
});
