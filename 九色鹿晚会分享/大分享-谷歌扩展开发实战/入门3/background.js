//tab更新的时候设置侧边栏显示隐藏
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // 仅在URL变化且标签页加载完成时处理
    if (changeInfo.url || (changeInfo.status === 'loading' && tab.url)) {
        const isBaidu = tab.url.includes('baidu.com');
        // const isBaidu = true;
        // 设置侧边栏可见性
        chrome.sidePanel.setOptions({
            tabId,
            path: isBaidu ? 'sidepanel.html' : '', // 非亚马逊域名时设为空路径
            enabled: isBaidu
        });
    }
});
// 初始化设置侧边栏显示隐藏
chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
        const isBaidu = tab.url && tab.url.includes('baidu.com');
        // const isBaidu = true;
        chrome.sidePanel.setOptions({
            tabId: tab.id,
            path: isBaidu ? 'sidepanel.html' : '',
            enabled: isBaidu
        });
    });
});


//默认是每次都要打开popup设置了以下配置后，只要打开过一次侧边栏以后都会绕过popup直接打开侧边栏
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

// chrome.action.onClicked.addListener(async (tab) => {
//     try {
//         await chrome.sidePanel.open({
//             tabId: tab.id
//         });
//     } catch (error) {
//         console.error("打开侧边栏失败：", error);
//         alert(`打开失败：${error.message}\n请升级Chrome到114+版本`);
//     }
// });


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'changeBg') {
//         console.log(123);
//     }
// });



