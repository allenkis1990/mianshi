/**
 * Created by Allen Liu on 2024/3/21.
 */
let babel = require('@babel/core')
let fnStr = `
function fn(a,b){
  console.log(a,b);
  return a + b
}
`

// let ast = babel.parse(fnStr)
// console.log(ast.program);
let result = babel.transform(fnStr,{
  plugins:[require('./plugins/plugin3')]
})
console.log(result.code);