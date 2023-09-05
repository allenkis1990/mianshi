
var fs = require('fs')
var rs = fs.createReadStream('../datas/pic.png')
var ws = fs.createWriteStream('../datas/copyPic.png')

rs.pipe(ws)

