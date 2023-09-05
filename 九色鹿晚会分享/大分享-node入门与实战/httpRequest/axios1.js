/**
 * Created by Allen Liu on 2023/8/2.
 */

let axios = require('axios')
axios({
  method: 'get',
  url: 'http://www.baidu.com'
}).then((res)=>{
  console.log(res.data);
});