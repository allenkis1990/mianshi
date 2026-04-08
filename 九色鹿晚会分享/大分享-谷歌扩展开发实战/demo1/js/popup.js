/**
 * Created by Allen Liu on 2026/3/20.
 */

let proxyIsOpen = false

chrome.storage.local.get(["proxyIsOpen"], (result) => {
  proxyIsOpen = result.proxyIsOpen
  let main = document.getElementById('main')
  main.style.display = 'block';
  let status = document.getElementById('status')
  status.querySelector('span').innerText = result.proxyIsOpen ? '开启' : '关闭'

  let btn = document.getElementById('btn')
  btn.innerText = result.proxyIsOpen ? '关闭代理' : '打开代理'
});


const btn = document.getElementById('btn');
btn.addEventListener('click', async function() {
  if(proxyIsOpen){
    chrome.runtime.sendMessage({
      open: false
    });
  }else{
    chrome.runtime.sendMessage({
      open: true
    });
  }
  window.close();
});
