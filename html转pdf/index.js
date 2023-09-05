/**
 * Created by Allen Liu on 2019/8/1.
 */
var path = require('path')
var htmlPdf = require('html-pdf')
var fs = require('fs');
let tempStr = fs.readFileSync(path.resolve(__dirname,'temp.html'),'utf8')
console.log(htmlPdf);


htmlPdf.create(tempStr, {}).toFile(path.resolve(__dirname,'./pdf','test.pdf'), function (err, r) {
  if (err) {
    console.log(err);
    return
  }
  console.log('生成pdf成功');
});
