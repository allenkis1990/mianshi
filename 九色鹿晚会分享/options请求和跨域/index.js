/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')

// 更好的做法是添加 OPTIONS 预检请求处理
app.options('*', function(req, res){
  res.header("Access-Control-Allow-Origin", '*');
  // res.header("Access-Control-Allow-Methods", 'PUT, DELETE');
  res.header("Access-Control-Allow-Methods", '*');
  res.header("Access-Control-Allow-Headers", '*');
  res.sendStatus(200);
});

app.get('/haha',function(req,res){
  // res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Origin", '*');
  // res.header("Access-Control-Allow-Methods", 'PUT, DELETE');
  // res.header("Access-Control-Allow-Methods", '*');
  // res.header("Access-Control-Allow-Headers", '*');
  res.send({code:'ok'})
})
// app.put('/haha',function(req,res){
//   res.header("Access-Control-Allow-Origin", '*');
//   res.send({code:'ok'})
// })



app.listen('8888')