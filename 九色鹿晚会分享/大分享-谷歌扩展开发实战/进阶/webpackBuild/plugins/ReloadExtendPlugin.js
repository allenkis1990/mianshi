/**
 * Created by Allen Liu on 2025/7/8.
 */
const http = require('http');
let sockjs = require('sockjs')
class ReloadExtendPlugin {
    constructor(options = {}) {
        this.port = options.port;
        this.clients = new Set();
        this.wss = null;
    }

    apply(compiler) {
        // 在环境准备完成后启动 WebSocket 服务器
        compiler.hooks.afterEnvironment.tap('ReloadExtendPlugin', () => {
            this.startServer();
        });

        // 在编译完成时发送通知
        compiler.hooks.done.tap('ReloadExtendPlugin', (stats) => {
            this.broadcast({
                type: 'reloadExtend',
                data: {
                    success: !stats.hasErrors(),
                    time: stats.endTime - stats.startTime,
                    errors: stats.compilation.errors.length,
                    warnings: stats.compilation.warnings.length
                }
            });
        });

        // 在 Webpack 关闭时停止服务器
        compiler.hooks.shutdown.tap('ReloadExtendPlugin', () => {
            console.log('webpack关闭');
            this.stopServer();
        });


        /*compiler.hooks.compilation.tap('ReloadExtendPlugin', (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: 'ReloadExtendPlugin',
                    stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS
                },
                (assets) => {

                    // 遍历所有编译后的文件
                    for (const [filename] of Object.entries(assets)) {
                        if (filename.indexOf('background.js') > -1) {
                            const original = assets[filename].source();
                            let content = `
                            let SockJS = require('./libs/sockjs')
                            var sock = new SockJS("http://localhost:${buildConfig.socketPort}");
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
                            compilation.updateAsset(
                                filename,
                                new RawSource(`${content}\n${original}`)
                            );
                        }
                    }

                }
            );
        });*/

    }

    startServer() {
        if (this.wss) return;
        this.wss = sockjs.createServer();
        this.wss.on('connection', (ws) => {
            this.clients.add(ws);
            console.log('✅ 客户端已连接');

            // 发送初始消息
            ws.write(JSON.stringify({
                type: 'welcome',
                message: '已连接到 Webpack WebSocket 服务'
            }));

            ws.on('close', () => {
                this.clients.delete(ws);
                console.log('❌ 客户端断开连接');
            });
        });
        const server = http.createServer();
        this.wss.installHandlers(server);
        server.listen(this.port, '0.0.0.0');
    }

    stopServer() {
        if (!this.wss) return;

        // 关闭所有客户端连接
        this.clients.forEach(client => {
            if(client.readyState == 1){
                client.close(1000, '服务器关闭');
            }
        });

        this.clients.clear();
        this.wss = null;
        console.log('🛑 WebSocket 服务器已停止');
    }

    broadcast(message) {
        if (!this.wss || this.clients.size === 0) return;

        const jsonMessage = JSON.stringify(message);
        this.clients.forEach(client => {
            if(client.readyState == 1){
                client.write(jsonMessage);
            }
        });
    }
}

module.exports = ReloadExtendPlugin;