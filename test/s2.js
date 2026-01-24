/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')

let staticPath = path.resolve(__dirname,'./')
app.use(express.static(staticPath));


app.listen('7777')