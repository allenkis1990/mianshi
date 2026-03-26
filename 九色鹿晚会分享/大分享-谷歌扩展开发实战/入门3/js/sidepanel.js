const btn = document.getElementById('btn');
let colors = ['red', 'blue', 'yellow','pink','green','orange'];
btn.addEventListener('click', async function() {
  // 除了发送给content_script以外的，都这样通讯
  // chrome.runtime.sendMessage({
  //   action: 'changeBg'
  // });
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    if (tabs.length > 0) {
      //发送给content_script的页面要具体到某个tab
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'changeBg',
        data: randomColor
      });
    }
  });
});
