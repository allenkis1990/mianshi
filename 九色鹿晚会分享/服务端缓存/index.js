/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')


app.use(express.static(path.resolve('../../')))


app.get('/',function(req,res){
  res.sendFile(path.resolve('./index.html'))
})
let timer = null
let count = 0
function clearCountInterval(){
  if(timer){
    clearInterval(timer)
    timer = null
  }
}
function setCountInterval(){
  timer = setInterval(()=>{
    count ++
    if(count >= 9){
      clearCountInterval()
      console.log(10)
      count = 0
    }
  },1000)
}
app.get('/haha',function(req,res){
  if(count === 0){
    clearCountInterval()
    setCountInterval()
  }
  console.log('收到请求！！');
  res.header( 'Cache-Control','max-age=10')
  // res.header( 'Expires',new Date(new Date().getTime() + 10000).toGMTString())
  res.send({code:'ok'})
})



app.listen('8888')