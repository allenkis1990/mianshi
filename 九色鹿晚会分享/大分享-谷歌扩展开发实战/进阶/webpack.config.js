// webpack.config.js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const ReloadExtendPlugin = require('./webpackBuild/plugins/ReloadExtendPlugin');
const buildConfig = require('./webpackBuild/config');
const isWatchMode = process.argv.includes('--watch');
const env = process.env.NODE_ENV || 'dev';


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
//css抽取
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//css压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

const zipFileName =  `插件.zip`
const isProd = process.env.NODE_ENV === 'prod';
function getNoRuntimeEntry(obj){
    let result = {}
    Object.keys(obj).forEach((key)=>{
        let val = obj[key]
        result[key] = {
            import: val,
            runtime: false
        }
    })
    return result
}
module.exports = {
    target: 'web',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'inline-source-map',
    resolve: {
        alias:{
            '@src':path.resolve(__dirname,'./src'),
            '@build':path.resolve(__dirname,'./webpackBuild')
        }
    },
    //全局script引入后在这里定义一下，即使引用了也会走全局的
    externals: {
        chrome: 'chrome',
        '@src/js/libs/jsencrypt.min': 'JSEncrypt'
    },
    // 入口点，对应扩展程序的不同部分
    entry: {
        'js/entrys/popup': path.resolve(__dirname, 'src/js/entrys/popup.js'),
        //这里需要去除runtime代码是因为content_scripts的代码是原生的，不需要经过VUE处理没有隔离作用域等功能
        //这里优化选项做了抽取runtimeChunk到js/common/runtime，只要启用了runtime代码，JS就无法自执行，需要通过js/common/runtime这里的代码去统一执行
        ...getNoRuntimeEntry({
        'background': path.resolve(__dirname, 'src/background.js'),
        'js/contentScripts/baidu': path.resolve(__dirname, 'src/js/contentScripts/baidu.js')
        }),
    },
    // 输出目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },
    // 模块规则，处理不同类型的文件
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][hash][ext]'
                }
            },
            {

            },
            //在background.js前插入扩展热刷新代码
            ...(isWatchMode ? [{
                test: /background\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', './webpackBuild/loaders/background-inject-loader'] // 注意Loader执行顺序
            }] : [])
        ]
    },
    // 插件配置
    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev'),
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/popup.html'),
            filename: 'popup.html',
            chunks: ['js/entrys/popup']
        }),
        new MiniCssExtractPlugin({
            filename(obj){
                let {chunk} = obj
                let resultFileName = chunk.name.replace(/^js/ig,'css')
                return `${resultFileName}.css`
            },
            chunkFilename:'[id].css'
        }),
        new VueLoaderPlugin(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: [
                'vue'
            ],
            dts: false,
            // 排除不需要自动导入的文件或目录
            exclude: [
                /[\\/]node_modules[\\/]/,
                /[\\/]libs[\\/]/,
                /[\\/]contentScripts[\\/]/,
                /\.min\.js$/,
                /background\.js$/
            ]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        // 复制清单文件和资源文件
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/manifest.json'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/images/icon.png'),
                    to: path.resolve(__dirname, 'dist/images/icon.png')
                },
                {
                    from: path.resolve(__dirname, 'src/js/libs'),
                    to: path.resolve(__dirname, 'dist/js/libs')
                },
                {
                    from: path.resolve(__dirname, 'src/css'),
                    to: path.resolve(__dirname, 'dist/css')
                }
            ]
        }),
        // 非开发环境才生成ZIP压缩包
        ...(env !== 'dev' ? [
            new FileManagerPlugin({
                events: {
                    onEnd: {
                        delete: [  // 可选：删除旧的压缩包
                            'zip/' +zipFileName
                        ],
                        archive: [
                            {
                                source: 'dist',
                                destination: 'zip/' + zipFileName,
                                format: 'zip'
                            }
                        ]
                    }
                }
            })
        ] : []),
        // 生产环境添加代码混淆插件
        ...(isProd ? [
            new JavaScriptObfuscator({
                // 混淆选项配置
                compact: true,                 // 压缩代码
                // controlFlowFlattening: true,   // 控制流扁平化（增加反调试难度）
                // controlFlowFlatteningThreshold: 0.75, // 控制流扁平化的阈值
                numbersToExpressions: true,    // 将数字转换为表达式
                simplify: true,                // 简化代码
                stringArrayShuffle: true,      // 混淆字符串数组
                splitStrings: true,            // 分割字符串
                stringArrayThreshold: 0.75,    // 字符串转换的阈值

                // 排除不需要混淆的文件或路径
                exclude: [/node_modules/, /vendor/, /public/],

                // 保留变量名（用于调试或特定场景）
                identifierNamesGenerator: 'hexadecimal', // 变量名生成方式
                renameGlobals: false,                   // 是否重命名全局变量
                reservedNames: ['someGlobalVariable'],  // 保留的变量名
            }, [
                // 可选：指定需要混淆的文件（正则表达式）
                // 默认会处理所有输出的 JS 文件
                // /\.js$/,
            ]),
        ] : []),
        // 热刷新谷歌扩展插件
        ...(isWatchMode ? [new ReloadExtendPlugin({
            port:buildConfig.socketPort
        })] : [])
    ],
    optimization: {
        splitChunks: {
            cacheGroups:{
                vendor: {
                    //initial(初始块)、async(按需加载块)、 all(全部块)
                    chunks: 'all',
                    test:/[\\/]node_modules[\\/]/,
                    name: 'js/common/vendor',
                    priority: 10,
                    enforce: true,
                    // minChunks:1//最小被引用两次的公共库才被抽离到公共代码
                },
                libs: {
                    chunks: 'all',
                    // test:/[\\/]libs[\\/]/,
                    // test:/[\\/]libs[\\/](?!sockjs|haha).*/,
                    test:/[\\/]libs[\\/](?!sockjs).*/,
                    name: 'js/common/libs',
                    priority: 10,
                    enforce: true
                }
            }
        },
        //抽取webpack运行文件代码
        // 提取runtime文件导致background.js出现问题，所以注释
        runtimeChunk: {
            name: 'js/common/runtime',
            // name: (entrypoint) => `js/runtimes/${entrypoint.name}-runtime`
        },
        // 生产环境添加CSS压缩
        ...(isProd?{minimizer: [
                new CssMinimizerPlugin()
            ]}:{})
    },
    devServer: {
        port: 8090,
        hot: false,  // 关闭热更新
        liveReload: false,  // 禁用页面刷新
        devMiddleware: {
            writeToDisk: false  // 禁止写入磁盘文件
        },
        proxy:[
            {
                context: ['/dev-api'],
                target: 'http://193.168.251.23:8080/',
                changeOrigin: true,
                pathRewrite: { '^/dev-api': '' }
            }
        ]
    }
};