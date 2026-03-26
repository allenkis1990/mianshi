/**
 * Created by Allen Liu on 2026/3/20.
 */

// 定义菜单配置
chrome.contextMenus.create({
  id: "searchSelection",
  title: "九色鹿翻译插件",
  contexts: ["selection"]
}, () => {
  if (chrome.runtime.lastError) {
    console.error(`❌ 创建菜单失败:`, chrome.runtime.lastError.message);
  } else {
    console.log(`✅ 菜单创建成功`);
  }
});

// 监听菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log('📝 菜单被点击:', info.menuItemId);

  switch(info.menuItemId) {
    case "searchSelection":
      const query = encodeURIComponent(info.selectionText);
      console.log(`🔍 搜索：${query}`);
      chrome.tabs.create({
        url: `https://fanyi.baidu.com/mtpe-individual/transText?ext_channel=Aldtype01&from=auto&to=zh&query=${query}#/`
      });
      break;

      // case "copyLink":
      //   navigator.clipboard.writeText(info.linkUrl);
      //   console.log('✅ 链接已复制');
      //   break;
  }
});
