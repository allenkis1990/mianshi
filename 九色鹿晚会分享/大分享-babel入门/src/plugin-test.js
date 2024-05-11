/**
 * Created by Allen Liu on 2024/3/21.
 */
let babel = require('@babel/core')
let fnStr = `let a = 1
function fn(){}
`
let result = babel.transform(fnStr,{
  plugins:[require('./plugins/test')]
})
console.log(result.code);