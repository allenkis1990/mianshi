/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')
let https = require('https')
let utils = require('../assets/utils.js')
var cookieParser = require('cookie-parser')
const options = {
  key: fs.readFileSync(path.join(__dirname, '../assets/www.allen19906666.com.key')),
  cert: fs.readFileSync(path.join(__dirname, '../assets/www.allen19906666.com.pem')),
};
const server = https.createServer(options, app);
app.use(function(req,res,next){
  let origin = req.headers.origin
  if(origin){
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.header('Access-Control-Allow-Headers', 'set-cookie, Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header("Access-Control-Allow-Credentials",'true');
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  if(req.method === 'OPTIONS'){
    res.send('')
  }else{
    next()
  }
})
app.use(express.static(path.resolve('../assets/')))
app.use(cookieParser())


let ticketArr = []
let ticket = ''
app.post('/login',function(req,res){
  let cookies = req.cookies
  let reqCookieTicket = cookies.ticket
  // res.cookie('haha',666,{
  //   maxAge: 1000 * 60 * 60 * 2,
  //   sameSite:'none',
  //   secure:true
  // })
  // res.send('')
  if(ticketArr.indexOf(reqCookieTicket) > -1){
    res.send(res.send({code:501,msg:'已登录，无需重复登录'}))
  }else{
    utils.onData(req,function(obj){
      // console.log(obj,123);
      let {data} = obj
      if(data.account === 'jsl' && data.password === '9946'){
        let ticket = `ticket${utils.dateToStr(new Date())}`
        if(ticketArr.indexOf(ticket) < 0){
          ticketArr.push(ticket)
        }
        let location = `https://www.allen19906666.com:8787/ssoLogin?ticket=${ticket}`
        res.send({code:200,msg:'登录成功',location})
      }else{
        res.send({code:500,msg:'登录失败'})
      }
    })
  }
})


app.get('/isLogin',function(req,res){
  let cookies = req.cookies
  let reqCookieTicket = cookies.ticket
  // console.log(reqCookieTicket,1122);
  res.header('Content-Type','application/javascript')
  if(ticketArr.indexOf(reqCookieTicket) > -1){
    res.send('ssoIsLogin({code:200,msg:"已登录"})')
  }else{
    res.send('ssoIsLogin({code:500,msg:"未登录"})')
  }
  // if(ticketArr.indexOf(reqCookieTicket) > -1){
  //   res.send({code:200,msg:"已登录"})
  // }else{
  //   res.send({code:500,msg:"未登录"})
  // }
})


app.get('/ssoLogin',function(req,res){
  let ticket = req.query.ticket
  res.cookie('ticket',ticket,{
    maxAge: 1000 * 60 * 60 * 2,
    sameSite:'none',
    secure:true
  })
  res.header('Content-Type','application/javascript')
  res.send('')
})

server.listen('8788', () => {
  console.log('服务已开启');
})