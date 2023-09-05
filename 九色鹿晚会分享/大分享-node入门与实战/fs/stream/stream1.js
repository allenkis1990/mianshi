
let fs = require('fs')

let rs = fs.createReadStream('../datas/data1.txt',{
   // encoding:'utf8'
})

let bufArr = []
// let bufStr = ''
rs.on('data',function(data){
  console.log(data);
  bufArr.push(data)
  // bufStr+=data
})

rs.on('end',function(){
  let buf = Buffer.concat(bufArr)
  let str = buf.toString()
  console.log(str);
  // console.log(bufStr);
})