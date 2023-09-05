
var express = require('express')
var app = express()
var path = require('path')
var axios = require('axios')



app.use(express.static(path.resolve(__dirname,'./')))

app.get('/',function(req,res){
  res.sendFile(path.resolve('./index.html'))
})

app.all('/proxy/*',function (req,res){
  console.log(req.url);
  // console.log(req.method);
  let base = 'http://localhost:7770'
  let med = req.method.toLowerCase()
  axios({
    method: med,
    url: base + req.url
  }).then((result)=>{
    console.log(result,11111);
    res.send(result.data)
  });
})


app.listen('7771')
