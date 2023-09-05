var fs=require('fs');
var http=require('http');
var mime=require('mime');
var path = require('path')


var server=http.createServer(function(req,res){
    console.log(req.url,req.method);
    if(req.url==='/'){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile( path.resolve(__dirname,'./html/index1.html'),'utf8',function(err,data){
            res.end(data);
        });
    }else if(req.url==='/js/jquery-1.9.1.js'){
        var mimeType=mime.getType(req.url);
        fs.readFile('./'+req.url,'utf8',function(err,data){
            console.log(mimeType);
            res.writeHead(200,{'Content-Type':mimeType});
            res.end(data);
        });
    }else{
        res.end('ok');
    }
});
server.listen(7777);
// server.listen(7777,'127.0.0.1');
