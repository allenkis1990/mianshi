<template>
  <div class="main-box">
    <div class="mainFrame">
      <div class="main-text">点击即可为百度页面更换皮肤</div>
      <div class="btn btn-orange" @click="changeBg">换一换</div>
    </div>
  </div>
</template>
<script setup>

let colors = ['red', 'blue', 'yellow', 'pink', 'green', 'orange'];
function changeBg() {
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
}
</script>
<style lang="scss" scoped>
.main-box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .mainFrame{
    border-radius: 10px;
    width: 600px;
    background: #fff;
    padding: 45px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .main-text{
      font-size: 30px;
      text-align: center;
      margin-bottom: 30px;
    }
  }
  .btn{
    width: 100%;
    height: 50px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#ffffff;
    font-size: 18px;
    cursor: pointer;
  }
  .btn-orange{
    background: #FF7F00;
  }
}
</style>
