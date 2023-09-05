var http=require('http');
var options={
  host:'www.baidu.com',
  path:'/',
  // port:8888,
  method:'GET',
  headers:{
    //'Content-Type':'application/json'
    //'Content-Type':'application/x-www-form-urlencoded'
    // 'Content-Type':'application/lwh'
  }
};

var request=http.request(options,function(res){
  // console.log(res.statusCode);
  // console.log(res.headers);
  res.setEncoding('utf8');
  var result='';
  res.on('data',function(data){
    result+=data;
    console.log(data,11111111111111);
  });
  res.on('end',function(data){
    // var obj=JSON.parse(result);
    // console.log(result);
  });

});


//request.write('{"name":"allen"}');//application/json形式
//request.write('name=allen&age=18');//application/x-www-form-urlencoded形式
// request.write('name-lwh$age-888');//application/lwh   自定义形式
request.end();
