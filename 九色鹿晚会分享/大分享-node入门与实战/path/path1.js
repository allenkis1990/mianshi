var path=require('path');

/*//路径的斜杠,系统不同可能会不一样
console.log(path.sep,'path.sep');

//文件所在的绝对路径
console.log(__filename,'__filename');

//文件所在的文件夹
console.log(__dirname,'__dirname');*/


//返回相对路径a\b
// console.log(path.join(__dirname,'a', 'b'),'path.join');


//返回绝对路径d:\node练习\modules\path\b
console.log(path.resolve('a', 'b'),'path.resolve');

//返回文件名字aa.js
console.log(path.basename('a/b/aa.js'));

//返回文件类型
console.log(path.extname('a/b/aa.js'));

