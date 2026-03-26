const btn = document.getElementById('btn');
let intervalId = null
let timerId = null
btn.addEventListener('click', async function() {
  // 获取当前活动标签
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.url.includes('baidu.com')) {
    try {
      await chrome.tabs.update(tab.id, { url: 'https://www.baidu.com' });
      await getTargetTabLoaded()
      await chrome.sidePanel.open({ tabId: tab.id });
      window.close();
    }catch(e){
      alert(e)
    }
  }else{
    await chrome.sidePanel.open({ tabId: tab.id });
    window.close();
  }
});

//轮询获取当前TAB是否已经打开目标页面
function getTargetTabLoaded(){
  return new Promise(async(resolve, reject) => {
    intervalId = setInterval(async()=>{
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if(tab.url.includes('baidu.com')){
        clearIntervalById()
        clearTimerById()
        resolve()
      }
    },300)

    //5秒超时
    timerId = setTimeout(()=>{
      clearIntervalById()
      clearTimerById()
      reject(new Error('页面加载超时'))
    },5000)
  })
}

function clearTimerById(){
  if(timerId){
    clearTimeout(timerId)
    timerId = null
  }
}
function clearIntervalById(){
  if(intervalId){
    clearInterval(intervalId)
    intervalId = null
  }
}