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
    // console.log(123);
    socket.on('join',(room,nickName)=>{
        socket.join(room)//加入房间API
        console.log(room);
        io.in(room).emit('joined',room,nickName)//给房间内所有人发
        // socket.emit('joined',room)//给当前客户端发送信息
        // socket.to(room).emit('joined',room)//给房间内所有人发，除了当前客户端
        // socket.broadcast.emit('joined',room)//给整个站点的人发，除了当前客户端
        let myRoom = io.sockets.adapter.rooms[room]//某个房间的房间对象
        userCount = Object.keys(myRoom.sockets).length//某个房间内有多少人

        io.in(room).emit('userCount',userCount)
        console.log(myRoom);
    })

    socket.on('leave',(room,nickName)=>{
        io.in(room).emit('leaved',room,nickName)//给房间内所有人发
        userCount --
        io.in(room).emit('userCount',userCount)
        socket.leave(room)//离开接口要放在最后调用  离开房间API
    })
})



server.listen('7777')
