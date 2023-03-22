/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')


app.use(express.static(path.resolve('./')))


/*app.get('/maodian',function(req,res){
  res.sendFile(path.resolve('./maodian.html'))
})*/

app.get('/',function(req,res){
  res.sendFile(path.resolve('./index1.html'))
})


app.get('/b',function(req,res){
  res.send('bbbbbbbbbbbbbbbbb')
})


app.get('*',function(req,res){
  console.log(req.url);
  res.sendFile(path.resolve('./index1.html'))
})


app.listen('8888','127.0.0.1')