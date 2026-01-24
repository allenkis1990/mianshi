/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')



app.get('/',function(req,res){
  res.sendFile(path.resolve('./index.html'))
})



app.listen('8888')