/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')

var cookieParser = require('cookie-parser')
app.use(express.static(path.resolve('../assets/')))
app.use(function(req,res,next){
  let origin = req.headers.origin
  if(origin){
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.header('Access-Control-Allow-Headers', 'set-cookie, Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header("Access-Control-Allow-Credentials",'true');
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  if(req.method === 'OPTIONS'){
    res.send('')
  }else{
    next()
  }
})
app.use(cookieParser())





app.get('/a1',function(req,res){
  res.cookie('demo3','demo3hahaha',{
    maxAge: 1000 * 60 * 60 * 2
  })
  res.send({code:200})
})


app.listen('7202', () => {
  console.log('服务已开启');
})