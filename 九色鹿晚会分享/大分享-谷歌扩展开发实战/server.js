let express = require('express')
let app = express()
//let cors = require('cors')
// ========== 第一步：配置 CORS（动态匹配来源）==========
/*
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://www.baidu.com',
    'null',  // 处理某些特殊情况
    undefined // 处理无 origin 的情况
  ];

  const origin = req.headers.origin;
  console.log(`🌐 请求来源：${origin}`);
  // 如果是允许的来源，设置具体的 origin（不是 *）
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // 没有 origin 头的请求（如直接访问、curl 等）
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    // 其他来源，拒绝（或者也可以放行）
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  // 其他 CORS 配置
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');  // 允许携带凭证
  next();
});
*/

// ========== 第二步：处理 OPTIONS 预检请求（动态 origin）==========
/*
app.options('*', (req, res) => {
  console.log('✅ 收到 OPTIONS 预检请求');

  const origin = req.headers.origin || '*';
  const allowedOrigins = [
    'https://www.baidu.com'
  ];

  // 设置响应头
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  res.sendStatus(204);
});
*/


app.get('/sugrec', function(req, res){
  console.log('✅ 收到 /sugrec 请求');
  const responseData = {
    success: true,
    message: '来自百度 sugrec 接口的代理响应',
    timestamp: new Date().toISOString(),
    original_query: req.query,
    data: {
      test: '这是 localhost:8888 返回的数据',
      from: 'server.js'
    }
  };
  // 直接返回 JSON，让 cors 中间件处理响应头
  res.json(responseData);
})


const PORT = 8888;
app.listen(PORT, '0.0.0.0', () => {
  console.log('代理服务启动成功');
})