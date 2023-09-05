/**
 * Created by Allen Liu on 2020/5/29.
 */
let express = require('express')
let app = express()
let http = require('http')
let socketIo = require('socket.io')
let server = http.createServer(app)
let io = socketIo.listen(server)
app.use(express.static('./'))

let userCount = 0
io.sockets.on('connection',(socket)=>{

    socket.on('join',function(options){
        console.log(`${options.name}`);
    })

    setTimeout(()=>{
        socket.emit('haha','haha') //给当前客户端发消息
        // socket.broadcast.emit('haha','haha') // 给所有客户端发消息除了自己
    },5000)


    socket.on('disconnect',function(){
        console.log('断开连接');
    })
})



server.listen('6969')
