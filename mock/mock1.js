/**
 * Created by Allen Liu on 2020/7/23.
 */
let express = require('express')
let app = express()
let path = require('path')

app.use(express.static(path.resolve('./')))

app.get('/book/getBookList',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method", "PUT,POST,GET,DELETE,OPTIONS");
    let data = {
        data:[
            {
                book_id:'1',
                book_type:'1',
                book_name:'刘伟恒测试绘本',
                book_image:'http://193.168.70.251:8888/images/bookImg.jpg',
                user_star:'2',
                total_star:'66'
            }
        ],
        error_code:0,
        message:''
    }
    res.send(data)
})

app.listen('8888','193.168.70.251')