var fs=require('fs');
var http=require('http');
var path = require('path')
var url = require('url')
var mime = require("mime");
var formidable=require('formidable');

var server=http.createServer(function(req,res){
    // console.log(req.url);
    let urlObj = url.parse(req.url)
    console.log(urlObj.pathname);
    if(urlObj.pathname==='/'){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile( path.resolve(__dirname,'./html/index3.html'),'utf8',function(err,data){
            res.end(data);
        });
    }else if(urlObj.pathname === '/postDo'){
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            // console.log(fields);
            // console.log(files);
            var obj = {
                files,
                data:fields
            }
            // console.log(obj);
            console.log(obj.files.img.filepath,123);


            if(obj.files.img){
                let imgPath = obj.files.img.filepath
                let imgName = obj.files.img.originalFilename
                let rs = fs.createReadStream(imgPath)
                let ws = fs.createWriteStream(`./datas/${imgName}`)
                rs.pipe(ws)
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(obj.data));
        });
    }else if(urlObj.pathname==='/js/jquery-1.9.1.js'){
        var mimeType=mime.getType(req.url);
        fs.readFile('./'+urlObj.pathname,'utf8',function(err,data){
            res.writeHead(200,{'Content-Type':mimeType});
            res.end(data);
        });
    }
});
server.listen(7775);
