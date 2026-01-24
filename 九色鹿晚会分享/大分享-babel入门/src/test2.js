/**
 * Created by Allen Liu on 2024/6/13.
 */

let Get = (api)=>{
  return function(a,b,c){
    let oldFn = c.value
    console.log(api,'api');
    c.value = function(...args){
      setTimeout(()=>{
        let res = {code:200,message:'success',data:{name:'jsl',age:18}}
        oldFn(...args,res)
      },3000)
    }
  }
}
let Delay = (ms)=>{
  return function(a,b,c){
    let oldFn = c.value
    console.log(ms,'ms');
    c.value = function(...args){
      setTimeout(()=>{
        oldFn(...args)
      },ms)
    }
  }
}
let paramDecorator = (target,key,index)=>{
  let oldFn = target[key]
  target[key] = function(...arg){
    arg[index] = arg[index].data
    oldFn(...arg)
  }
}

class fn{
  constructor() {
  }
  //多个装饰器叠加会把上一个装饰器的 输出 作为下一个装饰器的 输入
  @Get('/api')
  @Delay(6000)
  // @paramDecorator res
  say(@paramDecorator res){
    console.log(res);
  }
}


let f = new fn()
f.say()

