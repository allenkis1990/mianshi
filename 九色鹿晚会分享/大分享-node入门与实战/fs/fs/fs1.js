/**
 * Created by Allen Liu on 2023/8/1.
 */

let fs = require('fs')
//读取文件
let path = require('path')
/*fs.readFile( '../datas/data1.txt','utf8',function(err,data){
  console.log(data);
})

//获取文件夹
fs.readdir('../stream',function(err,dirs){
  console.log(dirs);
})*/



//同步
let data = fs.readFileSync('../datas/data1.txt','utf8')
console.log(data);

// let dirs = fs.readdirSync('../stream')
// console.log(dirs);
