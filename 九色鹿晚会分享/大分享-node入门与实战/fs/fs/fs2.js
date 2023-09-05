var fs=require('fs');
//是否是文件
fs.stat('./fs1.js',function(err,state){
  console.log(state.isFile());
});
//是否是文件夹
fs.stat('../fs',function(err,state){
  console.log(state.isDirectory());
});

//是否存在
fs.access('./fs3.js',function(err){
  console.log(err);
  if(err){
    console.log('不存在');
  }else{
    console.log('存在');
  }
});