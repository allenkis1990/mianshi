/**
 * Created by Allen Liu on 2019/9/15.
 */
// let buf = Buffer.alloc(3)
// buf.write('lwh')



// let buf = Buffer.from('lwh','utf8')



// let data = Buffer.from('lwh','utf8')
// let buf = Buffer.alloc(data)
// data.forEach((item,index)=>{
//     buf[index] = item
// })


// let data = Buffer.from('lwh','utf8')
// let buf = Buffer.alloc(data.length)
// // targetBuffer target开始 源开始 源结束
// data.copy(buf,0,0,3)

let fs = require('fs')


/*let data1 = Buffer.from('lwh','utf8')
let data2 = Buffer.from('wahaha','utf8')

var buf=Buffer.concat([data1,data2])
console.log(buf.toString());*/


let img = fs.readFileSync('../fs/datas/pic.png',{encoding:'binary'})
let data = Buffer.from(img,'binary')
fs.writeFile('haha.png',data,'binary',function(){

})



