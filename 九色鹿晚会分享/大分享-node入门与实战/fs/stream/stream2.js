
let fs = require('fs')
let ws = fs.createWriteStream('../datas/data2.txt',{
  flags:'a'
})

ws.write('jsl946!!!')
ws.end('')