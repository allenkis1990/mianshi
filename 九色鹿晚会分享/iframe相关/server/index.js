/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')

app.get('/',function(req,res){
  // res.setHeader("Content-Type", 'text/html');
  res.sendFile(path.resolve('../data/test.html'),{
    headers: {
      'Content-Type': 'text/html',
      'Content-Security-Policy': "frame-ancestors 'none'"
    }
  })
})


app.listen('8989', () => {
  console.log('服务已开启');
})