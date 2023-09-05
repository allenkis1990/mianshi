
var express = require('express')
var app = express()
var path = require('path')




app.use(express.static(path.resolve(__dirname,'./')))

app.get('/',function(req,res){
  res.sendFile(path.resolve('./index.html'))
})

app.get('/proxy/getDo',function(req,res){
  res.send({status:'ok'})
})

app.post('/proxy/postDo',function(req,res){
  res.send({status:'ok'})
})


app.listen('7770')
