/**
 * Created by Allen Liu on 2024/3/21.
 */
let {parse,transform,traverse,types} = require('@babel/core')
let fnStr = `let fn = ()=>{
  console.log(666);
}`

// let ast = parse(fnStr)
// console.log(ast.program);
let result = transform(fnStr,{
  presets:['@babel/preset-env']
})
console.log(result.code);