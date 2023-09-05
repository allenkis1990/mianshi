var fs=require('fs');
var express=require('express');
var path = require('path')
var formidable=require('formidable');
var app = express()



app.use(express.static(path.resolve(__dirname,'./')))

app.use(function(req,res,next){
  console.log(1);
  req.aaa = 1
  next()
})
app.use(function(req,res,next){
  console.log(2);
  next()
})
app.use(function(req,res,next){
  console.log(3);
  if(req.url==='/haha'){
    res.send({haha:'haha'})
  }else{
    next()
  }
})



app.get('/',function(req,res){
  res.sendFile(path.resolve(__dirname,'./html/index3.html'))
})

//被上面中间件拦截
app.get('/haha',function(req,res,next){
  console.log('haha');
  // res.send()
})

app.post('/postDo',function(req,res){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // console.log(fields);
    // console.log(files);
    var obj = {
      files,
      data:fields
    }

    if(obj.files.img){
      let imgPath = obj.files.img.filepath
      let imgName = obj.files.img.originalFilename
      let rs = fs.createReadStream(imgPath)
      let ws = fs.createWriteStream(`./datas/${imgName}`)
      rs.pipe(ws)
    }
    res.send(JSON.stringify(obj.data));
  });
})

app.listen(7773);

