/**
 * Created by Allen Liu on 2020/5/19.
 */

let express = require('express')
let app = express()
let path = require('path')
let url = require('url')
/*function fn(req,res){
  console.log(req.url);
  if(/\./.test(req.url)){
    var reg = /\?.*!/
    var url = req.url.replace(reg,'')
    url = decodeURI(url)
    // console.log(url,333);
    res.sendFile(path.resolve(__dirname,`./dist${url}`))
  } else {
    res.sendFile(path.resolve(__dirname,`./dist/index.html`))
  }
}
app.use(function(req,res,next){
  let urlObj = url.parse(req.url)
  if(/\./.test(urlObj.pathname)){
    res.sendFile(path.resolve(__dirname,`./dist${urlObj.pathname}`))
  }else{
    next()
  }
})*/

let staticPath = path.resolve(__dirname,'./dist')
app.use(express.static(staticPath));


app.get('/*',function(req,res){
  console.log(req.url);
  res.sendFile(path.resolve(__dirname,`./dist/index.html`))
})


app.listen('7769')