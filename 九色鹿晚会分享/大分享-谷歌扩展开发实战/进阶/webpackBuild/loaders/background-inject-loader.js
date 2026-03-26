/**
 * Created by Allen Liu on 2025/7/8.
 */
// var sock = new SockJS("http://localhost:${buildConfig.socketPort}");
const buildConfig = require('../config');
let injectedCode = `
                            let SockJS = require('@src/js/libs/sockjs')
                            var sock = new SockJS("http://127.0.0.1:${buildConfig.socketPort}");
                            sock.onmessage = function(event) {
                                const message = JSON.parse(event.data);
                                console.log(message,1818);
                                switch (message.type) {
                                    case 'reloadExtend':
                                        console.log('构建完成! 耗时: ' + message.data.time + 'ms');
                                        if (message.data.success) {
                                            chrome.runtime.reload()
                                            console.log('✅ 构建成功，刷新扩展');
                                        } else {
                                            console.error('❌ 构建失败，错误数: ' + message.data.errors);
                                        }
                                        break;
                                    default:
                                        console.log('收到消息:', message);
                                }
                            };
                        `

module.exports = function(source) {
    return `${injectedCode}\n${source}`;
};