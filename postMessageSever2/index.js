/**
 * Created by Allen Liu on 2020/5/19.
 */
let express = require('express')
let app = express()
let path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware');

let staticPath = path.resolve(__dirname,'./')
app.use(express.static(staticPath));

app.listen('9901')