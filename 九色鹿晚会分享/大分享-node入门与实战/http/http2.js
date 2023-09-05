
var http=require('http');
var url = require('url')
var qs = require('qs')


var server=http.createServer(function(req,res){
    let urlObj = url.parse(req.url)
    console.log(req.url,1111111111111111);
    console.log(urlObj.query,22222222);
    if(urlObj.pathname==='/'){
        let params = qs.parse(urlObj.query)
        console.log(params);
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end(JSON.stringify(params));
    }
});
server.listen(7776);
// server.listen(7777,'127.0.0.1');
