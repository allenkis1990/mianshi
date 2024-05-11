/**
 * Created by Allen Liu on 2024/3/21.
 */
//安装这三个包 @babel/cli @babel/core @babel/preset-env
//npx babel src/index1.js -o dist/index1.js
//presets是插件的集合
//npx babel src/index1.js -o dist/index1.js --plugins=@babel/plugin-transform-arrow-functions
//npx babel src/index1.js -o dist/index1.js --presets=@babel/preset-env
//babel配置有很多种方式可以是.babelrc文件 可以是.babelrc.js 可以是babel.config.js 也可以加在package.json里的babel属性
import '@babel/polyfill'

// let a = require('../data/data1')
// console.log(a());

// import a from './data/data2'
// console.log(a);

let fn = ()=>{
  console.log(666);
}

let fn2 = async ()=>{
  function f(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(666)
      },3000)
    })
  }
  let a = await f()
  console.log(a);
}
fn2()


let arr = [1,2,3]
//includes举例firefox 58  entry 和 usage区别
console.log(arr.includes(1),'includes');
let num = arr.reduce((pre,next)=>{
  return pre + next
})
console.log(num);
