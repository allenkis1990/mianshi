/**
 * Created by Allen Liu on 2020/5/29.
 */
let express = require('express')
let app = express()
let http = require('http')
let socketIo = require('socket.io')
let server = http.createServer(app)
let io = socketIo.listen(server)
let path = require('path')
// app.use(express.static('./'))
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'./index2.html'))
})
app.get('/socket.io.js',function(req,res){
    res.sendFile(path.resolve(__dirname,'./socket.io.js'))
})

io.sockets.on('connection',(socket)=>{

    socket.on('join',function(room,name){
        socket.join(room)
        console.log(`${name}进入房间`+room);
        //不知道为什么不能发中文，其他可以发，会导致离开房间的时候room对象无法销毁
        // socket.emit('hello', '我')
        socket.emit('hello', 'w')
        let myRoom = io.sockets.adapter.rooms[room]//某个房间的房间对象
        console.log(myRoom);
    })


    socket.on('leave',function(room,name){
        console.log(room);
        console.log(`${name}离开房间`+room);
        socket.leave(room,function(){
            let myRoom = io.sockets.adapter.rooms[room]//某个房间的房间对象
            console.log(myRoom);
        })
    })


    // socket.on('disconnect',function(){
    //     // console.log('断开连接');
    // })
})



server.listen('5656')
