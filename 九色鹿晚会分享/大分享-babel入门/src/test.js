/**
 * Created by Allen Liu on 2024/6/13.
 */
let wahaha = require('./data/data1')
let classDecorator = (f)=>{
  // console.log(f,111);
  //给类添加一个属性
  f.prototype.xxx = 'xxx'
}

let attrDecorator = (obj,key,options)=>{
  console.log(options);
  //改为不可写
  options.writable = false
}


let fnDecorator = (options)=>{
  console.log(options,111);
  return function(a,b,c){
    console.log('@fnDecorator');
    let oldFn = c.value
    c.value = function(...args){
      // console.log(args,'arg');
      oldFn(...args,options)
    }
  }
}

let fnDecorator2 = (options)=>{
  return function(a,b,c){
    let oldFn = c.value
    c.value = function(...args){
      // console.log(args,'arg');
      oldFn(...args,options)
    }
  }
}

let paramDecorator = (target,key,index)=>{
  // console.log(target, key, index,123);
  // console.log(target[key],'pp');
  // console.log('@paramDecorator');
  let oldFn = target[key]
  target[key] = function(...arg){
    arg[index] = {...arg[index],num1:arg[2],num2:arg[3]}
    // arg[index] = {name:arg[index].name}
    oldFn(...arg)
  }
}

// @classDecorator
class fn{
  // @attrDecorator
  myAttr = 1
  constructor() {
  }
  //多个装饰器叠加会把上一个装饰器的 输出 作为下一个装饰器的 输入
  @fnDecorator('666')
  @fnDecorator2('888')
  say(a,@paramDecorator b){
  // say(a,b,c,d){
    console.log(a,b)
    // console.log(45678);
  }
}

let f = new fn()
// console.log(f.xxx);
// f.myAttr = 'haha'
// console.log(f.myAttr);
f.say('a', {name:'allen666',age:18})
// console.log(wahaha.name);
console.log(123456);
