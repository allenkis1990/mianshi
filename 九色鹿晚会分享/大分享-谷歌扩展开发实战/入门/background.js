/**
 * Created by Allen Liu on 2026/3/20.
 */
//默认是每次都要打开popup设置了以下配置后，只要打开过一次侧边栏以后都会绕过popup直接打开侧边栏
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

