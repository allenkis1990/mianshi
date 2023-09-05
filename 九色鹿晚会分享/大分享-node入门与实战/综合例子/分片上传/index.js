
var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
const formidable = require("formidable");
function sortBy(arr,key){
  let res = arr.sort((a,b)=>{
    var a1 = a[key]
    var b1 = b[key]
    return (a1-b1)
  })
  return res
}

function onData(req,cb) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var obj = {
      files,
      data:fields
    }
    cb && cb(obj)

  });
}


app.use(express.static(path.resolve(__dirname,'./')))

app.get('/',function(req,res){
  res.sendFile(path.resolve('./index.html'))
})

var resultArr = []
app.post('/chunkSaveImg',function(req,res){
  onData(req,function(obj){
    var file = obj.files.img.filepath
    var totalChunk = obj.data.totalChunk
    var fileName = obj.data.fileName
    //console.log(fs.readFileSync(file,'utf8'));
    var fileChunkContent = fs.readFileSync(file)
    var buf = Buffer.from(fileChunkContent, 'binary');
    //console.log(buf);
    resultArr.push({buf,chunkNum:obj.data.chunkNum})
    if(Number(totalChunk) === resultArr.length){
      //console.log(resultArr);
      resultArr = sortBy(resultArr,'chunkNum')
      resultArr = resultArr.map((item)=>{
        return item.buf
      })
      var fallyBuf = Buffer.concat(resultArr)
      fs.writeFile(`./datas/${fileName}`,fallyBuf,'binary',function(){
        console.log('写入图片成功');
        res.send({
          message:'图片写入成功'
        })
        //写成功以后要把分片数组清空
        resultArr = []
      })
    }else{
      res.send({
        message:'当前正在上传第'+obj.data.chunkNum+'块分片'
      })
    }
  })
})

app.listen('7772')
