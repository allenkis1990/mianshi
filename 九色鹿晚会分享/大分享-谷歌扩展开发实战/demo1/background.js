/**
 * Created by Allen Liu on 2026/3/20.
 */


function openProxy(){
  const config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: "http",   // 协议类型: http, https, socks4, socks5
        host: "127.0.0.1",  // 代理服务器地址
        port: 7890          // 代理服务器端口
      }
    }
  };

  chrome.proxy.settings.set({ value: config, scope: 'regular' }, async () => {
    console.log('代理已启用');
    await chrome.storage.local.set({proxyIsOpen: true})
    reloadTab()
  });
}


function closeProxy(){
  chrome.proxy.settings.clear({ scope: "regular" }, async() => {
    console.log("代理已关闭");
    await chrome.storage.local.set({proxyIsOpen: false})
    reloadTab()
  });
}

async function reloadTab(){
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if(tab && tab.id){
    await chrome.tabs.reload(tab.id);
  }
}



chrome.proxy.settings.get({}, async (config) => {
  console.log("当前代理设置:", config.value.mode);
  let mode = config.value.mode
  if(mode === 'direct'){
    console.log(`初始化代理状态：关`)
    await chrome.storage.local.set({proxyIsOpen: false})
  }else if(mode === 'fixed_servers'){
    console.log(`初始化代理状态：开`)
    await chrome.storage.local.set({proxyIsOpen: true})
  }else{

  }
});


chrome.runtime.onMessage.addListener((message) => {
  if (message.open) {
    openProxy()
  }else{
    closeProxy()
  }
});




