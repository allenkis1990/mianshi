/**
 * Created by Allen Liu on 2023/8/2.
 */
//express简单实现
var http=require('http');
var url = require('url')
function express(){
  let getArr = []
  let server = http.createServer(function(req,res){
    getArr.forEach((item)=>{
      let urlObj = url.parse(req.url)
      if(urlObj.pathname=== item.url && req.method === item.method){
        item.cb && item.cb(req,res)
      }
    })
  })
  server.get = function(url,cb){
    getArr.push({
      method:'GET',
      url,
      cb
    })
  }


  return server
}




let app = express()

app.get('/haha',function(req,res){
  res.end('haha')
})
app.listen(7774)

