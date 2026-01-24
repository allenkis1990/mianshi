/**
 * Created by Allen Liu on 2024/4/16.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')
let url = require('url')
app.get('/',function(req,res){
  let query = url.parse(req.url,true).query
  fs.readFile(path.resolve('./demo1.html'),'utf8',function(e,htmlStr){
    // console.log(re);
    let matchs = htmlStr.match(/{.+}/ig)
    console.log(htmlStr.match(/{.+}/ig));
    if(matchs && matchs.length){
      matchs.forEach((item)=>{
        let key = item.replace(/^{/ig,'').replace(/}$/ig,'')
        htmlStr = htmlStr.replace(`{${key}}`,query[key])
      })
    }
    console.log(htmlStr);
    // console.log(query);
    res.setHeader("Content-Type", 'text/html');
    res.send(htmlStr)
  })
})



app.listen('7001', () => {
  console.log('服务已开启');
})