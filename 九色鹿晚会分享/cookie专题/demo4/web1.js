/**
 * Created by Allen Liu on 2023/2/10.
 */

let express = require('express')
let app = express()
let path = require('path')
let fs = require('fs')
let https = require('https')
const options = {
  key: fs.readFileSync(path.join(__dirname, '../assets/www.allen19906666.com.key')),
  cert: fs.readFileSync(path.join(__dirname, '../assets/www.allen19906666.com.pem')),
};
const server = https.createServer(options, app);


app.use(express.static(path.resolve('../assets/')))


app.get('/',function(req,res){
  // res.setHeader("Content-Type", 'text/html');
  res.sendFile(path.resolve('./web1.html'),{
    headers: {
      'Content-Type': 'text/html'
    }
  })
})


server.listen('8888', () => {
  console.log('服务已开启');
})
// app.listen('8888')