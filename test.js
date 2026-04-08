/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')

app.use(express.static(path.resolve('./')))

app.get('/a1',function(req,res){
  // res.setHeader("Content-Type", 'text/html');
  res.sendFile(path.resolve('./test22.html'),{
    headers: {
      'Content-Type': 'text/html'
    }
  })
})


app.listen('8800', () => {
  console.log('服务已开启');
})