

let express = require('express')
let app = express()
let path = require('path')
let formidable = require("formidable");
let axios = require('axios')
let token = ''
let baseURL = 'https://api-m.sandbox.paypal.com/'
let username = 'Ac22osxFpFaCEHbN_qRSrRAAexAoIYk8-qO6UUuwXucTNHFplckwAB9iyT-GyCf2kyAy6uVpNwYJVIpG'
let password = 'EOJF5o6umj9urYQs1QXZuDRIwei_fxyu5EAsSttDJp7CmhDFyuqF1lFLD_EPlkZi0oC0a-u3JSi4Mr9q'


function onData(req,cb) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var obj = {
      files,
      data:fields
    }
    cb && cb(obj)

  });
}


async function getToken(){
  if(token){
    return token
  }else{
    let data = await axios({
      method: 'post',
      url: '/v1/oauth2/token',
      data:'grant_type=client_credentials',
      baseURL,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      auth: {
        username,
        password
      }
    });
    token = data.data.access_token
    return token
  }
}


async function createOrder(){
  await getToken()
  let orderInfo = await axios({
    method: 'post',
    url: '/v2/checkout/orders',
    data: {
      purchase_units:[
        {
          // description:'确定要买这个商品吗？',
          amount:{
            currency_code:'USD',value:'0.99'
          }
        }
      ],
      intent: 'CAPTURE'
    },
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return orderInfo.data
}

async function orderCapture(orderId){
  let orderInfo = await axios({
    method: 'post',
    url: `/v2/checkout/orders/${orderId}/capture`,
    data: {},
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return orderInfo.data
}



app.use(express.static(path.resolve('../assets')))

app.get('/',function(req,res){
  res.sendFile(path.resolve('./index.html'))
})
app.post('/createOrder',async function(req,res){
  let orderInfo = await createOrder()
  res.send(JSON.stringify(orderInfo))
  // onData(req,(obj)=>{
  //   console.log(obj);
  // })
})
app.post('/orderCapture',async function(req,res){
  onData(req,async(obj)=>{
    let resData = await orderCapture(obj.data.orderId)
    res.send(JSON.stringify(resData))
  })
})



app.listen('7979')