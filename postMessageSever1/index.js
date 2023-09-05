/**
 * Created by Allen Liu on 2020/5/19.
 */
let express = require('express')
let app = express()
let path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware');

let staticPath = path.resolve(__dirname,'./')
app.use(express.static(staticPath));


let proxy = createProxyMiddleware({
  target: 'http://193.168.251.251:9901/', // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
})
app.get('/child.html',proxy)




app.listen('9900')