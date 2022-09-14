/**
 * Created by Allen Liu on 2022/8/30.
 */

/**
 * Created by Allen Liu on 2019/9/15.
 */
var express = require('express')
var app = express()
var path = require('path')

app.get('/pc',function(req,res){
  res.sendFile(path.resolve(__dirname,'pc.html'))
})

app.get('/mobile',function(req,res){
  res.sendFile(path.resolve(__dirname,'mobile.html'))
})


app.listen('9898')
