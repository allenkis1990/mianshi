/**
 * Created by Allen Liu on 2023/8/8.
 */
let express = require('express')
let app = express()
let fs = require('fs')
let path = require('path')
app.use(express.static(path.resolve(__dirname,'./')))



app.get('/',function(resq,res){
  res.sendFile(path.resolve(__dirname,'./拖动.html'))
})

app.listen('8888','193.168.251.251')