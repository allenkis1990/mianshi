/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')


app.use(express.static(path.resolve('./')))

function setRouter(router){
  app.get(router,function(req,res){
    res.sendFile(path.resolve(`.${router}.html`))
  })
}

app.get('/',function(req,res){
  res.sendFile(path.resolve('./index.html'))
})
setRouter('/index1')
setRouter('/index2')
setRouter('/index3')
setRouter('/index4')
setRouter('/index5')
setRouter('/index6')



let count = 0
app.get('/getData',function(req,res){
  count ++
  res.send({
    count
  })
})





app.listen('8888','127.0.0.1')