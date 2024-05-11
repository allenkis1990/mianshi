/**
 * Created by Allen Liu on 2024/3/21.
 */
let babel = require('@babel/core')
let fnStr = `
let a = 1;
let b = 2;
`

// let ast = babel.parse(fnStr)
// console.log(ast.program);
let result = babel.transform(fnStr,{
  plugins:[require('./plugins/plugin2')]
})
console.log(result.code);