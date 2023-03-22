/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')


app.get('/',function(req,res){
  res.send('hello')
})


app.get('/a',function(req,res){
  res.send('aaaaaa')
})
app.get('/b',function(req,res){
  res.send('bbbbbb')
})



app.listen('9999','127.0.0.1')