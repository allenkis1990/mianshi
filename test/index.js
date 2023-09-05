
let express = require('express')
let app = express()
let path = require('path')

let staticPath = path.resolve(__dirname,'./dist')
app.use(express.static(staticPath));


app.get('/',function(req,res){
  res.sendFile(path.resolve('./dist/index.html'))
})




app.listen('9900')