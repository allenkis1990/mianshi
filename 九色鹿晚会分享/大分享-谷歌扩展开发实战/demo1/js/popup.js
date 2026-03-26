/**
 * Created by Allen Liu on 2026/3/20.
 */

const btn = document.getElementById('btn');
let colors = ['red', 'blue', 'yellow', 'pink', 'green', 'orange'];
btn.addEventListener('click', async function () {
  // 除了发送给content_script以外的，都这样通讯
  // chrome.runtime.sendMessage({
  //   action: 'changeBg'
  // });
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  chrome.tabs.query({active: true, currentWindow: false}, function (tabs) {
    let baiduTabs = tabs.filter(tab => tab.url.includes('https://www.baidu.com'));
    console.log(baiduTabs, 'baiduTabs');
    if (baiduTabs.length) {
      baiduTabs.forEach((tab)=>{
        chrome.tabs.sendMessage(tab.id, {
          action: 'changeBg',
          data: randomColor
        });
      })
    } else {
      chrome.windows.create({
        url: "https://www.baidu.com",
        type: "normal",        // 可选: "normal", "popup", "panel"
        width: 1000,
        height: 800,
        left: 100,
        top: 100,
        focused: true
      })
    }
  });
});
